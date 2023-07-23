import User from '../models/userModel.js';
import { comparePasswords } from '../utils/myLibraries.js';
import Response from '../utils/response.js';
import userSchema from '../validator/userValidator.js';
const SECRET_KEY = 'Zj0n2X]hOa~,{>TLMZ4aL?[c5=&j&#U6qM5~Y#w|M,1O^H_lKC[.8[3CR7&Z';
import Jwt from 'jsonwebtoken';

export const get = async (req, res, next) => {
    try {
        const [result] = await User.getAll();
        const msg = "success"
        Response.successResp(res, msg, result);
    } catch (error) {
        next(error)
    }
}

export const find = async (req, res, next) => {
    try {
        const [result] = await User.getById(req.params.id);

        if (result.length < 1) {
            return Response.errorResp(res, "Data not found", 404);
        }

        const msg = "success";
        Response.successResp(res, msg, result);
    } catch (error) {
        next(error);
    }
};


export const create = async (req, res, next) => {
    try {
        const value = await userSchema.validateAsync(req.body);
        const [response, field] = await User.store(value);

        Response.successResp(res, "success created user", response, 201);
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const [result] = await User.getById(req.params.id);
        if (result.length < 1) {
            return Response.errorResp(res, "Data not found", 404);
        }

        const value = await userSchema.validateAsync(req.body);
        value.id = req.params.id

        const [response, field] = await User.update(value);
        const msg = "success updated user"

        Response.successResp(res, msg, response, 201);
    } catch (error) {
        next(error);
    }
}

export const destroy = async (req, res, next) => {
    try {
        const [result] = await User.getById(req.params.id);

        if (result.length < 1) {
            return Response.errorResp(res, "Data not found", 404);
        }

        const msg = "success delete user";
        const [response, field] = await User.delete(req.params.id);

        Response.successResp(res, msg, response, 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const [result] = await User.auth(username);

        if (result.length < 1) {
            return Response.errorResp(res, "Authentication failed. User not found.", 404);
        }

        const isPasswordMatch = await comparePasswords(password, result[0].password);

        if (!isPasswordMatch) {
            return Response.errorResp(res, "Authentication failed. Incorrect password.", 404);
        }

        const token = Jwt.sign({ userId: result[0].id,email:result[0].email,name:result[0].name }, SECRET_KEY, { expiresIn: '1h' });
        const msg = "Authentication successful."

        Response.successResp(res, msg, token, 201);
    } catch (error) {
        next(error);
    }
}