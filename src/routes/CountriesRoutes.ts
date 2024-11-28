import { Router } from "express";
import CountriesCtrl from "../controllers/CountriesCtrl";

class CountriesRoutes {
    router = Router();
    countriesCtrl = new CountriesCtrl();

    constructor() {
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.route('/').get(this.countriesCtrl.getAllCountries)
    }
}
export default new CountriesRoutes().router