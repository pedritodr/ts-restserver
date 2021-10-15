"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.findAll();
    res.json({
        msg: 'getUsers',
        users
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.findByPk(id);
    if (user) {
        res.json({
            msg: 'getUser',
            user
        });
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existsEmail = yield User_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existsEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            });
        }
        const resp = yield User_1.default.create(body);
        res.json({ resp });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const userDB = yield User_1.default.findByPk(id);
        if (!userDB) {
            return res.status(404).json({
                msg: `No existe un usuario asociado al id ${id}`
            });
        }
        const UserUpdate = yield userDB.update(body, {
            where: {
                id
            }
        });
        res.json({
            UserUpdate
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userDB = yield User_1.default.findByPk(id);
        if (!userDB) {
            return res.status(404).json({
                msg: `No existe un usuario asociado al id ${id}`
            });
        }
        const UserUpdate = yield userDB.update({ status: 0 }, {
            where: {
                id
            }
        });
        res.json({
            UserUpdate
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map