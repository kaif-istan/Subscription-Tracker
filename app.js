import express from 'express';
import {PORT} from './config/env.js';


import authRouter from './router/auth.routes.js';
import userRouter from './router/user.routes.js';
import subscriptionRouter from './router/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {  
  res.send('Welcome to the Subscription tracker API!');
}
);  

app.listen(PORT, async () => {
  console.log(`subscription Tracker API is running on http://localhost:${PORT}`);

  await connectToDatabase()

  
}
);


export default app;
// This is the main entry point for the Subscription Tracker API.
// It sets up an Express server and defines a simple route that responds with a welcome message.