// import "reflect-metadata";
import { ApiServer } from "./server";
import { env } from "../config";

const server = new ApiServer();

server.start(<number>env.PORT);

