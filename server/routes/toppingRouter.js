const express = require('express');
const bodyParser = require('body-parser');
const Topping = require('../models/topping');
const authenticate = require('../authenticate');

const toppingRouter = express.Router();
toppingRouter.use(bodyParser.json());

/** Router topping */
toppingRouter.route('/')
    .get((req, res, next) => {
        Topping.find()
            .then((topping) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(topping);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Topping.create(req.body)
            .then((topping) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Created document", data: topping });
            })
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.send("PUT operation not supported on /topping");
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Topping.deleteMany({})
            .then((resp) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Deleted successfully", resp });
            })
            .catch((err) => next(err));
    })


/** Router -> topping/:toppingId */
toppingRouter.route('/:toppingId')
    .get((req, res, next) => {
        Topping.findById(req.params.toppingId)
            .then((topping) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(topping);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("POST operation not supported on /topping/" + req.params.toppingId);
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Topping.findByIdAndUpdate(req.params.toppingId, { $set: req.body }, { new: true })
            .then((topping) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Updated document", data: topping });
            })
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Topping.findByIdAndDelete(req.params.toppingId)
            .then((resp) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Deleted successfully", resp });
            })
            .catch((err) => next(err));
    })

module.exports = toppingRouter;