"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class IngenieroController extends managerdb_1.default {
    // public getIngenieros(req: Request, res: Response): Promise<any> {
    //     const query: string = 'SELECT * FROM cpitvc_ingeniero';
    //     return IngenieroController.executeQuery(query, req, res, 'select');
    // }
    getIngenieroId(req, res) {
        if (!isNaN(Number(req.params.idIngeniero))) {
            delete req.body.idIngeniero;
            const query = 'SELECT * FROM cpitvc_ingeniero WHERE identificacion = $1';
            const parameters = [Number(req.params.idIngeniero)];
            return IngenieroController.executeQuery(query, parameters, res);
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    generateCertif(req, res) {
    }
}
const ingenieroController = new IngenieroController();
exports.default = ingenieroController;
