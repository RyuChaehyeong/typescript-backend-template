import express, {Request, Response, NextFunction, Router} from 'express';
import { createConnection } from 'typeorm';
import { Routes } from './interfaces/routes.interface';
import { dbConnection } from './databases/data-source';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import  passport from 'passport';
import Passport from './passport/passport'
import router from './routes';

class App {
    public app: express.Application;
    public port: string | number;
    public passportConfig: Passport = new Passport();

    constructor() {

        this.connectToDatabase();
        
        this.app = express();
        this.port = 3001;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`
            ##############################
            Server listening on port : 3001
            ##############################
            `)
        });
    }


    private connectToDatabase() {
        createConnection(dbConnection);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(session({
            resave: false,
            saveUninitialized: true,
            secret: 'secret-code'
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.passportConfig.config();

    }

    private initializeRoutes() {
        router(this.app);
    }
}

export default App;