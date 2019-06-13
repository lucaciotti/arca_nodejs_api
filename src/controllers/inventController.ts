import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class InventController {

    getCoupon(req: Request, res: Response) {
        let coupon: String = req.params.coupon;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*';
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_invent WHERE ALLTRIM(codcart)=="' + coupon + '"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getAllCoupons(req: Request, res: Response) {
        let esercizio: String = req.params.esercizio;
        let codmag: String = req.params.codmag;
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*';
        }
        let orderby: String = req.query.orderby;
        if (!orderby) {
            orderby = 'codicearti,lotto'
        }
        let isdeleted: String = req.query.isdeleted;

        let whereString: String = 'esercizio="' + esercizio + '" AND ALLTRIM(magazzino)=="' + codmag + '" ';
        if (codart) whereString = whereString + ' AND ALLTRIM(codicearti)=="' + codart + '" ';
        if (isdeleted) whereString = whereString + ' AND warn=1';
        console.log(whereString);

        connection
            .query('SELECT ' + columnString + ' FROM u_invent WHERE ' + whereString + ' ORDER BY '+orderby)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    insertCoupon(req: Request, res: Response) {
        let coupon: String = req.get('coupon') ? req.get('coupon') : '';
        let codart: String = req.get('codart') ? req.get('codart') : '';
        let codmag: String = req.get('codmag') ? req.get('codmag') : '';
        let qta: number = req.get('qta') ? parseFloat(req.get('qta')) : 0;
        let codlot: String = req.get('codlot') ? req.get('codlot') : '';
        let ubicaz: String = req.get('ubicaz') ? req.get('ubicaz') : '';
        let idterm: number = req.get('idterm') ? parseFloat(req.get('idterm')) : 0;
        let esercizio: String = req.get('esercizio') ? req.get('esercizio') : '';
        // let timestamp: String = new Date().toLocaleString('en-GB');
        // console.log(timestamp);

        let table: String = 'u_invent';
        let columns: String = 'codicearti, quantita, magazzino, lotto, codcart, esercizio, timestamp, id_term, ubicaz';
        let values: String = '"' + codart + '", ' + qta + ', "' + codmag + '", "' 
            + codlot + '", "' + coupon + '", "' + esercizio + '", DATETIME(),' + idterm + ', "' + ubicaz + '"';
        console.log('INSERT INTO ' + table + ' (' + columns + ') VALUES (' + values + ') ');

        connection
            .execute('INSERT INTO ' + table + ' (' + columns + ') VALUES (' + values + ') ')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });

    }

    destroyCoupon(req: Request, res: Response) {
        let coupon: String = req.params.coupon;

        let table: String = 'u_invent';
        let whereString: String =  'ALLTRIM(codcart)=="'+coupon+'"';

        connection
            .execute('DELETE FROM ' + table + ' WHERE ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });

    }

    markWarnCoupon(req: Request, res: Response) {
        let coupon: String = req.params.coupon;

        let table: String = 'u_invent';
        let setString: String = 'warn=1';
        let whereString: String = 'ALLTRIM(codcart)=="' + coupon + '"';

        connection
            .execute('UPDATE ' + table + ' SET ' + setString + ' WHERE ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });

    }
}