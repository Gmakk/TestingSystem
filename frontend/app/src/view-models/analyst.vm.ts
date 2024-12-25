import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { AnalystApi } from "../api/analyst";
import { AnalystModel } from "../api/models/analyst";
import { z } from "zod";
import { Form, ScenarioType, TestCaseType } from "./tree.vm";
import { ProjectsApi } from "../api/projects";

export class AnalystPageViewModel {
    constructor() {
        makeAutoObservable(this);
        this.requestProjects.launch();
    }

    selected: Form | null = null;

    select(item: Form | null) {
        this.selected = item;
    }

    projects: string[] = [];
    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })

    testCasesByScenario: { id: number, title: string }[] = []
    public getTestCasesByScenario = new AsyncExecution(async (id: number) => {
        const res = await AnalystApi.getTestCasesByScenario(id) ?? [];
        console.log("res123", res)
        this.testCasesByScenario = res;
        console.log("testcasebysc", this.testCasesByScenario)
        return res;
    })

    async saveTestCase(id: number | null, item: Omit<TestCaseType, "id">) {
        if (id) {
            await AnalystApi.editTestCase(id, item);
            this.select(null);
        } else {
            await AnalystApi.createTestCase(item);
            this.select(null);
        }
    }

    public saveScenario = new AsyncExecution(async (id: number | null, item: Omit<ScenarioType, "id">) => {
        if (id) {
            await AnalystApi.editScenario(id, item);
            this.select(null);
        } else {
            await AnalystApi.createScenario(item);
            this.select(null);
        }
    })

    public saveTestPlan = new AsyncExecution(async (id: number | null, item: z.infer<typeof AnalystModel.TestPlanCreate>) => {
        if (id) {
            await AnalystApi.editTestPlan(id, item);
            this.select(null);
        } else {
            await AnalystApi.createTestPlan(item);
            this.select(null);
        }
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

}