import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { ProjectsApi } from "../api/projects";
import { AnalystApi } from "../api/analyst";

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
    item: ProjectType
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

    testCasesByScenario: { id: number, title: string } [] = []
    public getTestCasesByScenario = new AsyncExecution(async (id: number) => {
        this.allTestCases = await AnalystApi.getTestCasesByScenario(id) ?? [];
    })

    allTestCases: { id: number, title: string } [] = []
    public getAllTestCases = new AsyncExecution(async () => {
        this.allTestCases = await AnalystApi.getAllTestCases() ?? [];
    })

    projects: string[] = [];
    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })

    testPlans: { id: number, title: string }[] = [{ id: 3, title: "Тестирование формы поиска" }, { id: 4, title: "Тестирование формы регистрации" }];

    scenarios: string[] = ["Неуспешная регистрация - некорректный email", "Успешный поиск", "Неуспешная отправка - пустое поле сообщения"]

    testCases: TestCaseType[] = [
        {
            "id": 5,
            "title": "Проверка ввода формы: Элементы с пробелами",
            "description": "Ввести по порядку следующие цифры",
            "inputData": " 1 2 3 ",
            "outputData": "3 2 1 ",
            "projectTitle": "project1"
        },
        {
            "id": 6,
            "title": "Проверка ввода формы: Отрицательные числа",
            "description": "Ввести по порядку следующие цифры",
            "inputData": "-1 -2 -3",
            "outputData": "-3 -2 -1",
            "projectTitle": "project1"
        },
        {
            "id": 7,
            "title": "Проверка ввода формы: Смешанные числа",
            "description": "Ввести по порядку следующие цифры",
            "inputData": "-1 2 -3 4",
            "outputData": "4 -3 2 -1",
            "projectTitle": "project1"
        },
        {
            "id": 3,
            "title": "Invalid Email - Missing Domain",
            "description": "Check for valid email format",
            "inputData": "test@",
            "outputData": "false",
            "projectTitle": "project1"
        },
        {
            "id": 4,
            "title": "Valid Email - Multiple .",
            "description": "Check for valid email format",
            "inputData": "test@sub.example.com",
            "outputData": "true",
            "projectTitle": "project1"
        },
    ]
}