import { z } from "zod";
import { httpRequest } from "./http";
import { TesterModel } from "../models/tester";
import { toast } from "sonner";

export namespace TesterApi {
    export async function createTestCase(id: number, data: z.infer<typeof TesterModel.TestCaseSubmit>) {
        try {
            const result = await httpRequest.request(
                "POST",
                `/testCase/${id}/submit`,
                data,
                undefined,
                undefined,
                TesterModel.TestCaseSubmit
            );
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при выполнении тест-кейса: ${e}`)
        }
    }
}
