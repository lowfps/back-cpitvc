import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        console.log(req.headers);
        res.json({
            'answer': '404',
        });
    }
}

const indexController = new IndexController();
export default indexController;