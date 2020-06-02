"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOutput = void 0;
const js2xmlparser = require("js2xmlparser");
const applicationType_1 = require("../models/applicationType");
exports.formatOutput = (res, data, statusCode, rootElement) => {
    return res.format({
        default: () => {
            res.status(406).send();
        },
        json: () => {
            res.type(applicationType_1.ApplicationType.JSON);
            res.status(statusCode).send(data);
        },
        xml: () => {
            res.type(applicationType_1.ApplicationType.XML);
            res.status(200).send(js2xmlparser.parse(rootElement, data));
        },
    });
};
