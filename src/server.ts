import express, { Request, Response } from "express";
import dontenv from "dotenv";
import path from "path";
import cors from "cors";
import routes from "./routes/";

dontenv.config();

const server = express();

server.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.use((request: Request, response: Response) => {
    response.status(404);
    response.json({ error: "Endpoint não encontrado." });
});

server.listen(process.env.PORT);