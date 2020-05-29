"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const applicationType_1 = require("../models/applicationType");
const orderApiUtility_1 = require("../utility/orderApiUtility");
exports.getApi = (req, res, next) => {
    return orderApiUtility_1.formatOutput(res, { title: 'Order API' }, 200, applicationType_1.ApplicationType.JSON);
};
