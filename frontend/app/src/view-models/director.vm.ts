import { makeAutoObservable } from "mobx";
import { ProjectsApi } from "../api/endpoints/projects";
import { AsyncExecution } from "../utils/async-action";
import { TestPlanType } from "./tree.vm";

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
}