import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class ArticleController {

    getArticle(req: Request, res: Response) {
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM magart WHERE ALLTRIM(codice)=="'+codart+'"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getArticlesStartWith(req: Request, res: Response) {
        let codart: String = req.params.codart;
        let codartLen: Number = codart.length;
        connection
            .query('SELECT codice, descrizion, unmisura, gruppo FROM magart WHERE LEFT(codice, ' + codartLen + ')=="' + codart + '"')
            .then(data => {
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getArticlesByGroup(req: Request, res: Response) {
        let group: String = req.params.group;
        let groupLen: Number = group.length;
        connection
            .query('SELECT codice, descrizion, unmisura, gruppo FROM magart WHERE LEFT(gruppo, '+groupLen+')=="'+group+'"')
            .then(data => {
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getArtByBarcode(req: Request, res: Response) {
        let barcode: String = req.params.barcode;
        connection
            .query('SELECT codicearti, unmisura FROM magalias WHERE alias = "'+barcode+'"')
            .then(data => {
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getArtByBarcodeAlt(req: Request, res: Response) {
        let barcode: String = req.params.barcode;
        connection
            .query('select codicearti, "" as unmisura from codalt where u_barcode ="'+ barcode + '"')
            .then(data => {
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getAllUbicaz(req: Request, res: Response) {
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = 'u_ubicaz.*'
        }

        connection
            .query('SELECT ' + columnString + ', ubicaz.descrizion as DescrUbi FROM u_ubicaz LEFT JOIN ubicaz on ALLTRIM(ubicaz.codice)==ALLTRIM(u_ubicaz.ubicazione) WHERE ALLTRIM(codicearti)=="' + codart + '"')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getLotti(req: Request, res: Response) {
        let codart: String = req.params.codart;
        let codLot: String = req.params.codLot;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        let whereString = ' ALLTRIM(codicearti)==' + codart + ' AND !EMPTY(codice) ';
        if(codLot){
            whereString = ' AND ALLTRIM(codice)==' + codLot;
        }

        connection
            .query('SELECT ' + columnString + ' FROM lotti WHERE ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getImballi(req: Request, res: Response) {
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        let whereString = ' ';
        if (codart) {
            whereString = ' WHERE ALLTRIM(codice)==' + codart;
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_imballi ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getPallet(req: Request, res: Response) {
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        let whereString = ' ';
        if (codart) {
            whereString = ' WHERE ALLTRIM(codice)==' + codart;
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_pallet ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    // ------------------------------------------------

    updateDefaultUbicaz(req: Request, res: Response) {
        // TODO
    }

    insertUbicaz(req: Request, res: Response) {
        // TODO
    }

}