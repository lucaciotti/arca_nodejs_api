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
            columnString = '*';
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
            columnString = '*';
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
            columnString = '*';
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
            columnString = '*';
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

    updBancToColloInPB(req: Request, res: Response){
        let idRifTesPl: Number = parseFloat(req.get('riffromt'));
        let idTesPB: Number = parseFloat(req.get('idTesPB'));
        let nCollo: Number = parseFloat(req.get('collo'));
        let nBanc: Number = parseFloat(req.get('banc'));

        let table: String = 'docrig';
        let whereString: String = ' WHERE ';
        if(idTesPB){
            whereString += ' id_testa==' + idTesPB ;
        } else if(idRifTesPl){
            whereString += ' riffromt==' + idRifTesPl;
        }
        whereString += ' AND u_costk==' + nCollo;

        console.log('UPDATE ' + table + ' SET u_costk1 = ' + nBanc + whereString );

        connection
            .execute('UPDATE ' + table + ' SET u_costk1 = ' + nBanc + whereString )
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    updBancToColloInPlMod(req: Request, res: Response) {
        let idRowPl: Number = parseFloat(req.get('idRowPl'));
        let nCollo: Number = parseFloat(req.get('collo'));
        let nBanc: Number = parseFloat(req.get('banc'));

        let table: String = 'u_plmod';
        console.log('UPDATE ' + table + ' SET bancale = ' + nBanc + ' WHERE id==' + idRowPl + ' AND collo==' + nCollo);

        connection
            .execute('UPDATE ' + table + ' SET bancale = ' + nBanc + ' WHERE id==' + idRowPl + ' AND collo==' + nCollo)
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

    getPlMod(req: Request, res: Response) {
        let idPlRow: Number = req.params.id;
        let nCollo: Number = req.params.ncollo;
        let nBanc: Number = req.params.nbanc;

        let table: String = 'u_plmod ' +
                    'LEFT JOIN docrig ON docrig.id==u_plmod.id ' +
                    'LEFT JOIN magart ON ALLTRIM(magart.codice)==ALLTRIM(IIF(EMPTY(u_plmod.articolo), docrig.codicearti, u_plmod.articolo)) ';

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = 'IIF(EMPTY(u_plmod.articolo), docrig.codicearti, u_plmod.articolo) as codicearti, ' +
                'u_plmod.quantita, u_plmod.collo, u_plmod.bancale, u_plmod.unmisura, u_plmod.fatt, magart.pesounit, u_plmod.peso as pesolordo, magart.danger as imballo ';
        }

        let whereString: String = '';
        if (nCollo != -1) {
            whereString = ' AND u_plmod.collo==' + nCollo;
        }
        if (nBanc) {
            whereString = ' AND u_plmod.bancale==' + nBanc;
        }

        connection
            .query('Select ' + columnString + ' FROM ' + table + ' WHERE u_plmod.id==' + idPlRow + whereString)
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
        let values: String = id + ', ' + nCollo + ', "' + prtname + '", "' + artcollo + '", "' + desccollo + '", ' + extracollo + ', ' + warnpeso;
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

    //PreBolla
    getPBRows(req: Request, res: Response) {
        let idPB: Number = req.params.id;
        let nCollo: Number = req.params.ncollo;
        let nBanc: Number = req.params.nbanc;

        let table: String = 'docrig ' +
            'LEFT JOIN magart ON ALLTRIM(magart.codice)==ALLTRIM(docrig.codicearti) ';

        let columnString: String = req.query.col;
        let onlyCollo: String = req.query.onlyCollo;
        if (!columnString) {
            columnString = 'docrig.codicearti, docrig.quantita, docrig.unmisura, docrig.u_costk as collo, docrig.rifcer as reparto,' +
                    'docrig.u_costk1 as bancale, docrig.unmisura, docrig.fatt, magart.pesounit, docrig.prezzoacq as pesolordo, magart.danger as imballo ';
        }

        let whereString: String = '';
        if(nCollo!=-1){
            whereString = ' AND docrig.u_costk==' + nCollo;
        }
        if (nBanc) {
            whereString = ' AND docrig.u_costk1==' + nBanc;
        }
        if(onlyCollo){
            whereString = ' AND docrig.u_costk!=0';
        }

        connection
            .query('SELECT ' + columnString + ' FROM ' + table + ' WHERE id_testa=' + idPB + whereString)
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getListColliPB(req: Request, res: Response) {
        let idPB: Number = req.params.id;

        let table: String = 'docrig ';

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = 'docrig.u_costk as collo, docrig.rifcer as reparto';
        }

        connection
            .query('SELECT ' + columnString + ' FROM ' + table + ' WHERE id_testa=' + idPB + ' AND u_costk!=0 GROUP BY rifcer, u_costk ORDER BY rifcer, u_costk')
            .then(data => {
                // console.log(JSON.stringify(data, null, 2));
                res.json({ success: data });
            })
            .catch(error => {
                console.log(error);
                res.status(503).json({ errMessage: error });
            });
    }

    getListBancPB(req: Request, res: Response) {
        let idPB: Number = req.params.id;

        let table: String = 'docrig ';

        let columnString: String = req.query.col;
        if (!columnString) {
            columnString = 'docrig.u_costk1 as banc, docrig.rifcer as reparto';
        }

        connection
            .query('SELECT ' + columnString + ' FROM ' + table + ' WHERE id_testa=' + idPB + ' AND u_costk1!=0 GROUP BY rifcer, u_costk1 ORDER BY rifcer, u_costk1')
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