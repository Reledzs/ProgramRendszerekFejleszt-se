import { Router, Request, Response, NextFunction, request } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Car } from '../model/Car';
import { Extra } from '../model/Extra';
import { Booking } from '../model/Booking';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {
    router.get('/', (req: Request, res: Response) => {
        res.status(200).send('Hello, World!');
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: any) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            req.session.user = {
                                userid: user._id,
                                role: user.role,
                                isAdmin: user.role=="Admin"
                              };
                            res.status(200).send(req.session.user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({email: email, password:password, name: name,address:address,nickname:nickname});
        user.save().then(data =>{
            res.status(200).send(data) 
        }).catch(error=>{
            res.send(error);
        })

    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response)=>{
        if(req.isAuthenticated()){
            const query=User.find();
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

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(200).send(false);
        } 
    });
    router.get('/checkAdmin', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            if(req.session.user?.isAdmin==true)res.status(200).send(true);
            else{res.status(200).send(false);}         
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.delete('/delete_user/:id', async (req: Request, res: Response): Promise<void>=> {
              // check for Admin MISSING
            try{
            if (req.isAuthenticated()) {
                if(req.session.user?.isAdmin==true){
              const existingCar = await User.findById(req.params.id);
              const deletedCar =  User.findByIdAndDelete(req.params.id);
              deletedCar.then(data =>{
                res.status(200).send(data) 
            }).catch(error=>{
                res.send(error);
            })}
            else{
                res.send("Not logged in as admin");
            }
        }
        else{res.send("Not logged in!");} 
    }catch{
        res.send("Szerver hiba!");
    }
    });
    router.post('/update_user/', async (req: Request, res: Response): Promise<void>=> {
        const { _id, email, name, address, nickname,role } = req.body;
        try {
                const updateFields: any = {
                email,
                name,
                address,
                nickname,
                role,
            };
        const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

        if (!updatedUser) {
            res.status(404).send({ error: 'Felhasználó nem található.' });
        }
        res.status(200).send(updatedUser);
    }catch (error) {
        console.error('Frissítési hiba:', error);
        res.status(500).send(error);
    };
    })
    return router;
}