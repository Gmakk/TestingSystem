import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { Input } from "../components/input.component";
import styled from "@emotion/styled";
import { AdminForm, AdminViewModel, Role } from "../view-models/admin.vm";
import { useTheme } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { Checkbox } from "../components/checkbox.component";
import { UserTypes } from "../shared/const";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import infoIcon from "../assets/info.svg";
import { StyledText } from "../components/Text";
import { Dropdown, Option } from "../components/dropdown.component";
import { Tooltip } from "react-tooltip";

export interface AdminPageProps {
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

const Item: React.FC<Pick<AdminForm, "name" | "role"> & { onClick: () => void }> = observer(x => {
    const theme = useTheme();
    return (
        <Stack onClick={x.onClick} direction="column" style={{ background: theme.colors.containerBg, padding: "5px", cursor: "pointer" }}>
            <span color={theme.colors.text.primary} style={{ fontSize: "18px" }}>{x.name}</span>
            <span color={theme.colors.text.primary} style={{ opacity: 0.5, fontSize: "15px" }}>{x.role ? x.role?.name : UserTypes.withoutRole}</span>
        </Stack>
    )
})

const Rigth: React.FC<{ vm: AdminViewModel }> = observer(({ vm }) => {
    const theme = useTheme();
    return (
        <Stack direction="column" gap={35}>
            <Stack direction="row" gap={20} style={{ fontSize: "15px" }}>
                <Stack direction="column" gap={10}>
                    <Checkbox checked={vm.filters.tester}
                        onChange={() => vm.changeFilters('tester')}
                        label={UserTypes.tester}
                    />
                    <Checkbox checked={vm.filters.analyst}
                        onChange={() => vm.changeFilters('analyst')}
                        label={UserTypes.analyst}
                    />
                    <Checkbox checked={vm.filters.inactive}
                        onChange={() => vm.changeFilters('inactive')}
                        label={UserTypes.inactive}
                    />
                </Stack>
                <Stack direction="column" gap={10}>
                    <Checkbox checked={vm.filters.admin}
                        onChange={() => vm.changeFilters('admin')}
                        label={UserTypes.admin}
                    />
                    <Checkbox checked={vm.filters.director}
                        onChange={() => vm.changeFilters('director')}
                        label={UserTypes.director}
                    />
                    <Checkbox checked={vm.filters.withoutRole}
                        onChange={() => vm.changeFilters('withoutRole')}
                        label={UserTypes.withoutRole}
                    />
                </Stack>
            </Stack>
            <Stack direction="column" gap={20}>
                <Stack direction="row" gap={10}>
                    <PrimaryButton text="Удалить неактивные аккаунты" />
                    <img src={infoIcon} data-tooltip-id="deleted-role"
                        data-tooltip-content="Из системы удалятся все неактивные аккаунты" />
                    <Tooltip id="deleted-role" style={{ background: theme.colors.secondaryBg }} />
                </Stack>
                <Stack direction="row" gap={10}>
                    <PrimaryButton text="Удалить аккаунты без роли" />
                    <img src={infoIcon} data-tooltip-id="inactive-user"
                        data-tooltip-content="Из системы удалятся все аккаунты без роли" />
                    <Tooltip id="inactive-user" style={{ background: theme.colors.secondaryBg }} />
                </Stack>
            </Stack>
        </Stack>
    )
})

const Form: React.FC<{ vm: AdminForm }> = observer(({ vm }) => {
    const theme = useTheme();

    const [name, setName] = useState<string>(vm.name);
    const [role, setRole] = useState<Role>(vm.role);
    const [deletedRole, setDeletedRole] = useState<boolean>(vm.deletedRole);
    const [inactivatedUser, setInactivatedUser] = useState<boolean>(vm.inactivatedUser);

    useEffect(() => {
        setName(vm.name);
        setRole(vm.role);
    }, [vm])

    return (
        <Stack direction="column" justify="space-between" style={{ background: theme.colors.containerBg, padding: "30px", height: "300px" }}>
            <Stack direction="column" gap={20}>
                <Stack direction="row" gap={20} align="center">
                    <StyledText size={18}>ФИО:</StyledText>
                    <Input value={name} onChange={setName}
                        style={{ boxShadow: "none", border: `1px solid ${theme.colors.accentBg}`, padding: "5px", borderRadius: "0" }} />
                </Stack>
                <Stack direction="row" gap={20} align="center">
                    <StyledText size={18}>Роль:</StyledText>
                    <Dropdown options={vm.parent.roleOptions}
                        label={"Выберите роль"}
                        selectedValue={{ label: role ? role.name : "Без роли", value: role ? role.id : "without" }}
                        onChange={v => setRole({ id: v.value, name: v.label })} />
                </Stack>
            </Stack>
            <Stack direction="column">
                <Stack direction="column" gap={20}>
                    <Stack direction="row" gap={10}>
                        <Checkbox label="Удалить роль пользователя"
                            checked={deletedRole}
                            onChange={setDeletedRole} />
                        <img src={infoIcon} data-tooltip-id="deleted-role"
                            data-tooltip-content="Пользователи без роли могут зайти в свой аккаунт, но не имеют доступа к функциям системы" />
                        <Tooltip id="deleted-role" style={{ background: theme.colors.secondaryBg }} />
                    </Stack>
                    <Stack direction="row" gap={10}>
                        <Checkbox label="Деактивировать аккаунт"
                            checked={inactivatedUser}
                            onChange={setInactivatedUser} />
                        <img src={infoIcon} data-tooltip-id="inactive-user"
                            data-tooltip-content="Пользователь не сможет зайти в систему" />
                        <Tooltip id="inactive-user" style={{ background: theme.colors.secondaryBg }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
})

export const AdminPage: React.FC<AdminPageProps> = observer(() => {
    const theme = useTheme();
    const vm = useMemo(() => new AdminViewModel(), []);

    return (
        <Page>
            <GridContainer>
                <Input value={vm.search} onChange={v => vm.search = v}
                    placeholder="Введите имя пользователя" />
                <span style={{ fontSize: "30px", fontWeight: 500, color: theme.colors.text.primary }}>
                    Редактирование данных пользователя</span>
                <List>
                    {vm.getFilteredList().map(v =>
                        <Item key={Math.random()} name={v.name}
                            role={v.role}
                            onClick={() => vm.select(v)} />)}
                </List>
                {vm.selected ?
                    <Stack direction="column" gap={30}>
                        <Form vm={vm.selected} />
                        <Stack direction="row" gap={20} style={{ justifySelf: "flex-end" }}>
                            <SecondaryButton text="Отменить" onClick={() => vm.select(null)} />
                            <PrimaryButton text="Сохранить изменения" onClick={() => vm.save()} />
                        </Stack>
                    </Stack> : <Rigth vm={vm} />}
            </GridContainer>
        </Page>
    )
})