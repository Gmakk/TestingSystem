import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { ProjectsApi } from "../api/endpoints/projects";
import { toast } from "sonner";
import { TesterApi } from "../api/endpoints/tester";

export type TestCase = {
    id: number
    title: string
    description: string
    inputData: string
    outputData: string
}

export type TestCaseSubmit = {
    passed: boolean
    comment: string
}

export class TesterPageViewModel {
    constructor() {
        makeAutoObservable(this);
        this.requestProjects.launch();
    }

    selected: TestCase | null = null;

    select(item: TestCase | null) {
        this.selected = item;
    }

    submit = new AsyncExecution(async (id: number, scenarioId: number | null, data: TestCaseSubmit | null) => {
        if (!scenarioId || !data) {
            toast.error("Ошбика выполнения тест-кейса (scenarioId is missing)");
        } else {
            await TesterApi.createTestCase(id, { ...data, scenario: scenarioId })
            this.select(null);
        }
    })

    public currentScenarioId: number | null = null;

    projects: string[] = [];
    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })
}