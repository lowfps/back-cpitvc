"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class UserController extends managerdb_1.default {
    getUsers(req, res) {
        const query = 'SELECT coduser, codrol, email, password FROM public.user';
        return UserController.executeQuery(query, req, res, 'SELECT');
    }
    createUser(req, res) {
        //! delete req.body.token;
        const query = 'INSERT INTO user(codrol, email, password) VALUES($1, $2, $3)';
        const parameters = [req.body.codrol, req.body.email, req.body.password];
        return UserController.executeQuery(query, parameters, res, 'INSERT');
        //! return UserController.executeQuery(query, parameters, res, 'INSERT-USER');
    }
    deleteUser(req, res) {
        if (!isNaN(Number(req.params.codUser))) {
            const query = 'DELETE FROM user WHERE coduser = $1';
            const parameters = [Number(req.params.codUser)];
            return UserController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateUser(req, res) {
        if (!isNaN(Number(req.params.codUser))) {
            delete req.body.coduser;
            const query = 'UPDATE user SET codrol=$2, email=$3, password=$4 WHERE codUser=$1';
            const parameters = [Number(req.params.codUser), req.body.codrol, req.body.email, req.body.password];
            return UserController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const userController = new UserController();
exports.default = userController;
