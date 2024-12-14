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

    export async function createScenario(data: z.infer<typeof AnalystModel.ScenarioCreate>) {
        try {
            const result = await httpRequest.request(
                "POST",
                "/scenario",
                data,
                undefined,
                AnalystModel.Scenario,
                AnalystModel.ScenarioCreate
            );
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при создании сценария: ${e}`)
        }
    }

    export async function editScenario(id: number, data: z.infer<typeof AnalystModel.ScenarioCreate>) {
        try {
            const result = await httpRequest.request(
                "PATCH",
                `/scenario/${id}`,
                data,
                undefined,
                AnalystModel.Scenario,
                AnalystModel.ScenarioCreate
            )
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при редактировании сценария: ${e}`)
        }
    }

    export async function getAllTestCases() {
        const result = await httpRequest.request(
            "GET",
            "/testCase/all",
            undefined,
            undefined,
            AnalystModel.TestCasesList,
            undefined)
        if ('error' in result) {
            toast.error('Ошибка получения списка всех тест-кейсов:', result.error);
        } else {
            return result;
        }
    }

    export async function getTestCasesByScenario(scenarioId: number) {
        const result = await httpRequest.request(
            "GET",
            `testCase/byscenario/${scenarioId}`,
            undefined,
            undefined,
            AnalystModel.TestCasesList,
            undefined)
        if ('error' in result) {
            toast.error(`Ошибка получения списка тест-кейсов по сценарию ${scenarioId}:`, result.error);
        } else {
            return result;
        }
    }
}
