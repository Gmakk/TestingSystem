// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Page } from "../components/Page";
// import { Stack } from "../components/Stack";
// import { Input } from "../components/input.component";
// import styled from "@emotion/styled";
// import { AdminForm, AdminViewModel, Role } from "../view-models/admin.vm";
// import { useTheme } from "@emotion/react";
// import { observer } from "mobx-react-lite";
// import { Checkbox } from "../components/checkbox.component";
// import { UserTypes } from "../shared/const";
// import { PrimaryButton, SecondaryButton } from "../components/button.component";
// import infoIcon from "../assets/info.svg";
// import { StyledText } from "../components/Text";
// import { Dropdown } from "../components/dropdown.component";
// import { Tooltip } from "react-tooltip";

// export interface AdminPageProps {
//     vm: AdminViewModel
// }

// const GridContainer = styled.div`
//     display: grid;
//     grid-template-columns: 500px 1fr;
//     grid-template-rows: 50px 1fr;
//     gap: 20px;
//     padding: 30px 50px;
//     height: 100%;
// `;

// const List = styled.div`
//     background: ${p => p.theme.colors.containerBg};
//     display: flex;
//     flex-direction: column;
//     padding: 0px 20px;
//     border-radius: 6px;
// `;

// // const Item: React.FC<Pick<AdminForm, "name" | "role"> & { onClick: () => void }> = observer(x => {
// //     const theme = useTheme();
// //     return (
// //         <Stack onClick={x.onClick} direction="column" style={{ background: theme.colors.containerBg, padding: "5px", cursor: "pointer" }}>
// //             <span color={theme.colors.text.primary} style={{ fontSize: "18px" }}>{x.name}</span>
// //             <span color={theme.colors.text.primary} style={{ opacity: 0.5, fontSize: "15px" }}>{x.role ? x.role?.name : UserTypes.withoutRole}</span>
// //         </Stack>
// //     )
// // })

// // const Rigth: React.FC<{ vm: AdminViewModel }> = observer(({ vm }) => {
// //     const theme = useTheme();
// //     return (
// //         <Stack direction="column" gap={35}>
// //             <Stack direction="row" gap={20} style={{ fontSize: "15px" }}>
// //                 <Stack direction="column" gap={10}>
// //                     <Checkbox checked={vm.filters.tester}
// //                         onChange={() => vm.changeFilters('tester')}
// //                         label={UserTypes.tester}
// //                     />
// //                     <Checkbox checked={vm.filters.analyst}
// //                         onChange={() => vm.changeFilters('analyst')}
// //                         label={UserTypes.analyst}
// //                     />
// //                     <Checkbox checked={vm.filters.inactive}
// //                         onChange={() => vm.changeFilters('inactive')}
// //                         label={UserTypes.inactive}
// //                     />
// //                 </Stack>
// //                 <Stack direction="column" gap={10}>
// //                     <Checkbox checked={vm.filters.admin}
// //                         onChange={() => vm.changeFilters('admin')}
// //                         label={UserTypes.admin}
// //                     />
// //                     <Checkbox checked={vm.filters.director}
// //                         onChange={() => vm.changeFilters('director')}
// //                         label={UserTypes.director}
// //                     />
// //                     <Checkbox checked={vm.filters.withoutRole}
// //                         onChange={() => vm.changeFilters('withoutRole')}
// //                         label={UserTypes.withoutRole}
// //                     />
// //                 </Stack>
// //             </Stack>
// //             <Stack direction="column" gap={20}>
// //                 <Stack direction="row" gap={10}>
// //                     <PrimaryButton text="Удалить неактивные аккаунты" />
// //                     <img src={infoIcon} data-tooltip-id="deleted-role"
// //                         data-tooltip-content="Из системы удалятся все неактивные аккаунты" />
// //                     <Tooltip id="deleted-role" style={{ background: theme.colors.secondaryBg }} />
// //                 </Stack>
// //                 <Stack direction="row" gap={10}>
// //                     <PrimaryButton text="Удалить аккаунты без роли" />
// //                     <img src={infoIcon} data-tooltip-id="inactive-user"
// //                         data-tooltip-content="Из системы удалятся все аккаунты без роли" />
// //                     <Tooltip id="inactive-user" style={{ background: theme.colors.secondaryBg }} />
// //                 </Stack>
// //             </Stack>
// //         </Stack>
// //     )
// // })

// // const Form: React.FC<{ vm: AdminForm }> = observer(({ vm }) => {
// //     const theme = useTheme();

// //     const [name, setName] = useState<string>(vm.name);
// //     const [role, setRole] = useState<Role>(vm.role);
// //     const [deletedRole, setDeletedRole] = useState<boolean>(vm.deletedRole);
// //     const [inactivatedUser, setInactivatedUser] = useState<boolean>(vm.inactivatedUser);

// //     useEffect(() => {
// //         setName(vm.name);
// //         setRole(vm.role);
// //     }, [vm])

// //     return (
// //         <Stack direction="column" justify="space-between" style={{ background: theme.colors.containerBg, padding: "30px", height: "300px" }}>
// //             <Stack direction="column" gap={20}>
// //                 <Stack direction="row" gap={20} align="center">
// //                     <StyledText size={18}>ФИО:</StyledText>
// //                     <Input value={name} onChange={setName}
// //                         style={{ boxShadow: "none", border: `1px solid ${theme.colors.accentBg}`, padding: "5px", borderRadius: "0" }} />
// //                 </Stack>
// //                 <Stack direction="row" gap={20} align="center">
// //                     <StyledText size={18}>Роль:</StyledText>
// //                     <Dropdown options={vm.parent.roleOptions}
// //                         label={"Выберите роль"}
// //                         selectedValue={{ label: role ? role.name : "Без роли", value: role ? role.id : "without" }}
// //                         onChange={v => setRole({ id: v.value, name: v.label })} />
// //                 </Stack>
// //             </Stack>
// //             <Stack direction="column">
// //                 <Stack direction="column" gap={20}>
// //                     <Stack direction="row" gap={10}>
// //                         <Checkbox label="Удалить роль пользователя"
// //                             checked={deletedRole}
// //                             onChange={setDeletedRole} />
// //                         <img src={infoIcon} data-tooltip-id="deleted-role"
// //                             data-tooltip-content="Пользователи без роли могут зайти в свой аккаунт, но не имеют доступа к функциям системы" />
// //                         <Tooltip id="deleted-role" style={{ background: theme.colors.secondaryBg }} />
// //                     </Stack>
// //                     <Stack direction="row" gap={10}>
// //                         <Checkbox label="Деактивировать аккаунт"
// //                             checked={inactivatedUser}
// //                             onChange={setInactivatedUser} />
// //                         <img src={infoIcon} data-tooltip-id="inactive-user"
// //                             data-tooltip-content="Пользователь не сможет зайти в систему" />
// //                         <Tooltip id="inactive-user" style={{ background: theme.colors.secondaryBg }} />
// //                     </Stack>
// //                 </Stack>
// //             </Stack>
// //         </Stack>
// //     )
// // })

// // export const AdminPage: React.FC<AdminPageProps> = observer(() => {
// //     const theme = useTheme();
// //     const vm = useMemo(() => new AdminViewModel(), []);

// //     return (
// //         <Page>
// //             <GridContainer>
// //                 <Input value={vm.search} onChange={v => vm.search = v}
// //                     placeholder="Введите имя пользователя" />
// //                 <span style={{ fontSize: "30px", fontWeight: 500, color: theme.colors.text.primary }}>
// //                     Редактирование данных пользователя</span>
// //                 <List>
// //                     {vm.getFilteredList().map(v =>
// //                         <Item key={Math.random()} name={v.name}
// //                             role={v.role}
// //                             onClick={() => vm.select(v)} />)}
// //                 </List>
// //                 {vm.selected ?
// //                     <Stack direction="column" gap={30}>
// //                         <Form vm={vm.selected} />
// //                         <Stack direction="row" gap={20} style={{ justifySelf: "flex-end" }}>
// //                             <SecondaryButton text="Отменить" onClick={() => vm.select(null)} />
// //                             <PrimaryButton text="Сохранить" onClick={() => vm.save()} />
// //                         </Stack>
// //                     </Stack> : <Rigth vm={vm} />}
// //             </GridContainer>
// //         </Page>
// //     )
// // })

// interface SortOptions {
//     field: 'login' | 'role'; // Add other options if needed
//     order: 'asc' | 'desc';
// }

// export const AdminPage: React.FC<AdminPageProps> = observer(({ vm }) => {
//     const theme = useTheme();
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(2);
//     const [totalPages, setTotalPages] = useState(0);
//     const [sortOptions, setSortOptions] = useState<SortOptions>({ field: 'login', order: 'asc' });
//     const [filterRole, setFilterRole] = useState<string>("");

//     const handleSortChange = useCallback((field: 'login' | 'role') => {
//         setSortOptions(prev => ({
//             field: field,
//             order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
//         }))
//     }, [])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await vm.fetchUsers(page, size, sortOptions.field, filterRole);
//                 setTotalPages(vm.totalPages);

//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, [page, size, sortOptions, filterRole, vm]);


//     const handlePageChange = (newPage: number) => {
//         if (newPage >= 0 && newPage <= totalPages - 1) {
//             setPage(newPage);
//         }
//     };

//     return (
//         <Page>
//             <GridContainer>
//                 {/* <Input value={vm.search} onChange={v => vm.search = v}
//                     placeholder="Введите имя пользователя" /> */}
//                  <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
//                     <option value=''>Все роли</option>
//                     <option value='tester'>tester</option>
//                      <option value='admin'>admin</option>
//                      <option value='user'>user</option>
//                 </select>
//                 {/* <span style={{ fontSize: "30px", fontWeight: 500, color: theme.colors.text.primary }}>
//                     Редактирование данных пользователя</span> */}

//                 <Stack direction="row" style={{ gap: "10px" }}>
//                     <button onClick={() => handleSortChange("login")}>Сортировать по логину</button>
//                     <button onClick={() => handleSortChange("role")}>Сортировать по роли</button>
//                 </Stack>
//                 {/* <List>
//                     {vm.users?.map(v =>
//                         <Item key={v.id} name={v.login}
//                             role={v.role as unknown as Role}
//                             onClick={() => vm.select(v)} />)}
//                 </List> */}
//                   <Stack direction="row" style={{ gap: "10px" }}>
//                     <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Предыдущая</button>
//                       <span>{page + 1} / {totalPages}</span>
//                     <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>Следующая</button>
//                     <select value={size} onChange={e => setSize(parseInt(e.target.value))}>
//                       <option value={2}>2</option>
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                     </select>
//                 </Stack>
// {/* 
//                 {vm.selected ?
//                     <Stack direction="column" gap={30}>
//                         <Form vm={vm.selected} />
//                         <Stack direction="row" gap={20} style={{ justifySelf: "flex-end" }}>
//                             <SecondaryButton text="Отменить" onClick={() => vm.select(null)} />
//                             <PrimaryButton text="Сохранить" onClick={() => vm.save()} />
//                         </Stack>
//                     </Stack> : <Rigth vm={vm} />} */}
//             </GridContainer>
//         </Page>
//     );
// });

// const Item: React.FC<Pick<AdminForm, "name" | "role"> & { onClick: () => void }> = observer(x => {
//     const theme = useTheme();
//     return (
//         <Stack onClick={x.onClick} direction="column" style={{ background: theme.colors.containerBg, padding: "5px", cursor: "pointer" }}>
//             <span color={theme.colors.text.primary} style={{ fontSize: "18px" }}>{x.name}</span>
//             <span color={theme.colors.text.primary} style={{ opacity: 0.5, fontSize: "15px" }}>{x.role ? x.role?.name : UserTypes.withoutRole}</span>
//         </Stack>
//     )
// })


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTheme } from '@emotion/react';
import { Input } from '../components/input.component';
import { Page } from '../components/Page';
import { Stack } from '../components/Stack';
import { UserTypes } from '../shared/const';
import { AdminViewModel, AdminUser } from '../view-models/admin.vm';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

interface AdminPageProps {
    vm: AdminViewModel
}

interface SortOptions {
    field: 'login' | 'fullName';
    order: 'asc' | 'desc';
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 500px 1fr;
    grid-template-rows: 50px 1fr;
    gap: 20px;
    padding: 30px 50px;
    height: 100%;
`;

const List = styled.div`
    background: ${p => p.theme.colors.containerBg};
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    border-radius: 6px;
`;

interface SortOptions {
    field: 'login' | 'fullName';
    order: 'asc' | 'desc';
}

export const AdminPage: React.FC = observer(() => {
    const theme = useTheme();
    const vm = useMemo(() => new AdminViewModel(), []); 
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(() => {
        const pageParam = searchParams.get('page');
        return pageParam ? parseInt(pageParam, 10) : 0;
    });
    const [size, setSize] = useState(() => {
        const sizeParam = searchParams.get('size');
        return sizeParam ? parseInt(sizeParam, 10) : 2;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [sortOptions, setSortOptions] = useState<SortOptions>(() => {
        const sortParam = searchParams.get('sort');
        const orderParam = searchParams.get('order');
        return { field: sortParam === 'fullName' ? 'fullName' : 'login', order: orderParam === 'desc' ? 'desc' : 'asc' }
    });
    const [filterRole, setFilterRole] = useState<string>(() => searchParams.get('role') || "");

    const handleSortChange = useCallback((field: 'login' | 'fullName') => {
        const order = sortOptions.field === field && sortOptions.order === 'asc' ? 'desc' : 'asc'
        setSortOptions({ field: field, order: order })
        setSearchParams(prev => {
            prev.set('sort', field)
            prev.set('order', order)
            return prev
        })
    }, [sortOptions.field, sortOptions.order, setSearchParams])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await vm.fetchUsers(page, size, sortOptions.field, filterRole);
                setTotalPages(vm.totalPages);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [page, size, sortOptions, filterRole, vm, vm.users.length]);


    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages - 1) {
            setPage(newPage);
            setSearchParams(prev => {
                prev.set('page', String(newPage))
                return prev
            })
        }
    };

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        setSearchParams(prev => {
            prev.set('size', String(newSize))
            return prev
        })
    }

    const handleFilterChange = (newRole: string) => {
        setFilterRole(newRole)
        setSearchParams(prev => {
            newRole ? prev.set('role', newRole) : prev.delete('role')
            return prev
        })
    }

    return (
        <Page>
            <GridContainer>
                {/* <Input value={vm.search} onChange={v => vm.search = v}
                    placeholder="Введите имя пользователя" /> */}
                <select value={filterRole} onChange={e => handleFilterChange(e.target.value)}>
                    <option value=''>Все роли</option>
                    <option value='tester'>tester</option>
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                </select>
                {/* <span style={{ fontSize: "30px", fontWeight: 500, color: theme.colors.text.primary }}>
                    Редактирование данных пользователя</span> */}
                <Stack direction="row" style={{ gap: "10px" }}>
                    <button onClick={() => handleSortChange("login")}>Сортировать по логину</button>
                    <button onClick={() => handleSortChange("fullName")}>Сортировать по полному имени</button>
                </Stack>
                <List>
                    {vm.users.map(v =>
                        <Item key={v.id} fullName={v.fullName}
                            login={v.login}
                            role={v.role}
                            onClick={() => vm.select(v)} />)}
                </List>
                <Stack direction="row" style={{ gap: "10px" }}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Предыдущая</button>
                    <span>{page + 1} / {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>Следующая</button>
                    <select value={size} onChange={e => handleSizeChange(parseInt(e.target.value))}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </Stack>
            </GridContainer>
        </Page>
    );
});

const Item: React.FC<Pick<AdminUser, "fullName" | "role" | "login"> & { onClick: () => void }> = observer(x => {
    const theme = useTheme();
    return (
        <Stack onClick={x.onClick} direction="column" style={{ background: theme.colors.containerBg, padding: "5px", cursor: "pointer" }}>
            <span color={theme.colors.text.primary} style={{ fontSize: "18px" }}>{x.fullName}</span>
            {/* <span color={theme.colors.text.primary} style={{ fontSize: "18px" }}>{x.login}</span> */}
            <span color={theme.colors.text.primary} style={{ opacity: 0.5, fontSize: "15px" }}>{x.role ? x.role : UserTypes.withoutRole}</span>
        </Stack>
    )
})
