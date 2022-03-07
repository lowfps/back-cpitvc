import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class IngenieroController extends ManagerDB {

    public getIngenieros(req: Request, res: Response): Promise<any> {
        const query: string = 'SELECT * FROM cpitvc_ingeniero';
        return IngenieroController.executeQuery(query, req, res, 'SELECT');
    }

    public getIngenieroId(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.idIngeniero))) {
            delete req.body.idIngeniero;
            const query: string = 'SELECT * FROM cpitvc_ingeniero WHERE identificacion = $1';
            const parameters = [Number(req.params.idIngeniero)];
            return IngenieroController.executeQuery(query, parameters, res, 'SELECT');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }

    // public createRol(req: Request, res: Response): Promise<any> {
    //     const query: string = 'INSERT INTO rol (namerol) VALUES ($1) RETURNING codrol';
    //     const parameters = [req.body.namerol];
    //     return IngenieroController.executeQuery(query, parameters, res, 'INSERT');
    // }

    // public deleteRol(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.codRol))) {
    //         const query: string = 'DELETE FROM rol WHERE codrol = $1';
    //         const parameters = [Number(req.params.codRol)];
    //         return IngenieroController.executeQuery(query, parameters, res, 'DELETE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    // }

    // public updateRol(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.codRol))) {
    //         delete req.body.codrol;
    //         const query: string = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
    //         const parameters = [Number(req.params.codRol), req.body.namerol];
    //         return IngenieroController.executeQuery(query, parameters, res, 'UPDATE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    // }
}

const ingenieroController = new IngenieroController();
export default ingenieroController;