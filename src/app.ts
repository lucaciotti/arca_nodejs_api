import { Routes } from './routes/apiRoutes';
import * as express from "express";
import * as morgan from "morgan";
import { configure, getLogger, connectLogger, Logger } from "log4js";
import * as bodyParser from "body-parser";
import * as path from 'path';
import rfs from 'rotating-file-stream';
// import * as fs from 'fs';

class App {

    public app: express.Application;
    public myRoute: Routes;
    public router: express.Router;
    public logger: Logger;
    // public accessLogStream = rfs('access.log', {
    //     size: "10M",
    //     interval: "4h",
    //     // interval: '1d', // rotate daily
    //     path: path.join(process.cwd(), 'log')
    // });
    // fs.createWriteStream('./access.log', { flags: 'a' });

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
        this.myRoute = new Routes(this.router);
        this.myRoute.routes(this.app);
        configure({
          appenders: {
            console: { type: "console" },
            file: {
              type: "file",
              filename: path.join(process.cwd(), "log", "file.log"),
              maxLogSize: 10 * 1024 * 1024, // = 10Mb
              backups: 5, // keep five backup files
              compress: true // compress the backups
            },
            dateFile: {
              type: "dateFile",
              filename: path.join(process.cwd(), "log", "file.log"),
              pattern: "yyyy-MM-dd-hh",
              compress: true,
              keepFileExt: true,
              daysToKeep: 5
            }
          },
          categories: {
            everything: { appenders: ["dateFile"], level: "debug" },
            default: { appenders: ["console"], level: "info" }
          }
        });
        this.logger = getLogger("everything");
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(
          connectLogger(this.logger, {
            level: "auto",
            format: (req, res, format) =>
              format(
                `:remote-addr - ${
                  req.id
                } - ":method :url" :status :response-time ms :content-length ${JSON.stringify(
                  req.body
                )} ":referrer" ":user-agent"`
              )
          })
        );
        // this.app.use(morgan(
        //     ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"',
        //     { stream: this.accessLogStream }
        //     ));
        // this.app.use(morgan('dev'));
        this.app.use('/api/v1', this.router);
    }

}

export default new App().app;