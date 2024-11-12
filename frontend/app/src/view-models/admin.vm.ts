import { makeAutoObservable } from "mobx";
import { UserTypes } from "../shared/const";

export type Role = {
    id: string
    name: string
} | null

export type AdminForm = {
    name: string
    role: Role
    deletedRole: boolean
    inactivatedUser: boolean
    parent: AdminViewModel
}

type Filters = {
    [key in keyof typeof UserTypes]: boolean;
};

export class AdminViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    selected: AdminForm | null = null;

    search: string = "";
    filters: Filters = {
        admin: true,
        tester: true,
        director: true,
        analyst: true,
        inactive: true,
        withoutRole: true,
    }

    public changeFilters = (userType: keyof typeof UserTypes) => {
        this.filters = {
            ...this.filters,
            [userType]: !this.filters[userType],
        };
    }

    public roleOptions = this.list()
        .filter((user) => user.role !== null)
        .map((user) => ({
            label: user.role!.name,
            value: user.role!.id,
        }));

    public select(form: AdminForm | null) {
        console.log("select", form)
        this.selected = form;
    }

    public save() {

    }

    public getFilteredList(): AdminForm[] {
        const filteredList = this.list().filter((adminForm) => {
            // Фильтр поиска
            if (
                this.search.trim() !== '' &&
                !adminForm.name.toLowerCase().includes(this.search.toLowerCase())
            ) {
                return false;
            }

            const roleFilter = Object.entries(this.filters).some(
                ([roleType, isActive]) =>
                    isActive &&
                    (adminForm.role?.name === UserTypes[roleType as keyof typeof UserTypes] ||
                        (roleType === 'withoutRole' && !adminForm.role))
            );

            return roleFilter;
        });

        return filteredList;
    }


    public list(): AdminForm[] {
        return [
            {
                name: "Абрамова Светлана Андреевна",
                role: {
                    id: "1",
                    name: "Администратор",
                },
                deletedRole: false,
                inactivatedUser: false,
                parent: this
            },
            {
                name: "Борисов Иван Петрович",
                role: {
                    id: "2",
                    name: "Тестировщик",
                },
                deletedRole: false,
                inactivatedUser: true,
                parent: this
            },
            {
                name: "Васильева Анна Сергеевна",
                role: {
                    id: "3",
                    name: "Директор",
                },
                deletedRole: true,
                inactivatedUser: false,
                parent: this
            },
            {
                name: "Григорьев Дмитрий Алексеевич",
                role: {
                    id: "4",
                    name: "Аналитик",
                },
                deletedRole: false,
                inactivatedUser: false,
                parent: this
            },
            {
                name: "Ефремова Ольга Николаевна",
                role: {
                    id: "8",
                    name: "Без роли",
                }, // No role
                deletedRole: false,
                inactivatedUser: false,
                parent: this
            },
        ]
    }
}