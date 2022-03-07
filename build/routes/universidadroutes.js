"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cpitvc_universidad_1 = __importDefault(require("../controllers/cpitvc_universidad"));
class UniversidadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cpitvc_universidad_1.default.getUniversidad);
        // this.router.post('/create', rolController.createRol);
        // this.router.delete('/:codRol', rolController.deleteRol);
        // this.router.put('/update/:codRol', rolController.updateRol);
    }
}
const rolRoutes = new UniversidadRoutes();
exports.default = rolRoutes.router;
