"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = exports.removeOrder = exports.addOrder = exports.getOrder = void 0;
const _ = require("lodash");
const orderStatus_1 = require("../model/orderStatus");
let orders = [];
exports.getOrder = (req, res, next) => {
    const id = req.params.id;
    const order = orders.find(obj => obj.id === Number(id));
    const httpStatusCode = order ? 200 : 404;
    return res.status(httpStatusCode).send(order);
};
exports.addOrder = (req, res, next) => {
    const order = {
        // generic random value from 1 to 100 only for tests so far
        complete: false,
        id: Math.floor(Math.random() * 100) + 1,
        quantity: req.body.quantity,
        shipDate: req.body.shipDate,
        status: orderStatus_1.OrderStatus.Placed,
        userId: req.body.userId,
    };
    orders.push(order);
    return res.status(201).send(order);
};
exports.removeOrder = (req, res, next) => {
    const id = Number(req.params.id);
    const orderIndex = orders.findIndex(item => item.id === id);
    if (orderIndex === -1) {
        return res.status(404).send();
    }
    orders = orders.filter(item => item.id !== id);
    return res.status(204).send();
};
exports.getInventory = (req, res, next) => {
    const status = req.query.status;
    let inventoryOrders = orders;
    if (status) {
        inventoryOrders = inventoryOrders.filter(item => item.status === status);
    }
    const grouppedOrders = _.groupBy(inventoryOrders, 'userId');
    return res.status(200).send(grouppedOrders);
};
