import {Request,Response,NextFunction} from 'express'
import axios from 'axios'
import * as _ from "lodash"

import {apiErrorHandler} from '../handlers/errorHandler'
const countiesApiLink = process.env.COUNTRIES_API_LINK||""


export default class CountriesCtrl {
    async getCountryByCode(req:Request,res:Response,next:NextFunction) {
        const codeName:string = req.params.code;
        try {
            const response = await axios.get(countiesApiLink); 
            const data = response?.data?.find(obj=>obj.cca2===codeName)
            
            res.json(data);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }
    }
    constructor() {}

    async getAllCountries(req:Request,res:Response,next:NextFunction){
        try {
          const  page =req.query.index||0;
          const limit = req.query.limit||10;
          
            const response= await axios.get(countiesApiLink); 
            const paginatedResponse = _.chunk(response?.data,limit)[page]
            const data = paginatedResponse?.map(obj=>({name:obj.name,code:obj.cca2,region:obj.region,capital:obj.capital,population:obj.population,timezones:obj.timezones,flags:obj.flags,continents:obj.continents}))||null
            res.json(data);
          } catch (error) {
            console.log("error countries",error)
            const errorString = error?.toString() ||""
            apiErrorHandler(error, req, res, errorString);
          }
        
    }

    async getCountryRegionbyRegionCode (req:Request,res:Response,next:NextFunction) {
        const region:string = req.params.region;
        const  page =req.query.index||0;
        const limit = req.query.limit||10;
        try {
          const response= await axios.get(countiesApiLink); 
          const filterResponse = response?.data.filter(obj=>obj.region===region);
          const paginatedResponse = _.chunk(filterResponse,limit)[page]
            const data = paginatedResponse?.map(obj=>({name:obj.name,code:obj.cca2,region:obj.region,capital:obj.capital,population:obj.population,timezones:obj.timezones,flags:obj.flags,continents:obj.continents}))
            res.json(data);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }

    }

    async searchCountries (req:Request,res:Response,next:NextFunction) {
      
      
      const  page =req.query.index||0;
      const limit = req.query.limit||10;
        const  name =req.query.name || "";
        
        try {
          
        
            const response = await axios.get(countiesApiLink);
            
            const filterResponse = response?.data?.filter(obj=>{
              let returnObj:boolean=false
              if(obj?.name?.common?.toLowerCase()?.includes(name)){
                returnObj=true
              }
              // if(obj?.capital[0]?.toLowerCase()?.includes(name)) {
              //   returnObj=true
              // }
              // if(obj?.region?.toLowerCase()?.includes(name)) {
              //   returnObj=true
              // }
              return returnObj?obj:undefined
            }) ;

            const paginatedResponse = _.chunk(filterResponse,limit)[page]
            const data =paginatedResponse?.map(obj=>({name:obj.name,code:obj.cca2,region:obj.region,capital:obj.capital,population:obj.population,timezones:obj.timezones,flags:obj.flags,continents:obj.continents}))
            res.json(data);
          } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Countries failed.');
          }

    }
}