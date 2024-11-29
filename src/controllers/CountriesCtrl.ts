import {Request,Response,NextFunction} from 'express'
import axios from 'axios'
import {fakeJson} from '../utils/constant'

import {apiErrorHandler} from '../handlers/errorHandler'
const countiesApiLink = process.env.COUNTRIES_API_LINK||""


export default class CountriesCtrl {
    async getCountryByCode(req:Request,res:Response,next:NextFunction) {
        const codeName:string = req.params.code;
        try {
            const response = await axios.get(countiesApiLink); 
            const data = response?.data?.filter(obj=>obj.cca2===codeName).map(obj=>({name:obj.name,code:obj.cca,region:obj.region}))
            res.json(data);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }
    }
    constructor() {}

    async getAllCountries(req:Request,res:Response,next:NextFunction){
        try {
            const response = await axios.get(countiesApiLink); 
            console.log("response",response)
            const data = response?.data?.map(obj=>({name:obj.name,code:obj.cca,region:obj.region}))||null
            res.json(response.data);
          } catch (error) {
            console.log("error countries",error)
            const errorString = error?.toString() ||""
            apiErrorHandler(error, req, res, errorString);
          }
        
    }

    async getCountryRegionbyRegionCode (req:Request,res:Response,next:NextFunction) {
        const region:string = req.params.region;
        try {
            const response = await axios.get(countiesApiLink); 
            const data = response?.data?.filter(obj=>obj.region===region).map(obj=>({name:obj.name,code:obj.cca,region:obj.region}))
            res.json(data);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }

    }

    async searchCountries (req:Request,res:Response,next:NextFunction) {
        
        const  name =req.query.name;
        const capital = req.query.capital;
        const region = req.query.region;
        const timeZone = req.query.timezone;
        try {
            const response = await axios.get(countiesApiLink); 
            res.json(response);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }

    }
}