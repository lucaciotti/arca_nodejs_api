import { Request, Response, Router } from 'express';
import { isEmpty } from "lodash";

import { ArticleController } from '../controllers/articleController';
import { DocsController } from './../controllers/docsController';
import { GiacController } from './../controllers/giacController';

export class Routes {

    public articleController: ArticleController = new ArticleController();
    public docsController: DocsController = new DocsController();
    public giacController: GiacController = new GiacController();

    public router: Router;

    constructor(router: Router){
        this.router = router;
    }

    public routes(app): void {

        // MIDDLEWARE Bfore to use for all requests
        this.router.use(function (req, res, next) {
            res.set('Content-Type', 'application/json');
            // do logging
            console.log('Middleware Before to be implemented.');
            next(); // make sure we go to the next routes and don't stop here
        });

        //ROUTE FOR ARTICLES
        this.router.route('/article/:codart')
            .get(this.articleController.getArticle);
        this.router.route('/artstartwith/:codart')
            .get(this.articleController.getArticlesStartWith);
        this.router.route('/artbygroup/:group')
            .get(this.articleController.getArticlesByGroup);
        this.router.route('/artbarcode/:barcode')
            .get(this.articleController.getArtByBarcode);
        this.router.route('/artbarcode2/:barcode')
            .get(this.articleController.getArtByBarcodeAlt);

        //ROUTE FOR DOCS
        this.router.route('/doctestipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocTesByTipo);
        this.router.route('/doctesID/:id')
            .get(this.docsController.getDocTesByID);
        this.router.route('/docrigtipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocRigByTipo);
        this.router.route('/docrigIDTES/:id')
            .get(this.docsController.getDocRigByID);
        this.router.route('/docrigID/:id')
            .get(this.docsController.getDocRigByIDTes);

        //ROUTE FOR GIAC-ART
        this.router.route('/giacArt/:esercizio/:codart/:codmag?')
            .get(this.giacController.getGiacArt);
        this.router.route('/giacMag/:esercizio/:codmag/:codart?')
            .get(this.giacController.getGiacMag);
        this.router.route('/giacArtLot/:codmag/:codart/:codlot?')
            .get(this.giacController.getGiacArtLot);

        // MIDDLEWARE After to use for all requests
        this.router.use(function (req, res, next) {
            if(isEmpty(res)) res.json({message: "Empty"})
            // do logging
            console.log('Middleware After');
            next(); // make sure we go to the next routes and don't stop here
        });
    }
}