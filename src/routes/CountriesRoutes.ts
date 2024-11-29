import { Router } from "express";
import CountriesCtrl from "../controllers/CountriesCtrl";

// Backend API Endpoints: GET /countries: Fetch a list of all countries (from REST Countries API). 
// GET /countries/:code: Fetch detailed information about a single country by its country code (e.g., “US” for the United States). 
// GET /countries/region/:region: Filter countries by region (e.g., Asia, Europe). 
// GET /countries/search: Search for a country by name. Example: “/countries/search?name=India&region=Asia” ▪ Name: Search for countries by name (e.g., ?name=India). 
// ▪ Capital: Search for countries by capital city (e.g., ?capital=Tokyo). 
// ▪ Region: Search for countries by region (e.g., ?region=Asia). 
// ▪ Timezone: Search for countries by timezone (e.g., ?timezone=UTC+05:30). 
class CountriesRoutes {
    router = Router();
    countriesCtrl = new CountriesCtrl();

    constructor() {
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.route('/').get(this.countriesCtrl.getAllCountries)
        this.router.route('/:code').get(this.countriesCtrl.getCountryByCode)
        this.router.route('/region/:region').get(this.countriesCtrl.getCountryRegionbyRegionCode)
        this.router.route('/search').get(this.countriesCtrl.searchCountries)
        
    }
}
export default new CountriesRoutes().router