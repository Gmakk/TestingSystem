import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { ProjectsApi } from "../api/projects";
import { AnalystApi } from "../api/analyst";
import { AnalystModel } from "../api/models/analyst";
import { z } from "zod";

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

export class AnalystPageViewModel {
    constructor() {
        makeAutoObservable(this);
        this.requestProjects.launch();
    }

    selected: Form | null = null;

    select(item: Form | null) {
        this.selected = item;
    }

    async saveTestCase(id: number | null, item: Omit<TestCaseType, "id">) {
        if (id) {
            const res = await AnalystApi.editTestCase(id, item);
            this.select(null);
        } else {
            const res = await AnalystApi.createTestCase(item);
            this.select(null);
        }
    }

    public saveScenario = new AsyncExecution(async (id: number | null, item: Omit<ScenarioType, "id">) => {
        if (id) {
            const res = await AnalystApi.editScenario(id, item);
            this.select(null);
        } else {
            const res = await AnalystApi.createScenario(item);
            this.select(null);
        }
    })

    public saveTestPlan = new AsyncExecution(async (id: number | null, item: z.infer<typeof AnalystModel.TestPlanCreate>) => {
        if (id) {
            const res = await AnalystApi.editTestPlan(id, item);
            this.select(null);
        } else {
            const res = await AnalystApi.createTestPlan(item);
            this.select(null);
        }
    })

    getProjectByTitle = new AsyncExecution(async (title: string) => {
        return AnalystApi.getProjectById(title);
    })

    getTestPlansByProject = new AsyncExecution(async (title: string) => {
        return AnalystApi.getTestPlansByProject(title);
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

    allTestCases: { id: number, title: string }[] = []
    public getAllTestCases = new AsyncExecution(async () => {
        this.allTestCases = await AnalystApi.getAllTestCases() ?? [];
    })

    allScenarios: { id: number, title: string }[] = []
    public getAllScenarios = new AsyncExecution(async () => {
        this.allScenarios = await AnalystApi.getAllScenarios() ?? [];
    })

    allTestPlans: { id: number, title: string }[] = []
    public getAllTestPlans = new AsyncExecution(async () => {
        this.allTestPlans = await AnalystApi.getAllTestPlans() ?? [];
    })

    projects: string[] = [];
    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })
}