"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class IngenieroController extends managerdb_1.default {
    getIngenieros(req, res) {
        const query = 'SELECT * FROM cpitvc_ingeniero';
        return IngenieroController.executeQuery(query, req, res, 'SELECT');
    }
    getIngenieroId(req, res) {
        if (!isNaN(Number(req.params.idIngeniero))) {
            delete req.body.idIngeniero;
            const query = 'SELECT * FROM cpitvc_ingeniero WHERE identificacion = $1';
            const parameters = [Number(req.params.idIngeniero)];
            return IngenieroController.executeQuery(query, parameters, res, 'SELECT');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const ingenieroController = new IngenieroController();
exports.default = ingenieroController;
