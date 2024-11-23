import { observer } from "mobx-react-lite";
import React, { useMemo, useState } from "react";
import { Page } from "../components/Page";
import { TestCase, TesterPageViewModel } from "../view-models/tester.vm";
import styled from "@emotion/styled";
import { Stack } from "../components/Stack";
import { useTheme } from "@emotion/react";
import ArrowIcon from "../assets/listArrow.svg";
import { StyledText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import CloseIcon from "../assets/close.svg";
import { Checkbox } from "../components/checkbox.component";
import { Expandee } from "../components/expandee.component";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 30px 50px;
    height: 88vh;
`;

export interface CollapseListProps {
    data: string[]
    onClick: () => void
}

const Project: React.FC<{ title: string, vm: TesterPageViewModel }> = x => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Stack direction="column">
            <Stack direction="row" onClick={() => setIsOpen(!isOpen)} align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} style={{ rotate: isOpen ? "270deg" : "0deg" }} />
                <StyledText size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {x.vm.testPlans.map(v => <TestPlan title={v} vm={x.vm} />)}
            </Stack>}
        </Stack>
    )
}

const TestPlan: React.FC<{ title: string, vm: TesterPageViewModel }> = x => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Stack direction="column">
            <Stack direction="row" onClick={() => setIsOpen(!isOpen)} align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} style={{ rotate: isOpen ? "270deg" : "0deg" }} />
                <StyledText size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {x.vm.scenarios.map(v => <Scenario title={v} vm={x.vm} />)}
            </Stack>}
        </Stack>
    )
}

const Scenario: React.FC<{ title: string, vm: TesterPageViewModel }> = x => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Stack direction="column">
            <Stack direction="row" onClick={() => setIsOpen(!isOpen)} align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} style={{ rotate: isOpen ? "270deg" : "0deg" }} />
                <StyledText size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {x.vm.testCases.map(v => <TestCaseComponent item={v} vm={x.vm} />)}
            </Stack>}
        </Stack>
    )
}

const TestCaseComponent: React.FC<{ item: TestCase, vm: TesterPageViewModel }> = observer(x => {
    return (
        <Stack direction="row" onClick={() => x.vm.select(x.item)} align="center" gap={5}
            style={{ cursor: "pointer", padding: "0 0 0 25px", background: x.vm.selected?.id === x.item.id ? "rgba(214, 173, 173, 0.5)" : "transparent" }}>
            <StyledText size={20}>{x.item.title}</StyledText>
        </Stack>
    )
})

const FormTestCase: React.FC<{ item: TestCase, vm: TesterPageViewModel }> = observer(x => {
    const theme = useTheme();
    const [checked, setChecked] = useState(false);
    return (
        <Stack direction={"column"} gap={30}>
            <Stack direction="column" style={{
                background: theme.colors.containerBg, padding: "10px 50px 40px 50px",
                boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)",
            }}>
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: 0, right: -40
                }} onClick={() => x.vm.select(null)} />
                <Stack direction="column" gap={20}>
                    <Stack direction="column" gap={6}>
                        <StyledText size={22} weight={700}>{x.item.title}</StyledText>
                        <StyledText size={18}>{x.item.description}</StyledText>
                    </Stack>
                    <Stack direction="row" gap={60}>
                        <Stack direction="column">
                            <StyledText size={18}>Входные данные</StyledText>
                            <StyledText size={18}>{x.item.inputData}</StyledText>
                        </Stack>
                        <Stack direction="column">
                            <StyledText size={18} weight={600}>Выходные данные</StyledText>
                            <StyledText size={18}>{x.item.outputData}</StyledText>
                        </Stack>
                    </Stack>
                    <div style={{ minHeight: "100px" }}></div>
                    <Stack direction="row" align="center">
                        <Checkbox checked={checked} onChange={v => setChecked(v)} />
                        <StyledText size={15}>Выполнено успешно</StyledText>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="column" gap={10}>
                <StyledText size={20}>Комментарий</StyledText>
                <textarea style={{ background: theme.colors.containerBg, borderRadius: "6px", padding: "10px 15px" }}></textarea>
            </Stack>
            <div style={{ alignSelf: "end" }}>
                <PrimaryButton text="Сохранить" onClick={() => x.vm.save(x.item.id)} />
            </div>
        </Stack>
    )
})

export const TesterPage: React.FC = observer(() => {
    const vm = useMemo(() => new TesterPageViewModel(), []);
    const theme = useTheme();

    return (
        <Page>
            <GridContainer>
                <Stack direction="column" gap={12}
                    style={{
                        background: theme.colors.containerBg, borderRadius: "6px",
                        boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)",
                        padding: "20px 30px",
                        overflowY: "auto"
                    }}>
                    {vm.projects?.map(v => <Project title={v} vm={vm} />)}
                </Stack>
                <Stack direction="column" gap={20}>
                    <SecondaryButton text="Статистика" />
                    {vm.selected && <FormTestCase item={vm.selected} vm={vm} />}
                </Stack>
            </GridContainer>
        </Page>
    )
})
