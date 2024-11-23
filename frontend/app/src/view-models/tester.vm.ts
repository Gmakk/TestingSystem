import { makeAutoObservable } from "mobx";
import { AsyncExecution } from "../utils/async-action";
import { ProjectsApi } from "../api/projects";

export type TestCase = {
    id: number
    title: string
    description: string
    inputData: string
    outputData: string
}

export class TesterPageViewModel {
    constructor() {
        makeAutoObservable(this);
        this.requestProjects.launch();
    }

    selected: TestCase | null = {
        "id": 5,
        "title": "Проверка ввода формы: Элементы с пробелами",
        "description": "Ввести по порядку следующие цифры",
        "inputData": " 1 2 3 ",
        "outputData": "3 2 1 "
    };

    select(item: TestCase | null) {
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

    testPlans: string[] = ["Тестирование формы поиска", "Тестирование формы регистрации"];

    scenarios: string[] = ["Неуспешная регистрация - некорректный email", "Успешный поиск", "Неуспешная отправка - пустое поле сообщения"]

    testCases: TestCase[] = [
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