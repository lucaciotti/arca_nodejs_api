import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class PlUtilsController {
    // COLLO PL
    getColloPlByNCollo(req: Request, res: Response) {
        let idPl: Number = req.params.id;
        let nCollo: Number = req.params.ncollo;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_termpl WHERE id_pl==' + idPl + ' AND collo==' + nCollo)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getColloPlByTermid(req: Request, res: Response) {
        let idPl: Number = req.params.id;
        let termid: Number = req.params.termid;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_termpl WHERE id_pl==' + idPl + ' AND id_term==' + termid)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getLastColloPl(req: Request, res: Response) {
        let idPl: Number = req.params.id;

        connection
            .query('SELECT MAX(collo) as lastcollo FROM u_termpl WHERE id_pl==' + idPl + ' group by id_pl ')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    insertColloPl(req: Request, res: Response){
        let idPl: Number = parseFloat(req.get('id'));
        let nCollo: Number = parseFloat(req.get('nCollo'));
        let termid: Number = parseFloat(req.get('termid'));
        
        let table: String = 'u_termpl';
        let columns: String = 'id_term, id_pl, collo';
        let values: String = '' + termid + ', ' + idPl + ', ' + nCollo + '';
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

    chiudiColloPl(req: Request, res: Response) {
        let idPl: Number = parseFloat(req.get('id'));
        let nCollo: Number = parseFloat(req.get('nCollo'));
        let termid: Number = parseFloat(req.get('termid'));

        let table: String = 'u_termpl';
        console.log('UPDATE ' + table + ' SET id_term = ' + termid + 1 + ' WHERE id_pl==' + idPl + ' AND collo==' + nCollo);

        connection
            .execute('UPDATE ' + table + ' SET id_term = ' + termid + 1 + ' WHERE id_pl == ' + idPl + ' AND collo ==' + nCollo)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }
    
    // BANC PL
    getBancPlByNBanc(req: Request, res: Response) {
        let idPl: Number = req.params.id;
        let nBanc: Number = req.params.nbanc;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_bancpl WHERE id_pl==' + idPl + ' AND bancale==' + nBanc)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getBancPlByReparto(req: Request, res: Response) {
        let idPl: Number = req.params.id;
        let reparto: String = req.params.reparto;

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = '*'
        }

        connection
            .query('SELECT ' + columnString + ' FROM u_bancpl WHERE id_pl==' + idPl + ' AND reparto=="' + reparto +'" ')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getLastBancPl(req: Request, res: Response) {
        let idPl: Number = req.params.id;

        connection
            .query('SELECT MAX(bancale) as lastbanc FROM u_bancpl WHERE id_pl==' + idPl + ' group by id_pl ')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    insertBancPl(req: Request, res: Response) {
        let idPl: Number = parseFloat(req.get('id'));
        let nBanc: Number = parseFloat(req.get('nBanc'));
        let reparto: String = req.get('reparto');

        let table: String = 'u_bancpl';
        let columns: String = 'reparto, id_pl, bancale';
        let values: String = '' + reparto + ', ' + idPl + ', ' + nBanc + '';
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

    chiudiBancPl(req: Request, res: Response) {
        let idPl: Number = parseFloat(req.get('id'));
        let nBanc: Number = parseFloat(req.get('nBanc'));
        let reparto: String = req.get('reparto');

        let table: String = 'u_bancpl';
        console.log('UPDATE ' + table + ' SET reparto = "@"' + reparto + ' WHERE id_pl==' + idPl + ' AND bancale==' + nBanc);

        connection
            .execute('UPDATE ' + table + ' SET reparto = "@"' + reparto + ' WHERE id_pl==' + idPl + ' AND bancale==' + nBanc)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    // PLMOD + OCMOD
    insertPlMod(req: Request, res: Response) {
        let id: Number = parseFloat(req.get('id'));
        let qta: Number = req.get('qta') ? parseFloat(req.get('qta')) : 0;
        let nCollo: Number = parseFloat(req.get('nCollo'));
        let lotto: String = req.get('lotto') ? req.get('lotto') : '';
        let fatt: Number = req.get('fatt') ? parseFloat(req.get('fatt')) : 0;
        let um: String = req.get('um') ? req.get('um') : '';
        let articolo: String = req.get('articolo') ? req.get('articolo') : '';
        let reparto: String = req.get('reparto') ? req.get('reparto') : '';
        let bancale: Number = req.get('bancale') ? parseFloat(req.get('bancale')) : 0;
        let altezza: Number = req.get('altezza') ? parseFloat(req.get('altezza')) : 0;
        let misural: Number = req.get('misural') ? parseFloat(req.get('misural')) : 0;
        let misuras: Number = req.get('misuras') ? parseFloat(req.get('misuras')) : 0;
        let misurah: Number = req.get('misurah') ? parseFloat(req.get('misurah')) : 0;
        let peso: Number = req.get('peso') ? parseFloat(req.get('peso')) : 0;
        let modify: Number = req.get('modify') ? parseFloat(req.get('modify')) : 0;

        let table: String = 'u_plmod';
        let columns: String = 'id, quantita, collo, lotto, fatt, unmisura, articolo, reparto, bancale, altezza, u_misural, u_misurah, u_misuras, peso, modify';
        let values: String = id + ', ' + qta + ', ' + nCollo + ', "' + lotto + '", ' + fatt + ', "' + um + '", "' + articolo + '", "' + reparto + '", ' + bancale + ', ' + altezza + ', ' + misural + ', ' + misurah + ', ' + misuras + ', ' + peso + ', ' + modify;
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

    insertPlOcMod(req: Request, res: Response) {
        let id: Number = parseFloat(req.get('rfr')); // Rif From Rig
        let qta: Number = req.get('qta') ? parseFloat(req.get('qta')) : 0;
        let lotto: String = req.get('lotto') ? req.get('lotto') : '';

        let table: String = 'u_plocmod';
        let columns: String = 'id, qta, lotto';
        let values: String = id + ', ' + qta + ', "' + lotto + '" ';
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

    // ETICHPL
    insertEtichPl(req: Request, res: Response) {
        let id: Number = parseFloat(req.get('id'));
        let nCollo: Number = parseFloat(req.get('nCollo'));
        let prtname: String = req.get('prtname') ? req.get('prtname') : '';
        let artcollo: String = req.get('artcollo') ? req.get('artcollo') : '';
        let desccollo: String = req.get('desccollo') ? req.get('desccollo') : '';
        let extracollo: Number = req.get('extracollo') ? parseFloat(req.get('extracollo')) : 0;
        let warnpeso: Number = req.get('warnpeso') ? parseFloat(req.get('warnpeso')) : 0;

        let table: String = 'u_etichpl';
        let columns: String = 'id_doc, collo, printer, artcollo, descollo, extracollo, warnpeso';
        let values: String = id + ', ' + nCollo + ', "' + prtname + ', "' + artcollo + '", "' + desccollo + '", ' + extracollo + ', ' + warnpeso;
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

    // UPDATE Quantitare PL
    updateQtaRePl(req: Request, res: Response) {
        let idRowPl: Number = parseFloat(req.get('id'));
        let qta: Number = parseFloat(req.get('qta'));

        let table: String = 'docrig';
        console.log('UPDATE ' + table + ' SET quantitare = ' + qta + ' WHERE id==' + idRowPl + ' AND tipodoc=="PL"');

        connection
            .execute('UPDATE ' + table + ' SET quantitare = ' + qta + ' WHERE id==' + idRowPl + ' AND tipodoc=="PL"')
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