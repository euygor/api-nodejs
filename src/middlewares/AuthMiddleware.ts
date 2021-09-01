import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

export const get = async (request: Request, response: Response, next: NextFunction) => {
    const { token } = request.query;

    if (token) {
        const auth = jwt.verify(token as string, process.env.JWT_SECRET as string, (error: any, decoded: any) => {
            if (error) {
                return { error: error };
            } else {
                return decoded;
            }
        });
        const { email, password, error } = auth as any;

        if (error) {
            return response.json({ error: error });
        } else {
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            if (user) {
                return next();
            } else {
                response.json({ error: "unauthorized" });
            }
        }

    } else {
        return response.json({ error: "token inválido." });
    }
}

export const post = async (request: Request, response: Response, next: NextFunction) => {
    const { token } = request.body;

    if (token) {
        const auth = jwt.verify(token as string, process.env.JWT_SECRET as string, (error: any, decoded: any) => {
            if (error) {
                return { error: error };
            } else {
                return decoded;
            }
        });
        const { email, password, error } = auth as any;

        if (error) {
            return response.json({ error: error });
        } else {
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            if (user) {
                return next();
            } else {
                response.json({ error: "unauthorized" });
            }
        }

    } else {
        return response.json({ error: "token inválido." });
    }
}