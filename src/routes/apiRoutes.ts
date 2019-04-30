import { Request, Response, Router } from 'express';
import { isEmpty } from "lodash";

import { ArticleController } from '../controllers/articleController';
import { DocsController } from './../controllers/docsController';
import { GiacController } from './../controllers/giacController';
import { MagController } from './../controllers/magController';
import { InventController } from './../controllers/inventController';
import { AnagrafController } from './../controllers/anagrafController';
import { PlUtilsController } from './../controllers/plUtilsController';

export class Routes {

    public articleController: ArticleController = new ArticleController();
    public docsController: DocsController = new DocsController();
    public giacController: GiacController = new GiacController();
    public magController: MagController = new MagController();
    public inventController: InventController = new InventController();
    public anagrafController: AnagrafController = new AnagrafController();
    public plUtilsController: PlUtilsController = new PlUtilsController();

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
        this.router.route('/artubicaz/:codart')
            .get(this.articleController.getAllUbicaz);

        //ROUTE FOR ANAGRAFICHE
        this.router.route('/anagraf/:codicecf')
            .get(this.anagrafController.getAnagraf);
        
        //ROUTE FOR DOCS
        this.router.route('/doctestipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocTesByTipo);
        this.router.route('/doctesID/:id')
            .get(this.docsController.getDocTesByID);
        this.router.route('/docrigtipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocRigByTipo);
        this.router.route('/docrigID/:id')
            .get(this.docsController.getDocRigByID);
        this.router.route('/docrigIDTES/:id')
            .get(this.docsController.getDocRigByIDTes);

        //ROUTE FOR GIAC-ART
        this.router.route('/giacArt/:esercizio/:codart/:codmag?')
            .get(this.giacController.getGiacArt);
        this.router.route('/giacMag/:esercizio/:codmag/:codart?')
            .get(this.giacController.getGiacMag);
        this.router.route('/giacArtLot/:codmag/:codart/:codlot?')
            .get(this.giacController.getGiacArtLot);

        //ROUTE FOR MAGANA
        this.router.route('/magana/:codmag')
            .get(this.magController.getMaga);
        this.router.route('/magana/right/:codmag')
            .get(this.magController.getRightMaga);
        
        //ROUTE FOR PLUTILS!!!
        this.router.route('/plUtils/getLastCollo/:id')
            .get(this.plUtilsController.getLastColloPl);
        this.router.route('/plUtils/getColloByNCollo/:id/:ncollo')
            .get(this.plUtilsController.getColloPlByNCollo);
        this.router.route('/plUtils/getColloByTermId/:id/:termid')
            .get(this.plUtilsController.getColloPlByTermid);
        this.router.route('/plUtils/insertCollo')
            .post(this.plUtilsController.insertColloPl);
        this.router.route('/plUtils/chiudiCollo')
            .put(this.plUtilsController.chiudiColloPl);
        this.router.route('/plUtils/getLastBanc/:id')
            .get(this.plUtilsController.getLastBancPl);
        this.router.route('/plUtils/getBancByNBanc/:id/:nbanc')
            .get(this.plUtilsController.getBancPlByNBanc);
        this.router.route('/plUtils/getBancByReparto/:id/:reparto')
            .get(this.plUtilsController.getBancPlByReparto);
        this.router.route('/plUtils/insertBanc')
            .post(this.plUtilsController.insertBancPl);
        this.router.route('/plUtils/chiudiBanc')
            .put(this.plUtilsController.chiudiBancPl);
        this.router.route('/plUtils/insertPlMod')
            .post(this.plUtilsController.insertPlMod);
        this.router.route('/plUtils/insertOcMod')
            .post(this.plUtilsController.insertPlOcMod);
        this.router.route('/plUtils/insertEtich')
            .post(this.plUtilsController.insertEtichPl);
        this.router.route('/plUtils/updateQtaResPl')
            .put(this.plUtilsController.updateQtaRePl);

        //ROUTE FOR INVENT
        this.router.route('/invent/getCoupon/:coupon')
            .get(this.inventController.getCoupon);
        this.router.route('/invent/getAllCoupons/:esercizio/:codmag/:codart?')
            .get(this.inventController.getAllCoupons);
        this.router.route('/invent/insertCoupon')
            .post(this.inventController.insertCoupon);
        this.router.route('/invent/markWarnCoupon/:coupon')
            .put(this.inventController.markWarnCoupon);
        this.router.route('/invent/destroyCoupon/:coupon')
            .delete(this.inventController.destroyCoupon);


        // MIDDLEWARE After to use for all requests
        this.router.use(function (req, res, next) {
            if(isEmpty(res)) res.json({message: "Empty"})
            // do logging
            console.log('Middleware After');
            next(); // make sure we go to the next routes and don't stop here
        });
    }
}