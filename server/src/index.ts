
import express from 'express';
import { Request, Response } from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession  from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import cors from 'cors';
import { carRoutes } from './routes/car_routes';
import { bookingRoutes } from './routes/booking_routes';
import { extraRoutes } from './routes/extra_routes';
import path from 'path'
// let vs. var vs. const
// any vs. unknown
// undefined vs. null
// === vs. ==

const app = express();
const port = 5000;
const dbUrl = 'mongodb://mongo:27017/my_db';
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.use(express.static(path.join(__dirname, '../kliens/dist/frontend-neve')));
//connecting to db
mongoose.connect(dbUrl).then((data)=>{
    console.log('Connected to mongoDB');
}).catch(error =>{
    console.log(error)
    return;
});

const whitelist = ['http://localhost:4200','http://localhost:5000']
const corsOptions={
    origin:(origin:string | undefined,callback:(err: Error|null,allowed:boolean)=>void)=>{
        if(true){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS.'),false);
        }
    },
    credentials: true 
};

app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.json());

// cookieParser
app.use(cookieParser());
// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/app', configureRoutes(passport, express.Router()));
app.use('/app/cars', carRoutes(passport, express.Router()));
app.use('/app/bookings', bookingRoutes(passport, express.Router()));
app.use('/app/extras', extraRoutes(passport, express.Router()));
app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');
