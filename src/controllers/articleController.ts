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

    // ------------------------------------------------

    updateDefaultUbicaz(req: Request, res: Response) {
        // TODO
    }

    insertUbicaz(req: Request, res: Response) {
        // TODO
    }

}