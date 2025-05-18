import { Router, Request, Response, NextFunction, request } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Car } from '../model/Car';
import { Extra } from '../model/Extra';
import { Booking } from '../model/Booking';


export const extraRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/list_extras', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query=Extra.find();
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
    router.post('/add_extra', (req: Request, res: Response) => {
        const name = req.body.name;
        const price = req.body.price;
        const details = req.body.details;
        const extra = new Extra({name: name, price:price, details:details});
        extra.save().then(data =>{
            res.status(200).send(data) 
        }).catch(error=>{
            res.send(error);
        })
    });
    router.post('/update_extra/', async (req: Request, res: Response): Promise<void>=> {
        const { _id, name, price, details} = req.body;
        try {
                const updateFields: any = {
                name,
                price,
                details,
            };
        const updatedExtra = await Extra.findByIdAndUpdate(_id, updateFields, { new: true });

        if (!updatedExtra) {
            res.status(404).send({ error: 'Extra nem található.' });
        }
        else{
        res.status(200).send(updatedExtra)};
    }catch (error) {
        console.error('Frissítési hiba:', error);
        res.status(500).send(error);
    }
    });
    router.delete('/delete_extra/:id', (req: Request, res: Response) => {
        const deletedextra =  Extra.findByIdAndDelete(req.params.id);
          deletedextra.then(data =>{
            res.status(200).send(data) 
        }).catch(error=>{
            res.send(error);
        })
    });
    router.get('/:id',  (req: Request, res: Response) => {
          const ExtraId = req.params.id;
          const extra =  Extra.findById(ExtraId);
          extra.then(data=>{
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send('Internal server error.')
        }).catch(error=>{
            res.send(error);
        })
    });
    //
    return router;
}