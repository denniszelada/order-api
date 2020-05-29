"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
class Index {
    routes(app) {
        app.route('/index').get((req, res) => {
            res.status(200).send({ status: 'success' });
        });
    }
}
exports.Index = Index;
