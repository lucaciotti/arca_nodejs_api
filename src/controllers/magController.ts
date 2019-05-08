import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class MagController {

    getMaga(req: Request, res: Response) {
        let codmag: String = req.params.codmag;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM magana WHERE ALLTRIM(codice)=="' + codmag + '"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getRightMaga(req: Request, res: Response) {
        let codmag: String = req.params.codmag;
        let lenCodMag: number = codmag.length;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM magana WHERE RIGHT(ALLTRIM(codice),'+lenCodMag+')=="' + codmag + '"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getReparti(req: Request, res: Response) {
        let codRep: String = req.params.codrep;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }
        let whereString = '';
        if(codRep){
            whereString = 'WHERE ALLTRIM(codice) == "' + codRep + '"';
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_reparti '+ whereString)
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