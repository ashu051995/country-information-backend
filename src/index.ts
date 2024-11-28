import  { Application,urlencoded,json } from "express";
// import * as helmet from 'helmet'
import * as winston from 'winston';
import Routes from "./routes";
// import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import {WriteStream} from 'fs';

import { unCoughtErrorHandler } from "./handlers/errorHandler";

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// })

export default class Server {
  constructor(app:Application){
    this.config(app);
    new Routes(app)
  }
  public config(app:Application):void {
    const accessLogStream:WriteStream = fs.createWriteStream(
      path.join(__dirname,'./log/access.log'),
      {flags:'a'}
    );
    // app.use(morgan('combined', { stream: accessLogStream }));
    app.use(urlencoded({extended:true}))
    app.use(json());
    // app.use(helmet());
    app.use(unCoughtErrorHandler);
  }
}
process.on('beforeExit',function(err){
  winston.error(JSON.stringify(err));
  console.error(err)
})