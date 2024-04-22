import express, {Express, Response, Request} from "express"
import Users from "../models/users.model"
import {Op} from "sequelize"

const userRoute: Express = express()

userRoute.get("/", async(req: Request, res: Response)=>{ //GET ALL
    try{
        const response = await Users.findAll()
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.get("/search", async(req: Request, res: Response)=>{ //GET BY SEARCH
    try{
        const {query} = req
        let condition = {
            [Op.or] :{
                firstName : {[Op.iLike] : `%${query.searchvalue}`},
                middleName : {[Op.iLike] : `%${query.searchvalue}`},
                lastName : {[Op.iLike] : `%${query.searchvalue}`},
                email : {[Op.iLike] : `%${query.searchvalue}`},
            }
        }
        const response = await Users.findAll({where: condition})
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.get("/:id", async(req: Request, res: Response)=>{ //GET BY SEARCH
    try{
        const {params} = req
        const response = await Users.findByPk(params.id)
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.post("/", async(req: Request, res: Response)=>{
    try{
        const { body } = req
        const response = await Users.create(body)
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.put("/:id", async(req: Request, res: Response)=>{
    try{
        const {body, params} = req
        const response = await Users.update(body, {where : params})
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.delete("/:id", async(req: Request, res: Response)=>{
    try{
        const {params} = req
        const response = await Users.destroy({where : params})
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})
userRoute.patch("/:id", async(req: Request, res: Response)=>{
    try{
        const {body, params} = req
        const response = await Users.update(body, {where: params})
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
})

export default userRoute