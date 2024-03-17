const express = require('express');
const bodyParser = require('body-parser');
const Cake = require('../models/cake');
const authenticate = require('../authenticate');

const cakeRouter = express.Router();
cakeRouter.use(bodyParser.json());

cakeRouter.route('/')
    .get((req, res, next) => {
        Cake.find()
            .populate('topping')
            .then((cake) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(cake);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.create(req.body)
            .then((cake) => {
                return Cake.findById(cake._id).populate('topping').exec();
            })
            .then((cake) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Created document", data: cake });
            })
            .catch((err) => next(err));
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("PUT operation not supported on /cakes");
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.deleteMany({})
            .then((resp) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Deleted successfully", resp });
            })
            .catch((err) => next(err));
    })

/** Router -> cakes/:cakeId */
cakeRouter
    .route("/:cakeId")
    .get((req, res, next) => {
        Cake.findById(req.params.cakeId)
            .then((cake) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(cake);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send(
            "POST operation not supported on /cakes/" + req.params.cakeId
        );
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.findByIdAndUpdate(
            req.params.cakeId,
            { $set: req.body },
            { new: true }
        )
            .then((cake) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Updated document", data: cake });
            })
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.findByIdAndDelete(req.params.cakeId)
            .then((resp) => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "Deleted successfully", resp });
            })
            .catch((err) => next(err));
    });




module.exports = cakeRouter;