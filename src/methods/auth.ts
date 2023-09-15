import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

class Auth {
    async register ({body}) {
        await db.users.create({
            data: body
        }),
        {
            body: t.Object({ 
                name: t.String(), 
                email: t.String(), 
                password: t.String({ 
                    minLength: 8 
                }) 
            }) 
        }
        return body
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
            return 'User Not Found!'
        }
        
    }
    tokenGenerator() {
        let token = Math.random().toString(36).substr(2)
        return token
    }
}

export default Auth