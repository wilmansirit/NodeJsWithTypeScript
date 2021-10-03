import * as restify from 'restify';
import { HttpServer } from "./httpServer";
import { Server, RequestHandler } from "restify";
import { CONTROLLERS } from '../controllers';

export class ApiServer implements HttpServer {
    
    private restify: Server;

    get(url: string, requestHandler: RequestHandler): void {        
        this.addRoute('get', url, requestHandler);
    
    }
    post(url: string, requestHandler: RequestHandler): void {        
        this.addRoute('post', url, requestHandler);
        
    }
    put(url: string, requestHandler: RequestHandler): void {        
        this.addRoute('put', url, requestHandler);
        
    }
    del(url: string, requestHandler: RequestHandler): void {        
        this.addRoute('del', url, requestHandler);
        
    }


    private addRoute(method: 'get'|'post'|'put'|'del',  url: string, requestHandler: RequestHandler): void {

        this.restify[method](url, async (req, res, next) => {

            try {
                await requestHandler(req, res, next);

            } catch (err) {
                console.log( err );
                res.send(500, err);
            };
        });

        console.log(`Added route ${method.toUpperCase()}: ${url}`);        
    }

    start(port: number): void {

        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());

        // TODO  Controller init
        // CONTROLLERS.forEach(controller => controller.ini);
        CONTROLLERS.forEach(controller => controller.initialize(this))

        this.restify.listen(port, ()=> console.log(`Server is up and running on port ${port}`));

    }
}