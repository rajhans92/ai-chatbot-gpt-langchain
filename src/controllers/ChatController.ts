import { Request, Response, NextFunction } from "express";
import AiChatHelper from "../helper/AiChatHelper"; 
import { profile } from "console";

class ChatController{

    private aiChatHelperObj:AiChatHelper;

    constructor(){
        this.aiChatHelperObj = new AiChatHelper();
        this.llmChat = this.llmChat.bind(this);
    }

    public async llmChat(req: Request, res: Response, next: NextFunction){
        try{            
            let message: string = req.body.message || "No message";
            let messageHistory: Array<{ role: string, content: string }> = req.body.messageHistory || [];
            const responseObj = await this.aiChatHelperObj.callModel(message,messageHistory).then((data) => {return data});
            
            res.status(200).json({system: responseObj});
        }catch(error: unknown){            
            next(error);
        }
    }

}

export default ChatController;