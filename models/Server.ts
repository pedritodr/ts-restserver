import express,{Application} from "express";

import cors from "cors";
import routerUser from "../routes/user";

import db from "../db/conecction";

class Server {

    private app:Application;
    private port:String;
    private apiPaths={
        users:'/api/users'
    };

    constructor() {
        this.app=express();
        this.port=process.env.PORT||'8000';

        this.middlewares();
        this.dbConecction();
        this.routes();
    }

   async dbConecction(){
    try {
        await db.authenticate();
        console.log("db online");
    } catch (error) {

    }
    }

    middlewares(){
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.users,routerUser);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto '+this.port);
        })
    }
}

export default Server;