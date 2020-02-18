import { Routes } from './routes/apiRoutes';
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as path from 'path';
import rfs from 'rotating-file-stream';
// import uuid from 'uuid/v4';
// import * as fs from 'fs';

class App {

    public app: express.Application;
    public myRoute: Routes;
    public router: express.Router;
    public accessLogStream = rfs('access.log', {
        size: "10M",
        interval: "4h",
        // interval: '1d', // rotate daily
        path: path.join(process.cwd(), 'log')
    });
    // fs.createWriteStream('./access.log', { flags: 'a' });

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
        this.myRoute = new Routes(this.router);
        this.myRoute.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        morgan.token('query', function(req) {
            return req.get('query');
        });
        morgan.token('params', function (req) {
            return JSON.stringify(req.params);
        });
        morgan.token('statusMes', function (req, res) {
            return res.statusMessage;
        });
        this.app.use(morgan(
          '[:date[clf]] :statusMes ":method :url" {:query :params} :status :response-time ms :res[content-length] -- :remote-addr ":user-agent"',
          { stream: this.accessLogStream }
          ),
        );
        // this.app.use(morgan('dev'));
        this.app.use('/api/v1', this.router);
    }

}

export default new App().app;