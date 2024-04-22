import express, {Express, Response, Request, Application} from "express"
import userRoute from "./routes/user"
import RouterMiddleware from "./middleware/middleware"

const port:Number = 5004
const app: Application = express()

const start = async (app: Application) =>{
    app.use(RouterMiddleware.routerMiddleware)
    app.use(express.json());

    app.get("/",(req: Request, res: Response)=>{
        try{
            res.status(200).json("REST API SERVER READY")
        } catch (error){
            res.status(500).json(error)
        }
    })
    app.use("/users", userRoute)
    app.listen(port, ()=>{
        console.log(`REST API SERVER READY AT https:localhost:${port}`)
    })
}
start(app)