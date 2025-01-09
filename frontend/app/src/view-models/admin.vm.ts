// import { makeAutoObservable } from "mobx";
// import { UserTypes } from "../shared/const";
// import axios from "axios";
// import { UsersModel } from "../api/models/users";
// import { z } from "zod";

// export type Role = {
//     id: string
//     name: string
// } | null

// export type AdminForm = {
//     name: string
//     role: Role
//     deletedRole: boolean
//     inactivatedUser: boolean
//     parent: AdminViewModel
// }

// export type User = z.infer<typeof UsersModel.User>

// type Filters = {
//     [key in keyof typeof UserTypes]: boolean;
// };

// export class AdminViewModel {
//     constructor() {
//         makeAutoObservable(this);
//     }

//     selected: User | null = null;

//     users: User[] = [];
//     search: string = '';
//     totalPages = 0;

//     // filters: Filters = {
//     //     admin: true,
//     //     tester: true,
//     //     director: true,
//     //     analyst: true,
//     //     inactive: true,
//     //     withoutRole: true,
//     // }

//     // public changeFilters = (userType: keyof typeof UserTypes) => {
//     //     this.filters = {
//     //         ...this.filters,
//     //         [userType]: !this.filters[userType],
//     //     };
//     // }

//     // public roleOptions = this.list()
//     //     .filter((user) => user.role !== null)
//     //     .map((user) => ({
//     //         label: user.role!.name,
//     //         value: user.role!.id,
//     //     }));

//     public select(form: User | null) {
//         console.log("select", form)
//         this.selected = form;
//     }

//     // public getFilteredList(): AdminForm[] {
//     //     const filteredList = this.list().filter((adminForm) => {
//     //         // Фильтр поиска
//     //         if (
//     //             this.search.trim() !== '' &&
//     //             !adminForm.name.toLowerCase().includes(this.search.toLowerCase())
//     //         ) {
//     //             return false;
//     //         }

//     //         const roleFilter = Object.entries(this.filters).some(
//     //             ([roleType, isActive]) =>
//     //                 isActive &&
//     //                 (adminForm.role?.name === UserTypes[roleType as keyof typeof UserTypes] ||
//     //                     (roleType === 'withoutRole' && !adminForm.role))
//     //         );

//     //         return roleFilter;
//     //     });

//     //     return filteredList;
//     // }

//     async fetchUsers(page: number, size: number, sort: string, role: string = "") {
//         try {
//             const response = await axios.get<{ content: User[], totalPages: number }>(`http://localhost:9091/api/user/pagination`, {
//                 params: {
//                     page: page,
//                     size: size,
//                     sort: sort,
//                     // order: order,
//                     role: role,
//                 },
//             });
//             this.users = response.data.content;
//             this.totalPages = response.data.totalPages;
//         } catch (error) {
//             console.error("Error fetching users:", error);
//             this.users = [];
//             this.totalPages = 0
//         }
//     }

//     async save() {
//         if (this.selected) {
//             try {
//                 await axios.put(`http://localhost:9091/api/user/${this.selected.id}`, this.selected);
//                 this.select(null)
//                 await this.fetchUsers(0, 2, "login", );
//             }
//             catch (error) {
//                 console.error("Error saving user:", error);
//             }
//         }
//     }

//     // public list(): AdminForm[] {
//     //     return [
//     //         {
//     //             name: "Абрамова Светлана Андреевна",
//     //             role: {
//     //                 id: "1",
//     //                 name: "Администратор",
//     //             },
//     //             deletedRole: false,
//     //             inactivatedUser: false,
//     //             parent: this
//     //         },
//     //         {
//     //             name: "Борисов Иван Петрович",
//     //             role: {
//     //                 id: "2",
//     //                 name: "Тестировщик",
//     //             },
//     //             deletedRole: false,
//     //             inactivatedUser: true,
//     //             parent: this
//     //         },
//     //         {
//     //             name: "Васильева Анна Сергеевна",
//     //             role: {
//     //                 id: "3",
//     //                 name: "Директор",
//     //             },
//     //             deletedRole: true,
//     //             inactivatedUser: false,
//     //             parent: this
//     //         },
//     //         {
//     //             name: "Григорьев Дмитрий Алексеевич",
//     //             role: {
//     //                 id: "4",
//     //                 name: "Аналитик",
//     //             },
//     //             deletedRole: false,
//     //             inactivatedUser: false,
//     //             parent: this
//     //         },
//     //         {
//     //             name: "Ефремова Ольга Николаевна",
//     //             role: {
//     //                 id: "8",
//     //                 name: "Без роли",
//     //             }, // No role
//     //             deletedRole: false,
//     //             inactivatedUser: false,
//     //             parent: this
//     //         },
//     //     ]
//     // }
// }

import { makeAutoObservable } from 'mobx';
import axios from 'axios';

export interface AdminUser {
    id: number;
    fullName: string;
    login: string;
    role: string;
    isActive: boolean;
}


export class AdminViewModel {
    users: AdminUser[] = [];
    search: string = '';
    selected: AdminUser | null = null;
    totalPages = 0;


    constructor() {
        makeAutoObservable(this);
    }

    async fetchUsers(page: number, size: number, sort: string, role: string = "") {
        try {
            const response = await axios.get<{ content: AdminUser[], totalPages: number }>(`http://localhost:9091/api/user/pagination`, {
                params: {
                    page: page,
                    size: size,
                    sort: sort,
                    role: role,
                },
            });
            this.users = response.data.content;
            this.totalPages = response.data.totalPages;
        } catch (error) {
            console.error("Error fetching users:", error);
            this.users = [];
            this.totalPages = 0
        }
    }

    select(user: AdminUser | null) {
        this.selected = user;
    }

    async save() {
        if (this.selected) {
            try {
                await axios.put(`http://localhost:9091/api/user/${this.selected.id}`, this.selected);
                this.select(null)
                await this.fetchUsers(0, 2, "login", "");
            }
            catch (error) {
                console.error("Error saving user:", error);
            }
        }
    }
}
