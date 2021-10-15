import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers =async (req:Request ,res:Response)=>{
    const users =await User.findAll();
    res.json({
    msg:'getUsers',
    users
    })
}

export const getUser = async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const user=await User.findByPk(id);
    if(user){
        res.json({
            msg:'getUser',
            user
        });
    }else{
        res.status(404).json({
            msg:`No existe un usuario con el id ${id}`
        });
    }

}

export const postUser = async (req:Request ,res:Response)=>{
    const { body } = req;

    try {

        const existsEmail = await User.findOne({
            where:{
                email:body.email
            }
        })
        if(existsEmail){
            return res.status(400).json({
                msg:`Ya existe un usuario con el email ${body.email}`
            });
        }

        const  resp = await User.create(body);
        res.json({resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'hable con el administrador'
        })
    }

}

export const putUser =async (req:Request ,res:Response)=>{

    const {id}=req.params;
    const { body } = req;

    try {

        const userDB = await User.findByPk(id);
        if(!userDB){
            return res.status(404).json({
                msg:`No existe un usuario asociado al id ${id}`
            });
        }

       const UserUpdate= await userDB.update(body, {
           where:{
               id
           }
       });
          res.json({
            UserUpdate
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'hable con el administrador'
        })
    }
}

export const deleteUser =async (req:Request ,res:Response)=>{

    const {id}=req.params;

    try {

        const userDB = await User.findByPk(id);
        if(!userDB){
            return res.status(404).json({
                msg:`No existe un usuario asociado al id ${id}`
            });
        }

       const UserUpdate= await userDB.update({status:0}, {
           where:{
               id
           }
       });
          res.json({
            UserUpdate
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'hable con el administrador'
        })
    }
}
