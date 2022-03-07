"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class RolController extends managerdb_1.default {
    getRoles(req, res) {
        const query = 'SELECT * FROM cpitvc_universidad';
        return RolController.executeQuery(query, req, res, 'SELECT');
    }
    createRol(req, res) {
        const query = 'INSERT INTO rol (namerol) VALUES ($1) RETURNING codrol';
        const parameters = [req.body.namerol];
        return RolController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteRol(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            const query = 'DELETE FROM rol WHERE codrol = $1';
            const parameters = [Number(req.params.codRol)];
            return RolController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateRol(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            delete req.body.codrol;
            const query = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.codRol), req.body.namerol];
            return RolController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const rolController = new RolController();
exports.default = rolController;
