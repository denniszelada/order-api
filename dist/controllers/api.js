"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const orderApiUtility_1 = require("../utility/orderApiUtility");
exports.getApi = (req, res, next) => {
    return orderApiUtility_1.formatOutput(res, { title: 'Order API' }, 200);
};
