import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { matchedData, validationResult } from "express-validator";

dotenv.config();

export const signup = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.json({ error: errors.mapped() });
        return;
    }

    const data = matchedData(request);

    if (data.name && data.email && data.password) {
        const emailExists = await User.findOne({
            where: {
                email: data.email
            }
        });

        if (!emailExists) {
            const user = User.build();
            user.name = data.name;
            user.email = data.email;
            user.password = await bcrypt.hash(data.password, 10);
            await user.save();

            const token = jwt.sign({ id: user.id, email: user.email, password: user.password }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRESIN });

            return response.json({ user: user, token: token });
        }

        return response.json({ error: "e-mail já cadastrado." });
    } else {
        return response.json({ error: "preencha todos os campos." });
    }
}

export const signin = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.json({ error: errors.mapped() });
        return;
    }

    const data = matchedData(request);

    const user = await User.findOne({
        where: {
            email: data.email
        }
    });

    if (user && data.password) {
        const compare = await bcrypt.compare(data.password, user.password);

        if (compare) {

            const token = jwt.sign({ id: user.id, email: user.email, password: user.password }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRESIN });

            return response.json({ user: user, token: token });
        } else {
            return response.json({ error: "e-mail e/ou senha incorretos." });
        }

    } else {
        return response.json({ error: "e-mail e/ou senha incorretos." });
    }
}

export const users = async (request: Request, response: Response) => {
    const users = await User.findAll();

    return response.json({ users: users });
}

export const user = async (request: Request, response: Response) => {
    const { idUser } = request.params;

    const user = await User.findByPk(idUser);

    if (user) {
        return response.json({ user: user });
    } else {
        return response.json({ error: "user não encontrado." });
    }
}

export const update = async (request: Request, response: Response) => {
    const { idUser } = request.params;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.json({ error: errors.mapped() });
        return;
    }

    const data = matchedData(request);

    const user = await User.findByPk(idUser);

    if (user) {

        if (data.name) {
            user.name = data.name;
        }

        if (data.email) {

            const emailExists = await User.findOne({
                where: {
                    email: data.email
                }
            });

            if (!emailExists) {
                user.email = data.email;
            } else {
                return response.json({ error: "e-mail já cadastrado." });
            }
        }

        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }

        await user.save();
        return response.json({ user: user });
    } else {
        return response.json({ error: "user não encontrado." });
    }
}

export const deletar = async (request: Request, response: Response) => {
    const { idUser } = request.params;

    const user = await User.findByPk(idUser);

    if (user) {
        await user.destroy();
        return response.json({ success: "user deletado com sucesso." });
    } else {
        return response.json({ error: "user não encontrado." });
    }
}