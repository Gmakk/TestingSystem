import { z } from "zod";
import { httpRequest } from "./http";
import { toast } from "sonner";
import { DirectorModel } from "../models/director";

export namespace DirectorApi {
    export async function assignTesterOnScenario(data: z.infer<typeof DirectorModel.AssignTester>) {
        try {
            const result = await httpRequest.request(
                "POST",
                "/user/all",
                data,
                undefined,
                undefined,
                DirectorModel.AssignTester
            )
            return result;
        } catch (e) {
            toast.error(`Ошибка назначения тестировщика: ${e}`);
        }
    }

    export async function approveTestPlans(data: z.infer<typeof DirectorModel.ApproveTestPlans>) {
        try {
            const result = await httpRequest.request(
                "POST",
                "/testplan/approve",
                data,
                undefined,
                undefined,
                DirectorModel.ApproveTestPlans
            )
            return result;
        } catch (e) {
            toast.error(`Ошибка утверждения тест-плана: ${e}`);
        }
    }
}