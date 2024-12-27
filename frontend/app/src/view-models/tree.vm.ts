import { makeAutoObservable } from "mobx";
import { AnalystApi } from "../api/endpoints/analyst";
import { AsyncExecution } from "../utils/async-action";

export type TestCaseType = {
    id: number
    title: string
    description: string
    inputData: string
    outputData: string
    projectTitle: string
}

export type TestPlanType = {
    id: number
    title: string
    projectTitle: string
    scenarios: { id: number, title: string }[]
    startDate: string
    endDate: string
    approved: boolean
}

export type ScenarioType = {
    id: number
    title: string
    testCases: number[]
    projectTitle: string
}

export type ProjectType = {
    title: string
    testPlans: { id: number, title: string }[]
}

export type Form = {
    type: "TEST_CASE"
    item: TestCaseType | null
} | {
    type: "TEST_PLAN"
    item: TestPlanType | null
} | {
    type: "SCENARIO"
    item: ScenarioType | null
} | {
    type: "PROJECT"
    item: ProjectType | null
}

export class TreeComponentViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    getProjectByTitle = new AsyncExecution(async (title: string) => {
        return AnalystApi.getProjectById(title);
    })

    getTestPlansByProject = new AsyncExecution(async (title: string) => {
        return AnalystApi.getTestPlansByProject(title);
    })

    getScenariosByTestPlan = new AsyncExecution(async (testPlanId: number) => {
        return AnalystApi.getScenariosByTestPlan(testPlanId)
    })

    getScenariosByProject = new AsyncExecution(async (title: string) => {
        return AnalystApi.getScenariosByProject(title)
    })

    getTestPlanById = new AsyncExecution(async (id: number) => {
        return AnalystApi.getTestPlanById(id)
    })

    getTestCasesByProject = new AsyncExecution(async (title: string) => {
        return AnalystApi.getTestCasesByProject(title)
    })

    getScenarioById = new AsyncExecution(async (id: number) => {
        return AnalystApi.getScenarioById(id)
    })

    getTestCaseById = new AsyncExecution(async (id: number) => {
        return AnalystApi.getTestCaseById(id)
    })

    testCasesByScenario: { id: number, title: string }[] = []
    public getTestCasesByScenario = new AsyncExecution(async (id: number) => {
        const res = await AnalystApi.getTestCasesByScenario(id) ?? [];
        this.testCasesByScenario = res;
        return res;
    })
}