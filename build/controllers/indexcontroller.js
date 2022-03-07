"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        console.log(req.headers);
        res.json({
            'answer': '404',
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
