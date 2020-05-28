"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.addUser = exports.getUser = void 0;
let users = [];
exports.getUser = (req, res, next) => {
    const username = req.params.username;
    const user = users.find(obj => obj.username == username);
    const httpStatusCode = user ? 200 : 404;
    return res.status(httpStatusCode).send(user);
};
exports.addUser = (req, res, next) => {
    const user = {
        id: Math.floor(Math.random() * 100) + 1,
        username: req.body.username,
        firstName: req.body.username,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userStatus: 1,
    };
    users.push(user);
    return res.status(201).send(user);
};
exports.updateUser = (req, res, next) => {
    const username = req.params.username;
    const userIndex = users.findIndex(item => item.username == username);
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
    return res.status(204).send();
};
exports.removeUser = (req, res, next) => {
    const username = req.params.username;
    const userIndex = users.findIndex(item => item.username === username);
    if (userIndex === -1) {
        return res.status(404).send();
    }
    users = users.filter(item => item.username !== username);
    return res.status(204).send();
};
