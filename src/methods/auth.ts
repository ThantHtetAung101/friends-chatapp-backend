import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import HttpResponse from "../traits/httpResponse";

const db = new PrismaClient()
const response = new HttpResponse()

class Auth {
    async register ({body}, schema) {
        let checkUser = await db.users.findFirst({
            where: {
                email: body.email,
            }
        })
        if(checkUser) {
            return null;
        }
        let user = await db.users.create({
            data: body
        })
       
        return user
    }

    async login ({body}) {
        let user = await db.users.findFirst({
            where: {
                email: body.email,
            }
        })
        if(user) {
            if(user.password == body.password){
                let fullToken = this.tokenGenerator() + this.tokenGenerator() + this.tokenGenerator() + this.tokenGenerator()
                let personalToken = await db.personalTokens.create({
                    data: {
                        userId: user?.id,
                        token: fullToken,
                    }
                })
                return personalToken
            }
        } else {
            return null
        }
        
    }
    tokenGenerator() {
        let token = Math.random().toString(36).substr(2)
        return token
    }
}

export default Auth