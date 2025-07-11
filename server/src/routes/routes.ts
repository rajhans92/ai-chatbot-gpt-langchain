import { Router } from "express";
import ChatController from "../controllers/ChatController";

class Routers{

    public readonly router: Router;
    private readonly chatController: ChatController;
    constructor(){
        this.router = Router();
        this.chatController = new ChatController();
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post("/chat",this.chatController.llmChat);
    }
}

export default new Routers().router;