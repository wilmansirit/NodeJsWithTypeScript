import { HttpServer } from "../server/httpServer";
import { Controller } from "./controller";
import { Request, Response } from "restify";

export class PingController implements Controller {

    initialize(httpServer: HttpServer): void {
        httpServer.get('/ping', (req: Request, res: Response) => res.send(200, 'Pong'));
    }

}