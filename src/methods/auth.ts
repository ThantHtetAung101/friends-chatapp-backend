import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

class Auth {
    async register ({body}, schema) {
        let checkUser = await db.users.findFirst({
            where: {
                email: body.email,
            }
        })
        if(checkUser) {
            return {
                success: false,
                message: 'This email is already registered!'
            };
        }
        let user = await db.users.create({
            data: body
        })
       
        return {
            success: true,
            data: user,
            message: 'Register successful'
        }
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
                return {
                    success: true,
                    data: personalToken,
                    message: 'Login successful'
                }
            } else {
                return {
                    success: false,
                    message: 'Username & Password is wrong!'
                }
            }
        } else {
            return {
                success: false,
                message: 'User Not Found!'
            }
        }
        
    }
    tokenGenerator() {
        let token = Math.random().toString(36).substr(2)
        return token
    }
}

export default Auth