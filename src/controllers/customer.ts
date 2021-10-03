import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "restify";
import { customerService } from "../services/customer";

export class CustomerController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get("/customer", this.list.bind(this));
    httpServer.get("/customer/:id", this.getById.bind(this));
    httpServer.post("/customer", this.create.bind(this));
    httpServer.put("/customer/:id", this.update.bind(this));
    httpServer.del("/customer/:id", this.remove.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await customerService.list());
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const customer = await customerService.getById(req.params.id);
    res.send(customer ? 200 : 404, customer);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await customerService.create(req.body));
  }

  private async update(req: Request, res: Response): Promise<void> {
    const customer = await customerService.update(req.body);
    res.send(customer ? 200 : 400, customer);
  }

  private async remove(req: Request, res: Response): Promise<void> {
    res.send(await customerService.delete(req.params.id));
  }
}
