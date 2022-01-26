import { createUserHandler, loginUserHandler } from "../controllers/user.controller";
import { verifyCreateUserBody, verifyLoginUserBody } from "../services/user.service";

const router = require('express').Router();

router.post('/', verifyCreateUserBody, createUserHandler);

router.post('/login', verifyLoginUserBody, loginUserHandler);

module.exports = router;