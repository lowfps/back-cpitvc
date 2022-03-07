"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class UniversidadController extends managerdb_1.default {
    getUniversidad(req, res) {
        const query = 'SELECT * FROM cpitvc_universidad';
        return UniversidadController.executeQuery(query, req, res, 'SELECT');
    }
}
const universidadController = new UniversidadController();
exports.default = universidadController;
