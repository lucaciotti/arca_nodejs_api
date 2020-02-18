import { Request, Response, Router } from 'express';
import { isEmpty } from "lodash";

import { ArticleController } from '../controllers/articleController';
import { DocsController } from './../controllers/docsController';
import { GiacController } from './../controllers/giacController';
import { MagController } from './../controllers/magController';
import { InventController } from './../controllers/inventController';
import { AnagrafController } from './../controllers/anagrafController';
import { PlUtilsController } from './../controllers/plUtilsController';
import { genericQueryController } from './../controllers/genericQueryController';

export class Routes {

    public articleController: ArticleController = new ArticleController();
    public docsController: DocsController = new DocsController();
    public giacController: GiacController = new GiacController();
    public magController: MagController = new MagController();
    public inventController: InventController = new InventController();
    public anagrafController: AnagrafController = new AnagrafController();
    public plUtilsController: PlUtilsController = new PlUtilsController();
    public genericQueryController: genericQueryController = new genericQueryController();

    public router: Router;

    constructor(router: Router){
        this.router = router;
    }

    public routes(app): void {

        // MIDDLEWARE Bfore to use for all requests
        this.router.use(function (req, res, next) {
            res.set('Content-Type', 'application/json');
            // do logging
            // console.log('Middleware Before to be implemented.');
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
        this.router.route('/artLot/:codart/:codlot?')
            .get(this.articleController.getLotti);
        this.router.route('/artImballi/:codart?')
            .get(this.articleController.getImballi);
        this.router.route('/artPallet/:codart?')
            .get(this.articleController.getPallet);

        //ROUTE FOR ANAGRAFICHE
        this.router.route('/anagraf/:codicecf')
            .get(this.anagrafController.getAnagraf);
        this.router.route('/anagraf/getSetInd/:codSettore?')
            .get(this.anagrafController.getSetInd);
        
        //ROUTE FOR DOCS
        this.router.route('/doctestipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocTesByTipo);
        this.router.route('/doctesID/:id')
            .get(this.docsController.getDocTesByID);
        this.router.route('/doctesRifID/:id')
            .get(this.docsController.getDocTesByRifIDTes);
        this.router.route('/docrigtipo/:esercizio/:tipodoc/:numerodoc?')
            .get(this.docsController.getDocRigByTipo);
        this.router.route('/docrigID/:id')
            .get(this.docsController.getDocRigByID);
        this.router.route('/docrigIDTES/:id')
            .get(this.docsController.getDocRigByIDTes);
        this.router.route('/docrigRifID/:id')
            .get(this.docsController.getDocRigByRifID);

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
        this.router.route('/reparti/:codrep?')
            .get(this.magController.getReparti);
        
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
        this.router.route('/plUtils/getPlMod/:id/:ncollo/:nbanc?')
            .get(this.plUtilsController.getPlMod);
        this.router.route('/plUtils/getPBRows/:id/:ncollo/:nbanc?')
            .get(this.plUtilsController.getPBRows);
        this.router.route('/plUtils/updBancToColloInPB')
            .put(this.plUtilsController.updBancToColloInPB);
        this.router.route('/plUtils/updBancToColloInPlMod')
            .put(this.plUtilsController.updBancToColloInPlMod);
        this.router.route('/plUtils/getListColliPB/:id')
            .get(this.plUtilsController.getListColliPB);
        this.router.route('/plUtils/getListBancPB/:id')
            .get(this.plUtilsController.getListBancPB);

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

        //ROUTE FOR GENERIC QUERY
        // this.router.route('/genericQuery')
        //     .post(this.genericQueryController.getSelectQuery)
        this.router
          .route("/selectQuery")
          .post(this.genericQueryController.getQuery);
        this.router
          .route("/insertQuery")
          .post(this.genericQueryController.getQuery);
        this.router
          .route("/updateQuery")
          .put(this.genericQueryController.getQuery);
        this.router
          .route("/deleteQuery")
          .delete(this.genericQueryController.getQuery);


        // MIDDLEWARE After to use for all requests
        this.router.use(function (req, res, next) {
            if(isEmpty(res)) res.json({message: "Empty"})
            // do logging
            // console.log('Middleware After');
            next(); // make sure we go to the next routes and don't stop here
        });
    }
}