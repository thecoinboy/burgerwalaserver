import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { router } from './routes/User.js'
import { orderRoute } from "./routes/order.js";
import bodyParser from 'body-parser';

dotenv.config({ path:'./config/config.env'});
export const app = express();

app.use(urlencoded({
    extended: true,
}))
app.use(cors({  
    credentials: true,
})
);

app.use(session({
    secret:process.env.SESION_SEC,
    resave:false,
    saveUninitialized:false,
    cookie: {
        sameSite: 'none',  // allow the cookie to be sent in cross-site requests
        secure: false,  // only send the cookie over HTTPS
      },
})
);

app.use(express.json());
app.use(cookieParser());
app.enable("trust proxy");
app.use(bodyParser.json({ extended: true, limit: "30mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }))

// routes
app.use('/api/v1', router)
app.use('/api/v1', orderRoute)