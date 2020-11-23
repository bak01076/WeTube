import session from "express-session";
import MongoStore from "connect-mongo";
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import passport from 'passport';
import "./passport";
import { localMiddleware } from './middlewares';
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';

const app = express();
const CookieStore = MongoStore(session);

app.use(helmet({contentSecurityPolicy: false }));
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('dev')); 
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.users, userRouter);
app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);

export default app;
