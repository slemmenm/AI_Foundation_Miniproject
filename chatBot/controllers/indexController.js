import { runSample } from "../utils/chatBot-helper.js";
import {newUUID} from "../utils/chatBot-helper.js";


let sessionId =  newUUID();
let chat = [];
export class IndexController {

    static sendError(res, error) {
        console.log(error);
        res.status(error.code || 500);
        if (error.error instanceof Object) {
            res.json(error.error);
        } else {
            res.end(error.stack || error.message);
        }
    }

    static async showChatBot(req, res) {
        try {
            console.log(sessionId);
            console.log(chat.length);
            if(!chat.length) {
                let result = await runSample(sessionId, "hello");
                chat.push(
                    {
                        answer: result.fulfillmentText
                    }
                );
            }
            res.render("index", {title: "chatBot-Miniproject-by-Samuel-Lemmenmeier", chat});
        } catch (err) {
            IndexController.sendError(res, err);
        }

    }

    static async calculateAnswer(req, res) {
        try {
            const question = req.body.question;
            if (question) {
                console.log("START OF RESULT");
                console.log(typeof question)

               let result = await runSample(sessionId, question);

                console.log(result);
                console.log("END OF RESULT");
                chat.push(
                    {
                        question: question,
                        answer: result.fulfillmentText
                    }
                );
            }
            // reset question
            res.redirect("/");

        } catch (err) {
            IndexController.sendError(res, err);
        }
    }

    static newSessionId(req, res) {
        try {
            console.log(sessionId);
            sessionId = newUUID();
            chat = [];
            console.log(sessionId);
            res.redirect("/");
        } catch (err) {
            IndexController.sendError(res, err);
        }
    }
}
