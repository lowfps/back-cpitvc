import { Router } from 'express';
import ingenieroController from '../controllers/cpitvc_ingeniero'
class IngenieroRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        // this.router.get('/', ingenieroController.getIngenieros);
        this.router.get('/:idIngeniero', ingenieroController.getIngenieroId);
        this.router.get('/certif', ingenieroController.generateCertif);
        // this.router.post('/create', rolController.createRol);
        // this.router.delete('/:codRol', rolController.deleteRol);
        // this.router.put('/update/:codRol', rolController.updateRol);
    }
}

const ingenieroRoutes = new IngenieroRoutes();
export default ingenieroRoutes.router;