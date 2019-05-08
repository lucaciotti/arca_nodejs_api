import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class AnagrafController {

    getAnagraf(req: Request, res: Response) {
        let codicecf: String = req.params.codicecf;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM anagrafe WHERE ALLTRIM(codice)=="' + codicecf + '"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getSetInd(req: Request, res: Response) {
        let codSettore: String = req.params.codSettore;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        let whereString = ' ';
        if (codSettore) {
            whereString = ' WHERE ALLTRIM(settcod)=="' + codSettore +'"';
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_settind ' + whereString )
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