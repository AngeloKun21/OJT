import {Request, Response, NextFunction} from "express"
import dotevn from 'dotenv'

dotevn.config()

export default class RouterMiddleware{
    static routerMiddleware(req: Request, res: Response, next: NextFunction){
        try{
            const type = req.method
            console.log(`[${type}] : ${req.url}`);

            const bearerToken: string[] = (req.headers.authorization || "").split(" ")
            console.log('bearerToken :>>', bearerToken);
            if(bearerToken.length && bearerToken[0] == "Bearer"){
                if(bearerToken[1] === process.env.ACCESS_TOKEN){
                    console.log(`/authorized`)
                }
            }else{
                return res.status(401).json({message: `invalid token`})
            }
            return next()
        } catch(error){
            res.status(500).json(error)
        }
    }
}