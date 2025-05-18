import { Router, Request, Response, NextFunction, request } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Car,ICar } from '../model/Car';
import { Extra } from '../model/Extra';
import { Booking } from '../model/Booking';
import mongoose from 'mongoose';

export async function isCarAvailable(
  carId: mongoose.Types.ObjectId | string,
  start: Date,
  end: Date
): Promise<boolean> {
  const overlappingBookings = await Booking.find({
    car: carId,
    status: 'active',
    startDate: { $lte: end },
    endDate: { $gte: start }
  });
  return overlappingBookings.length === 0;
}

export const bookingRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/all_bookings_with_details', async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $lookup: {
          from: 'cars',
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $unwind: '$carDetails'
      },
      {$lookup: {
          from: 'extras',
          localField: 'extras',
          foreignField: '_id',
          as: 'extraDetails'
        }
        },
      {
        $project: {
          _id: 1,
          startDate: 1,
          endDate: 1,
          bookingDate: 1,
          status: 1,
          total: 1,
          extras: '$extraDetails.name',
          'userEmail': '$userDetails.email',
          'carBrand': '$carDetails.brand',
          'carModel': '$carDetails.car_model'
        }
      }
    ]);

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Hiba lekérdezés során:', err);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});
    router.get('/mybookings', async (req: Request, res: Response) => {
        const id=req.session.user?.userid;
        try {
            const bookings = await Booking.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(id) }
            },
            {
            $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
            from: 'cars',
            localField: 'car',
            foreignField: '_id',
            as: 'carDetails'
            }
        },
        {
            $unwind: '$carDetails'
        },
        {
        $lookup: {
          from: 'extras',
          localField: 'extras',
          foreignField: '_id',
          as: 'extraDetails'
        }
      },
        {
            $project: {
            _id: 1,
            startDate: 1,
            endDate: 1,
            bookingDate: 1,
            status: 1,
            total: 1,
            extras: '$extraDetails.name',
            userEmail: '$userDetails.email',
            carBrand: '$carDetails.brand',
            carModel: '$carDetails.car_model'
        }
        }
        ]);
        res.status(200).json(bookings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hiba a foglalások lekérésekor.' });
        }
    });
    router.get('/list_bookings', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query=Booking.find();
            query.then(data=>{
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send('Internal server error.')
            }
            ) 
        } else{
            res.status(500).send('User is not logged in.');
        }
});
    //Add Car
    router.post('/add_booking', async (req: Request, res: Response) => {
    try {
        const { car, startDate, endDate, extras } = req.body;
        const user = req.session.user?.userid;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const overlappingBookings = await Booking.find({
            car: car,
            status: { $ne: 'canceled' },
            $or: [
                {
                    startDate: { $lte: end },
                    endDate: { $gte: start }
                }
            ]
        });

        if (overlappingBookings.length > 0) {
            res.status(400).send('Az adott időszakban már van érvényes foglalás.');
        }
        else{
        const carDoc: ICar | null = await Car.findById(car);
        let total = 0;
        let days=0;
        if (carDoc?.price) {
            const durationInMs = end.getTime() - start.getTime();
            days = Math.ceil(durationInMs / (1000 * 60 * 60 * 24)) + 1;
            total = carDoc.price * days;
        }
        if (extras && Array.isArray(extras) && extras.length > 0) {
            const extrasData = await Extra.find({ _id: { $in: extras } });
            const extrasTotalPerDay = extrasData.reduce((sum, extra) => {
                return sum + (extra.price || 0);
            }, 0);
            total += extrasTotalPerDay * days;
        }
        const booking = new Booking({
            car,
            user,
            extras,
            startDate: start,
            endDate: end,
            bookingDate: Date.now(),
            total
        });

        const savedBooking = await booking.save();
        res.status(200).send(savedBooking);
        }

    } catch (error) {
        console.error('Foglalás mentési hiba:', error);
        res.status(500).send('Szerverhiba.');
    }
});
router.put('/user_cancel_booking/:id', async(req: Request,res: Response) => {
        const bookingId = req.params.id;
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) res.status(404).json({ message: 'Foglalás nem található' });
            else{
            if (req.session.user && booking.user.toString() != req.session.user.toString()){res.status(404).json({ message: 'Session hiba!' })}
            else{
            const startDate = new Date(booking.startDate);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            if (startDate > tomorrow) {
            booking.status = 'canceled';
            await booking.save();
            res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
            } else {
            res.status(400).json({ message: 'A foglalás már elkezdődött vagy holnap kezdődik, nem mondható le' });
            }
            }
        }
  } catch (error) {
    console.error('Lemondási hiba:', error);
    res.status(500).json({ message: 'Szerverhiba a lemondás során' });
  }
});
router.put('/admin_canceled_booking/:id', async(req: Request,res: Response) => {
        const bookingId = req.params.id;
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) res.status(404).json({ message: 'Foglalás nem található' });
            else{
            if (req.session.user && !req.session.user.isAdmin){res.status(404).json({ message: 'Session hiba!' })}
            else{
            
            booking.status = 'canceled';
            await booking.save();
            res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
            }
            }
        } catch (error) {
            res.status(500).json({ message: 'Szerverhiba a lemondás során' });
  }
});
router.put('/admin_completed_booking/:id', async(req: Request,res: Response) => {
        const bookingId = req.params.id;
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) res.status(404).json({ message: 'Foglalás nem található' });
            else{
            if (req.session.user && !req.session.user.isAdmin){res.status(404).json({ message: 'Session hiba!' })}
            else{
            booking.status = 'completed';
            await booking.save();
            res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
            } 
            }
        } catch (error) {
            res.status(500).json({ message: 'Szerverhiba a lemondás során' });
  }
});
router.get('/car_bookings/:carId', async (req, res) => {
  try {
    const { carId } = req.params;

    const bookings = await Booking.find({ 
      car: carId, 
      status: { $ne: 'canceled' } 
    }).select('startDate endDate');
    const bookedRanges = bookings.map(b => ({
      start: b.startDate,
      end: b.endDate
    }));

    res.json(bookedRanges);
  } catch (err) {
    console.error('Hiba a foglalások lekérdezésekor:', err);
    res.status(500).send('Szerverhiba');
  }
});

    return router;
}