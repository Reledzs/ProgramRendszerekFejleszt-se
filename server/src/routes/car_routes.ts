import { Router, Request, Response, NextFunction, request } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Car } from '../model/Car';
import { Extra } from '../model/Extra';
import { upload } from '../middleware/upload.middleware';
import * as fs from 'fs';
import * as path from 'path';

export const carRoutes = (passport: PassportStatic, router: Router): Router => {
    router.get('/list_cars', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query=Car.find();
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
     router.post('/add_car', upload.single('image'), (req, res) => {
    if(req.file){
        const imagePath = `/uploads/${req.file.filename}`;
        
        const { brand, car_model, year, price } = req.body;

        const car = new Car({
            brand,
            car_model,
            year: Number(year),
            price: Number(price),
            imagePath});
        

    car.save()
      .then(data => res.status(200).send(data))
      .catch(error => {
        console.error('Mentési hiba:', error);
        res.status(500).send(error);
      });
      }
    });

    router.post('/update_car', upload.single('image'), async (req: Request, res: Response): Promise<void>=> {
        const { _id, brand, car_model, year, price } = req.body;

        if (!_id) {
            res.status(400).send({ error: 'Hiányzik az _id a kérésből.' });
        }

        try {
            const updateFields: any = {
            brand,
            car_model,
            year: Number(year),
            price: Number(price),
        };

    if (req.file) {
      updateFields.imagePath = `/uploads/${req.file.filename}`;
      const existingCar = await Car.findById(_id);
      if (existingCar?.imagePath) {
        const oldPath = path.join(__dirname, '..','..','..', 'public', existingCar.imagePath);
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.warn('Nem sikerült törölni a régi képet:', err.message);
          }
        });
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(_id, updateFields, { new: true });

    if (!updatedCar) {
      res.status(404).send({ error: 'Autó nem található.' });
    }

    res.status(200).send(updatedCar);
  } catch (error) {
    console.error('Frissítési hiba:', error);
    res.status(500).send(error);
  }
    });
    router.delete('/delete_car/:id', async (req: Request, res: Response): Promise<void>=> {
          const existingCar = await Car.findById(req.params.id);
        if (existingCar?.imagePath) {
            const oldPath = path.join(__dirname, '..','..','..', 'public', existingCar.imagePath);
            fs.unlink(oldPath, (err) => {
            if (err) {
                 console.warn('Nem sikerült törölni a régi képet:', err.message);
            }
            });
        }
          const deletedCar =  Car.findByIdAndDelete(req.params.id);
          deletedCar.then(data =>{
            res.status(200).send(data) 
        }).catch(error=>{
            res.send(error);
        })
    });
    router.get('/:id',  (req: Request, res: Response) => {
          const carId = req.params.id;
          const car =  Car.findById(carId);
          car.then(data=>{
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send('Internal server error.')
        }).catch(error=>{
            res.send(error);
        })
    });
    
    return router;
}