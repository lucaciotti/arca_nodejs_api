import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class GiacController {

    getGiacArt(req: Request, res: Response) {
        let esercizio: String = req.params.esercizio;
        let codart: String = req.params.codart;
        let codmag: String = req.params.codmag;

        let columnString: String = req.query.col;
        let onlyGiac: String = req.query.onlygiac;
        
        if (!columnString) {
            columnString = 'maggiac.*';
        }
        columnString = columnString + ', (giacini+progqtacar+progqtaret-progqtasca) as esistenza, magana.descrizion as magdesc, magart.unmisura';

        let whereString: String = 'esercizio="' + esercizio + '" AND ALLTRIM(articolo)="' + codart + '" ';
        if (codmag) whereString = whereString + ' AND ALLTRIM(magazzino)="' + codmag + '"';
        if (onlyGiac) whereString = whereString + ' AND (giacini+progqtacar+progqtaret-progqtasca)<>0';

        let query = 'SELECT ' + columnString + ' FROM maggiac ' +
                        'INNER JOIN magana on magana.codice==maggiac.magazzino ' +
                        'INNER JOIN magart on ALLTRIM(magart.codice)==ALLTRIM(maggiac.articolo) ' +
                        'WHERE ' + whereString + ' ORDER BY magazzino';

        connection
            .query(query)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getGiacMag(req: Request, res: Response) {
        let esercizio: String = req.params.esercizio;
        let codmag: String = req.params.codmag;
        let codart: String = req.params.codart;

        let columnString: String = req.query.col;
        let onlyGiac: String = req.query.onlygiac;

        if (!columnString) {
            columnString = 'maggiac.*';
        }
        columnString = columnString + ', (giacini+progqtacar+progqtaret-progqtasca) as esistenza';

        let whereString: String = 'esercizio="' + esercizio + '" AND ALLTRIM(magazzino)="' + codmag + '" ';
        if (codart) whereString = whereString + ' AND ALLTRIM(articolo)="' + codart + '"';
        if (onlyGiac) whereString = whereString + ' AND (giacini+progqtacar+progqtaret-progqtasca)<>0';

        connection
            .query('SELECT ' + columnString + ' FROM maggiac WHERE ' + whereString + ' ORDER BY articolo')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getGiacArtLot(req: Request, res: Response) {
        let codmag: String = req.params.codmag;
        let codart: String = req.params.codart;
        let codlot: String = req.params.codlot;

        let columnString: String = req.query.col;
        let onlyGiac: String = req.query.onlygiac;

        if (!columnString) {
            columnString = 'maggiac.*';
        }
        columnString = columnString + ', (progqtacar+progqtaret-progqtasca) as esistenza';

        let whereString: String = 'ALLTRIM(magazzino)="' + codmag + '" AND ALLTRIM(articolo)="' + codart + '"';
        if (codlot) whereString = whereString + ' AND ALLTRIM(lotto)="' + codlot + '"';
        if (onlyGiac) whereString = whereString + ' AND (progqtacar+progqtaret-progqtasca)<>0';

        connection
            .query('SELECT ' + columnString + ' FROM maggiacl WHERE ' + whereString + 'ORDER BY lotto')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data});
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    
}