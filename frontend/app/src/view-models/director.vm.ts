import { makeAutoObservable } from "mobx";
import { ProjectsApi } from "../api/endpoints/projects";
import { AsyncExecution } from "../utils/async-action";
import { TestPlanType } from "./tree.vm";
import { UsersApi } from "../api/endpoints/users";
import { DirectorApi } from "../api/endpoints/director";

export type Assing = {
    testerId: number,
    scenarioIds: number[]
} 

export type UserInfo = {
    id: number
    fullName: string
}

export class DirectorPageViewModel {
    constructor() {
        makeAutoObservable(this);
        this.requestProjects.launch();
    }

    selected: TestPlanType | null = null;

    select(item: TestPlanType | null) {
        this.selected = item;
    }

    projects: string[] = [];
    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })

    allTesters: UserInfo[] = [];
    public getTesters = new AsyncExecution(async () => {
        this.allTesters =  await UsersApi.getTesters() ?? [];
    })

    approveTestPlan = new AsyncExecution(async (id: number) => {
        await DirectorApi.approveTestPlans({ testPlanIds: [id] })
    })

    assignTester = new AsyncExecution(async (data: Assing) => {
        await DirectorApi.assignTesterOnScenario(data);
    })
}