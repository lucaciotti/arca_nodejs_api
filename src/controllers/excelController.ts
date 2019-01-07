import { Request, Response } from 'express';
import ADODB = require('node-adodb');
import { storedConfig } from '../appConfig/storedConfig';

import jQuery from 'json-query';


const connection = ADODB.open(storedConfig.connectionString);

export class ExcelController {


    
}