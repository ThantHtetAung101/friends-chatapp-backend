import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import Auth from './methods/auth'

const db = new PrismaClient()
const auth = new Auth()

const register = new Elysia().post('/register', async ({ body }) => 
    await auth.register({body})
)

const login = new Elysia().post('/login', async ({body}) => {
    let res = await auth.login({body})
    return res
})

const test = new Elysia().get('/test', () => {
    return '<h1>Hello World</h1>'
})

const api = new Elysia().group('/api/v1', app => app.use(register).use(login).use(test))

export default api
