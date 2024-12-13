import { z } from "zod";
import { AnalystModel } from "./models/analyst";
import { httpRequest } from "./http";
import { toast } from "sonner";

export namespace AnalystApi {
    export async function createTestCase(data: z.infer<typeof AnalystModel.TestCaseCreate>) {
        try {
            const result = await httpRequest.request(
                "POST",
                "/testCase",
                data,
                undefined,
                AnalystModel.TestCase,
                AnalystModel.TestCaseCreate
            );
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при создании тест-кейса: ${e}`)
        }
    }

    export async function editTestCase(id: number, data: z.infer<typeof AnalystModel.TestCaseCreate>) {
        try {
            const result = await httpRequest.request(
                "PATCH",
                `/testCase/${id}`,
                data,
                undefined,
                AnalystModel.TestCase,
                AnalystModel.TestCaseCreate
            )
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при редактировании тест-кейса: ${e}`)
        }
    }
}
