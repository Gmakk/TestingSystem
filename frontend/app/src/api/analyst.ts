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
            AnalystModel.List,
            undefined)
        if ('error' in result) {
            toast.error('Ошибка получения списка всех тест-кейсов:', result.error);
        } else {
            return result;
        }
    }

    export async function getAllScenarios() {
        const result = await httpRequest.request(
            "GET",
            "/scenario/all",
            undefined,
            undefined,
            AnalystModel.List,
            undefined)
        if ('error' in result) {
            toast.error('Ошибка получения списка всех сценариев:', result.error);
        } else {
            return result;
        }
    }

    export async function getTestCasesByScenario(scenarioId: number) {
        const result = await httpRequest.request(
            "GET",
            `/testCase/byscenario/${scenarioId}`,
            undefined,
            undefined,
            AnalystModel.List,
            undefined)
        if ('error' in result) {
            toast.error(`Ошибка получения списка тест-кейсов по сценарию ${scenarioId}:`, result.error);
        } else {
            return result;
        }
    }

    export async function createTestPlan(data: z.infer<typeof AnalystModel.TestPlanCreate>) {
        try {
            const result = await httpRequest.request(
                "POST",
                "/testplan",
                data,
                undefined,
                AnalystModel.TestPlan,
                AnalystModel.TestPlanCreate
            );
            return result;
        } catch (e) {
            toast.error(`Произошла ошибка при создании тест-плана: ${e}`)
        }
    }

    export async function editTestPlan(id: number, data: z.infer<typeof AnalystModel.TestPlanCreate>) {
        try {
            const res = await httpRequest.request(
                "PATCH",
                `/testplan/${id}`,
                data,
                undefined,
                AnalystModel.TestPlan,
                AnalystModel.TestPlanCreate
            )
            return res;
        } catch (e) {
            toast.error(`Произошла ошибка при редактировании тест-плана: ${e}`)
        }
    }

    export async function getAllTestPlans() {
        const result = await httpRequest.request(
            "GET",
            "/testplan/all",
            undefined,
            undefined,
            AnalystModel.List,
            undefined
        )
        if ('error' in result) {
            toast.error('Ошибка получения списка всех тест-планов:', result.error);
        } else {
            return result;
        }
    }

    export async function getProjectById(title: string) {
        const result = await httpRequest.request(
            "GET",
            `/project/${title}`,
            undefined,
            undefined,
            AnalystModel.Project,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения информации о проекте ${title}`, result.error);
        } else {
            return result;
        }
    }

    export async function getTestPlansByProject(project: string) {
        const result = await httpRequest.request(
            "GET",
            `/testplan/byproject/${project}`,
            undefined,
            undefined,
            AnalystModel.List,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения списка тест-планов в проекте: ${project}`, result.error);
        } else {
            return result;
        }
    }

    export async function getScenariosByProject(project: string) {
        const result = await httpRequest.request(
            "GET",
            `/scenario/byproject/${project}`,
            undefined,
            undefined,
            AnalystModel.List,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения списка сценариев в проекте: ${project}`, result.error);
        } else {
            return result;
        }
    }

    export async function getTestPlanById(id: number) {
        const res = await httpRequest.request(
            "GET",
            `/testplan/${id}`,
            undefined,
            undefined,
            AnalystModel.TestPlan,
            undefined
        )
        if ('error' in res)
            toast.error(`Произошла ошибка при получении тест-плана: ${res.error}`)
        else return res;
    }

    export async function getScenarioById(id: number) {
        const res = await httpRequest.request(
            "GET",
            `/scenario/${id}`,
            undefined,
            undefined,
            AnalystModel.Scenario,
            undefined
        )
        if ('error' in res)
            toast.error(`Произошла ошибка при получении сценария: ${res.error}`)
        else return res;
    }

    export async function getTestCasesByProject(project: string) {
        const result = await httpRequest.request(
            "GET",
            `/testCase/byproject/${project}`,
            undefined,
            undefined,
            AnalystModel.List,
            undefined
        )
        if ('error' in result) {
            toast.error(`Ошибка получения списка тест-кейсов в проекте: ${project}`, result.error);
        } else {
            return result;
        }
    }

    export async function getTestCaseById(id: number) {
        const res = await httpRequest.request(
            "GET",
            `/testCase/${id}`,
            undefined,
            undefined,
            AnalystModel.TestCase,
            undefined
        )
        if ('error' in res)
            toast.error(`Произошла ошибка при получении тест-кейса: ${res.error}`)
        else return res;
    }
}
