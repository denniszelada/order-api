"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRoute = void 0;
const apiController = require("../controllers/api");
class APIRoute {
    routes(app) {
        app.route('/api').get(apiController.getApi);
    }
}
exports.APIRoute = APIRoute;
