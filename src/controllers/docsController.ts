import { appConst } from './../appConst';
import { Request, Response } from 'express';
import ADODB = require('node-adodb');

const connection = ADODB.open(appConst.connectionString);

export class DocsController {

    getDocTesByTipo(req: Request, res: Response) {
        let esercizio: String = req.params.esercizio;
        let tipodoc: String = req.params.tipodoc;
        let numerodoc: String = req.params.numerodoc;

        let columnString: String = req.query.col;
        if(!columnString){
            columnString = '*'
        }

        let whereString: String = 'esercizio="'+esercizio+'" AND tipodoc="'+tipodoc+'" ';
        if(numerodoc) whereString = whereString+' AND ALLTRIM(numerodoc)="'+numerodoc+'"';

        connection
            .query('SELECT '+columnString+' FROM doctes WHERE '+whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getDocTesByID(req: Request, res: Response) {
        let id: String = req.params.id;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM doctes WHERE id=' + id)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getDocRigByTipo(req: Request, res: Response) {
        let esercizio: String = req.params.esercizio;
        let tipodoc: String = req.params.tipodoc;
        let numerodoc: String = req.params.numerodoc;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        let whereString: String = 'esercizio="' + esercizio + '" AND tipodoc="' + tipodoc + '" ';
        if (numerodoc) whereString = whereString + ' AND ALLTRIM(numerodoc)="' + numerodoc + '"';

        connection
            .query('SELECT ' + columnString + ' FROM docrig WHERE ' + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getDocRigByID(req: Request, res: Response) {
        let id: String = req.params.id;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM docrig WHERE id=' + id)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getDocRigByIDTes(req: Request, res: Response) {
        let id: String = req.params.id;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM docrig WHERE id_testa=' + id)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

   

}