import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';


class IngenieroController extends ManagerDB {

    // public getIngenieros(req: Request, res: Response): Promise<any> {
    //     const query: string = 'SELECT * FROM cpitvc_ingeniero';
    //     return IngenieroController.executeQuery(query, req, res, 'select');
    // }

    public getIngenieroId(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.idIngeniero))) {
            delete req.body.idIngeniero;
            const query: string = 'SELECT * FROM cpitvc_ingeniero WHERE identificacion = $1';
            const parameters = [Number(req.params.idIngeniero)];
            return IngenieroController.executeQuery(query, parameters, res)   
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }

    public generateCertif(req: Request, res: Response){
        
    }


}

const ingenieroController = new IngenieroController();
export default ingenieroController;