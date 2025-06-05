import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const SubscriptionRouter = Router();
SubscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

SubscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET subscription details' });
});

SubscriptionRouter.post('/', authorize, createSubscription);

SubscriptionRouter.put('/', (req, res) => {
    res.send({ title: 'UPDATE subscriptions' });
});

SubscriptionRouter.delete('/', (req, res) => {
    res.send({ title: 'DELETE subscriptions' });
});

SubscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

SubscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscriptions' });
});

SubscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
});

export default SubscriptionRouter;
// This module defines a route for getting all subscriptions. It currently responds with a placeholder message.