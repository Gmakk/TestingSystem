import { toast } from "sonner";
import { UsersModel } from "../models/users";
import { httpRequest } from "./http";

export namespace UsersApi {
    export async function getTesters() {
        const result = await httpRequest.request(
            "GET",
            "/user/testers",
            undefined,
            undefined,
            UsersModel.UserGeneralList,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения списка тестировщиков`, result.error);
        } else {
            return result;
        }
    }

    export async function getAllUsers() {
        const result = await httpRequest.request(
            "GET",
            "/user/all",
            undefined,
            undefined,
            UsersModel.Users,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения списка пользователей`, result.error);
        } else {
            return result;
        }
    }

    export async function getUserById(id: number) {
        const result = await httpRequest.request(
            "GET",
            `/user/${id}`,
            undefined,
            undefined,
            UsersModel.User,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения пользователя ${id}`, result.error);
        } else {
            return result;
        }
    }
}
