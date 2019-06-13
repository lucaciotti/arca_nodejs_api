import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

const connection = ADODB.open(storedConfig.connectionString);

export class genericQueryController {

    getSelectQuery(req: Request, res: Response){
        let selectString: String = req.get('select') ? req.get('select') : '';
        let fromString: String = req.get('from') ? req.get('from') : '';
        let whereString: String = req.get('where') ? req.get('where') : '';
        let groupbyString: String = req.get('groupby') ? req.get('groupby') : '';
        let orderbyString: String = req.get('orderby') ? req.get('orderby') : '';

        if (!selectString || !fromString) {
            res.status(503).json({ errMessage: 'SELECT | FROM parameters are required!' });
        } else {
            let extraQuery: String = '';
            if (whereString) {
                extraQuery = ' WHERE ' + whereString;
            }
            if (groupbyString){
                extraQuery = ' GROUP BY ' + groupbyString;
            }
            if (orderbyString) {
                extraQuery = ' ORDER BY ' + orderbyString;
            }

            let query: string = 'Select ' + selectString + ' FROM ' + fromString + extraQuery;
            console.log(query);
            connection
                .query(query)
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
}