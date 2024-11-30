import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { ProjectsApi } from "../api/projects";

export type TestCaseType = {
    id: number
    title: string
    description: string
    inputData: string
    outputData: string
}

export type TestPlanType = {
    id: number
    title: string
}

export type ScenarioType = {
    id: number
    title: string
}

export type ProjectType = {
    title: string
    testPlans: { id: number, title: string }[]
}

export type Form = {
    type: "TEST_CASE"
    item: TestCaseType
} | {
    type: "TEST_PLAN"
    item: TestPlanType
} | {
    type: "SCENARIO"
    item: ScenarioType
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

    save(id: number) {
        this.testCases = this.testCases.filter(v => v.id !== id);
        this.select(null);
    }

    projects: string[] = [];

    public requestProjects = new AsyncExecution(async () => {
        this.projects = await ProjectsApi.getProjects() ?? [];
    })

    testPlans: {id: number, title: string}[] = [{id: 3, title:"Тестирование формы поиска"}, {id: 4, title:"Тестирование формы регистрации"}];

    scenarios: string[] = ["Неуспешная регистрация - некорректный email", "Успешный поиск", "Неуспешная отправка - пустое поле сообщения"]

    testCases: TestCaseType[] = [
        {
            "id": 5,
            "title": "Проверка ввода формы: Элементы с пробелами",
            "description": "Ввести по порядку следующие цифры",
            "inputData": " 1 2 3 ",
            "outputData": "3 2 1 "
        },
        {
            "id": 6,
            "title": "Проверка ввода формы: Отрицательные числа",
            "description": "Ввести по порядку следующие цифры",
            "inputData": "-1 -2 -3",
            "outputData": "-3 -2 -1"
        },
        {
            "id": 7,
            "title": "Проверка ввода формы: Смешанные числа",
            "description": "Ввести по порядку следующие цифры",
            "inputData": "-1 2 -3 4",
            "outputData": "4 -3 2 -1"
        },
        {
            "id": 3,
            "title": "Invalid Email - Missing Domain",
            "description": "Check for valid email format",
            "inputData": "test@",
            "outputData": "false"
        },
        {
            "id": 4,
            "title": "Valid Email - Multiple .",
            "description": "Check for valid email format",
            "inputData": "test@sub.example.com",
            "outputData": "true"
        },
    ]
}