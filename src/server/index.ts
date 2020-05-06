// import * as restify from 'restify';
import { HttpServer } from "./httpServer";
import { Server, RequestHandler } from "restify";

export class ApiServer implements HttpServer {
    
    private restify: Server;

    get(url: string, requestHandler: import("restify").RequestHandler): void {
        
        this.addRoute('get', url, requestHandler);
    
    }
    post(url: string, requestHandler: import("restify").RequestHandler): void {
        throw new Error("Method not implemented.");
    }
    put(url: string, requestHandler: import("restify").RequestHandler): void {
        throw new Error("Method not implemented.");
    }
    del(url: string, requestHandler: import("restify").RequestHandler): void {
        throw new Error("Method not implemented.");
    }


    private addRoute(method: 'get'| 'post'|'put'|'del',  url: string, requestHandler: RequestHandler): void {

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

    // get(url: string, requestHandler: restify.RequestHandler): void {
    //     throw new Error("Method not implemented.");
    // };
    // post(url: string, requestHandler: restify.RequestHandler): void {
    //     throw new Error("Method not implemented.");
    // };
    // put(url: string, requestHandler: restify.RequestHandler): void {
    //     throw new Error("Method not implemented.");
    // };
    // del(url: string, requestHandler: restify.RequestHandler): void {
    //     throw new Error("Method not implemented.");
    // };

}