"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./passport/passport");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const car_routes_1 = require("./routes/car_routes");
const booking_routes_1 = require("./routes/booking_routes");
const extra_routes_1 = require("./routes/extra_routes");
const path_1 = __importDefault(require("path"));
// let vs. var vs. const
// any vs. unknown
// undefined vs. null
// === vs. ==
const app = (0, express_1.default)();
const port = 5000;
const dbUrl = 'mongodb://mongo:27017/my_db';
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', client.register.contentType);
    res.end(yield client.register.metrics());
}));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../kliens/dist/src/index.html')));
//connecting to db
mongoose_1.default.connect(dbUrl).then((data) => {
    console.log('Connected to mongoDB');
}).catch(error => {
    console.log(error);
    return;
});
const whitelist = ['http://localhost:4200', 'http://localhost:5000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (true) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS.'), false);
        }
    },
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// bodyParser
app.use(body_parser_1.default.json());
// cookieParser
app.use((0, cookie_parser_1.default)());
// session
const sessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use((0, express_session_1.default)(sessionOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)(passport_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
app.use('/app', (0, routes_1.configureRoutes)(passport_1.default, express_1.default.Router()));
app.use('/app/cars', (0, car_routes_1.carRoutes)(passport_1.default, express_1.default.Router()));
app.use('/app/bookings', (0, booking_routes_1.bookingRoutes)(passport_1.default, express_1.default.Router()));
app.use('/app/extras', (0, extra_routes_1.extraRoutes)(passport_1.default, express_1.default.Router()));
app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});
console.log('After server is ready.');
//# sourceMappingURL=index.js.map