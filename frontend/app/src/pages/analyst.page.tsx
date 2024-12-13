import { observer } from "mobx-react-lite";
import React, { CSSProperties, useMemo, useState } from "react";
import { Page } from "../components/Page";
import { TestCase } from "../view-models/tester.vm";
import styled from "@emotion/styled";
import { Stack } from "../components/Stack";
import { useTheme } from "@emotion/react";
import ArrowIcon from "../assets/listArrow.svg";
import { StyledText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import CloseIcon from "../assets/close.svg";
import { Checkbox } from "../components/checkbox.component";
import { AnalystPageViewModel, ProjectType } from "../view-models/analyst.vm";
import { Expandee } from "../components/expandee.component";
import { Input } from "../components/input.component";
import { Dropdown } from "../components/dropdown.component";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 30px 50px;
    height: 88vh;
`;

export const HorizontalLine = styled.div`
    width: 100%;
    height: 0;
    border-bottom: 2px solid #F3E7E7;
`

export const InputFormStyles: CSSProperties = {
    boxShadow: "none",
    border: "1px solid #D6ADAD",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "18px",
    color: "#313131",
    fontWeight: 300
}

export interface CollapseListProps {
    data: string[]
    onClick: () => void
}

const Project: React.FC<{ title: string, vm: AnalystPageViewModel }> = x => {
    const [isOpen, setIsOpen] = useState(false);

    const openProject = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        // запросить здесь по строке проект (видимо включенные в него тест-планы)
        const mock = {
            title: x.title,
            testPlans: x.vm.testPlans
        }
        x.vm.select({
            type: "PROJECT",
            item: mock
        })
    }

    return (
        <Stack direction="column">
            <Stack direction="row" align="center" onClick={e => openProject(e)} gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} onClick={() => setIsOpen(!isOpen)} style={{ rotate: isOpen ? "270deg" : "0deg", cursor: "pointer" }} />
                <StyledText size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {x.vm.testPlans.map(v => <TestPlan title={v.title} vm={x.vm} />)}
            </Stack>}
        </Stack>
    )
}

const TestPlan: React.FC<{ title: string, vm: AnalystPageViewModel }> = x => {
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

const Scenario: React.FC<{ title: string, vm: AnalystPageViewModel }> = x => {
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

const TestCaseComponent: React.FC<{ item: TestCase, vm: AnalystPageViewModel }> = observer(x => {
    return (
        <Stack direction="row" onClick={() => void 0} align="center" gap={5}
            style={{ cursor: "pointer", padding: "0 0 0 25px" }}>
            <StyledText size={20}>{x.item.title}</StyledText>
        </Stack>
    )
})

const FormTestCase: React.FC<{ item: TestCase | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        description: x.item?.description ?? "",
        inputData: x.item?.inputData ?? "",
        outputData: x.item?.outputData ?? ""
    })

    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 40px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row">
                <StyledText size={22} weight={600}>{x.item ? "Создание тест-кейса" : "Редактирование тест-кейса"}</StyledText>
                <Expandee />
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: 0, right: -30
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            {!x.item ? <Stack direction="column" gap={25}>
                <Dropdown width="100%" options={[]} onChange={() => void 0} label="Выберите проект" selectedValue={undefined}
                />
                <HorizontalLine />
            </Stack> : null}
            <Stack direction="column" gap={20}>
                <Input value={form.title} onChange={v => setForm({ ...form, title: v })}
                    style={InputFormStyles} placeholder="Введите название" />
                <textarea style={InputFormStyles} placeholder="Введите описание" rows={3}
                    value={form.description} onChange={v => setForm({ ...form, description: v.target.value })} />
                <textarea style={InputFormStyles} placeholder="Введите входные данные"
                    value={form.inputData} onChange={v => setForm({ ...form, inputData: v.target.value })} />
                <textarea style={InputFormStyles} placeholder="Введите выходные данные"
                    value={form.outputData} onChange={v => setForm({ ...form, outputData: v.target.value })} />
            </Stack>
            <Stack direction="row" gap={20} justify="end">
                <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                <PrimaryButton text="Сохранить" onClick={() => void 0} />
            </Stack>
        </Stack>
    )
})

export const ProjectForm: React.FC<{ form: ProjectType, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();
    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 50px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row" justify="space-between">
                <StyledText weight={500} size={22}>{x.form.title}</StyledText>
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: -5, right: -35
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            <Stack direction="column" gap={30} style={{ height: "100%" }}>
                <Stack direction="column" gap={5}>
                    <StyledText style={{ border: `1px solid ${theme.colors.secondaryBg}`, padding: "3px 7px" }} size={15} weight={700}>
                        Включить тест-планы
                    </StyledText>
                    <Stack direction="column" gap={5} style={{ border: `1px solid ${theme.colors.secondaryBg}`, padding: "5px 10px" }}>
                        {x.form.testPlans.map(v => (
                            <Stack direction="row" gap={5}>
                                <Checkbox checked={false} />
                                <StyledText weight={600} size={15}>{v.title}</StyledText>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
                <Expandee />
                <Stack direction="row" gap={20} style={{ alignSelf: "end", justifySelf: "end", position: "relative", bottom: -20, right: -35 }}>
                    <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                    <PrimaryButton text="Сохранить изменения" onClick={() => x.vm.select(null)} />
                </Stack>
            </Stack>
        </Stack>
    )
})

export const ButtonGroup: React.FC<{ vm: AnalystPageViewModel }> = observer(x => {
    return (
        <Stack direction="row" justify="space-between">
            <SecondaryButton text="Статистика" />
            <PrimaryButton text="Создать тест-план" />
            <PrimaryButton text="Создать сценарий" />
            <PrimaryButton text="Создать тест-кейс" onClick={() => x.vm.select({ type: "TEST_CASE", item: null })} />
        </Stack>
    )
})

export const AnalystPage: React.FC = observer(() => {
    const vm = useMemo(() => new AnalystPageViewModel(), []);
    const theme = useTheme();

    const selected = vm.selected;

    const Form = () => {
        switch (selected?.type) {
            case "TEST_CASE": return <FormTestCase item={selected.item} vm={vm} />
            case "PROJECT": return <ProjectForm form={selected.item} vm={vm} />;
            case "SCENARIO": return;
            case "TEST_PLAN": return;
        }
    }

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
                <Stack direction="column" gap={30}>
                    <ButtonGroup vm={vm} />
                    {vm.selected && Form()}
                </Stack>
            </GridContainer>
        </Page>
    )
})
