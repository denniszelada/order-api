"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.addUser = exports.getUser = void 0;
const applicationType_1 = require("../models/applicationType");
const orderApiUtility_1 = require("../utility/orderApiUtility");
const APPLICATION_JSON = 'application/json';
let users = [];
exports.getUser = (req, res, next) => {
    const username = req.params.username;
    const user = users.find(obj => obj.username === username);
    const httpStatusCode = user ? 200 : 404;
    return orderApiUtility_1.formatOutput(res, user, httpStatusCode, applicationType_1.ApplicationType.JSON);
};
exports.addUser = (req, res, next) => {
    const user = {
        // generic random value from 1 to 100 only for tests so far
        email: req.body.email,
        firstName: req.body.firstName,
        id: Math.floor(Math.random() * 100) + 1,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        userStatus: 1,
        username: req.body.username,
    };
    users.push(user);
    return orderApiUtility_1.formatOutput(res, user, 201, applicationType_1.ApplicationType.JSON);
};
exports.updateUser = (req, res, next) => {
    const username = req.params.username;
    const userIndex = users.findIndex(item => item.username === username);
    if (userIndex === -1) {
        return res.status(404).send();
    }
    const user = users[userIndex];
    user.username = req.body.username || user.username;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phone = req.body.phone || user.phone;
    user.userStatus = req.body.userStatus || user.userStatus;
    users[userIndex] = user;
    return orderApiUtility_1.formatOutput(res, {}, 204, applicationType_1.ApplicationType.JSON);
};
exports.removeUser = (req, res, next) => {
    const username = req.params.username;
    const userIndex = users.findIndex(item => item.username === username);
    if (userIndex === -1) {
        return res.status(404).send();
    }
    users = users.filter(item => item.username !== username);
    return orderApiUtility_1.formatOutput(res, {}, 204, applicationType_1.ApplicationType.JSON);
};
