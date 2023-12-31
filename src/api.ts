import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import Auth from './methods/auth'
import HttpResponse from './traits/httpResponse'
import cors from "@elysiajs/cors";

const db = new PrismaClient()
const auth = new Auth()
const response = new HttpResponse()

const register = new Elysia().post('/register', async ({ body }) => {
    let schema = {
        body: t.Object({ 
            name: t.String(), 
            email: t.String(), 
            password: t.String({
                minLength: 8,
            }) 
        }) 
    }
    let res = await auth.register({body}, schema)
    if(res.success == false) {
        return response.error(null, res.message)
    }
    return response.success(res.data, res.message);   
})

const login = new Elysia().post('/login', async ({body}) => {
    let res = await auth.login({body})
    if(res.success == false) {
        return response.error(null, res.message)
    }
    return response.success(res.data, res.message)
})

const test = new Elysia().get('/test', () => {
    return '<h1>Hello World</h1>'
})

const api = new Elysia().group('/api/v1', app => app.use(register).use(login).use(test).use(cors()))

export default api
