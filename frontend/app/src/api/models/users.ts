import { z } from "zod";

export namespace UsersModel {
    export const UserGeneral = z.object({
        id: z.number(),
        fullName: z.string(),
    })

    export const UserGeneralList = z.array(UserGeneral)

    export const User = z.object({
        id: z.number(),
        fullName: z.string(),
        login: z.string(),
        role: z.string(),
        isActive: z.boolean()
    })

    export const Users = z.array(User)

    export const Login = z.object({
        login: z.string(),
        password: z.string()
    })
}