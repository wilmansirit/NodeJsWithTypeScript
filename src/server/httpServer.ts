import {RequestHandler} from 'restify'

export interface HttpServer {
    get(url: string, requestHandler: RequestHandler);

}