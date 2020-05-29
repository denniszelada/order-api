"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = exports.removeOrder = exports.addOrder = exports.getAllOrders = exports.getOrder = void 0;
const _ = require("lodash");
const orderStatus_1 = require("../models/orderStatus");
const APPLICATION_JSON = 'application/json';
const applicationType_1 = require("../models/applicationType");
const orderApiUtility_1 = require("../utility/orderApiUtility");
let orders = [];
exports.getOrder = (req, res, next) => {
    const id = req.params.id;
    const order = orders.find(obj => obj.id === Number(id));
    const httpStatusCode = order ? 200 : 404;
    return orderApiUtility_1.formatOutput(res, order, httpStatusCode, applicationType_1.ApplicationType.JSON);
};
exports.getAllOrders = (req, res, next) => {
    const limit = Number(req.query.limit) || orders.length;
    const offset = Number(req.query.offset) || 0;
    const filteredOrders = _(orders)
        .drop(offset)
        .take(limit)
        .value();
    return orderApiUtility_1.formatOutput(res, filteredOrders, 200, applicationType_1.ApplicationType.JSON);
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
    return orderApiUtility_1.formatOutput(res, order, 201, applicationType_1.ApplicationType.JSON);
};
exports.removeOrder = (req, res, next) => {
    const id = Number(req.params.id);
    const orderIndex = orders.findIndex(item => item.id === id);
    if (orderIndex === -1) {
        return res.status(404).send();
    }
    orders = orders.filter(item => item.id !== id);
    return orderApiUtility_1.formatOutput(res, {}, 204, applicationType_1.ApplicationType.JSON);
};
exports.getInventory = (req, res, next) => {
    const status = req.query.status;
    let inventoryOrders = orders;
    if (status) {
        inventoryOrders = inventoryOrders.filter(item => item.status === status);
    }
    const grouppedOrders = _.groupBy(inventoryOrders, 'userId');
    return orderApiUtility_1.formatOutput(res, grouppedOrders, 200, applicationType_1.ApplicationType.JSON);
};
