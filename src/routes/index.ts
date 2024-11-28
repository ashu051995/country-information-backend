import { Application } from "express";
import countriesRouter from './CountriesRoutes'


export default class Routes {
    constructor(app:Application) {
        app.use('/countries',countriesRouter);
    }
}