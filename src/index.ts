import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import api from './api'

const db = new PrismaClient()

const app = new Elysia().use(api).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
