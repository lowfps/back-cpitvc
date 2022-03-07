import { Response } from 'express';
import pool from './connectiondb';


class ManagerDB {
    protected static async executeQuery(sql: string, parameters: any, res: Response, type: string): Promise < any > {
        //? pool.query(sql, parameters).then(out => {
        pool.result(sql, parameters).then(out => {
            switch (type.toUpperCase()) {
                case 'SELECT':
                    res.status(200).json(out.rows);
                    break;
                case 'INSERT':
                    res.status(200).json({ 'message': 'Registro creado', 'id': out.rows });
                    break;
                case 'DELETE':
                    out.rowCount > 0
                        ? res.status(200).json({ 'message': 'Registro eliminado', 'affected rows': out.rowCount })
                        : res.status(400).json({ 'message': 'Registro no encontrado' });
                    break;
                case 'UPDATE':
                    out.rowCount > 0
                        ? res.status(200).json({ 'message': 'Registro actualizado', 'affected rows': out.rowCount })
                        : res.status(400).json({ 'message': 'Registro no encontrado' });
                    break;
                default:
                    res.status(400).json({ 'answer': 'Servicio no implementado' });
                    break;
            }
        })
    }
}

export default ManagerDB;