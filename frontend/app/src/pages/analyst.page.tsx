import { observer } from "mobx-react-lite";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Page } from "../components/Page";
import { TestCase } from "../view-models/tester.vm";
import styled from "@emotion/styled";
import { Stack } from "../components/Stack";
import { useTheme } from "@emotion/react";
import ArrowIcon from "../assets/listArrow.svg";
import { StyledText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import CloseIcon from "../assets/close.svg";
import { AnalystPageViewModel, ProjectType, ScenarioType, TestCaseType, TestPlanType } from "../view-models/analyst.vm";
import { Expandee } from "../components/expandee.component";
import { Input } from "../components/input.component";
import { Dropdown } from "../components/dropdown.component";
import { MultiSelectDropdown, Option } from "../components/multiselect.component";
import { DatePicker } from "../components/datepicker.component";
import { isolateGlobalState } from "mobx/dist/internal";

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
    const [testPlans, setTestPlans] = useState<{ id: number, title: string }[]>([])

    const openList = async () => {
        setTestPlans(await x.vm.getTestPlansByProject.launch(x.title) ?? []);
        setIsOpen(!isOpen)
    }

    const openProject = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        const data = await x.vm.getProjectByTitle.launch(x.title);

        x.vm.select({
            type: "PROJECT",
            item: data ?? null
        })
    }

    return (
        <Stack direction="column">
            <Stack direction="row" align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} onClick={() => openList()} style={{ rotate: isOpen ? "270deg" : "0deg", cursor: "pointer" }} />
                <StyledText size={20} onClick={e => openProject(e)} >{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {testPlans.map(v => <TestPlan title={v.title} vm={x.vm} />)}
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

const TestCaseForm: React.FC<{ item: TestCaseType | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        description: x.item?.description ?? "",
        inputData: x.item?.inputData ?? "",
        outputData: x.item?.outputData ?? "",
        projectTitle: x.item?.projectTitle ?? ""
    })

    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 40px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row">
                <StyledText size={22} weight={600}>{!x.item ? "Создание тест-кейса" : "Редактирование тест-кейса"}</StyledText>
                <Expandee />
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: 0, right: -30
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            {!x.item ? <Stack direction="column" gap={25}>
                <Dropdown width="100%" options={x.vm.projects.map(v => ({ label: v, value: v }))}
                    onChange={v => setForm({ ...form, projectTitle: v.value })} label="Выберите проект"
                    selectedValue={{ label: form.projectTitle, value: form.projectTitle }} />
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
                <PrimaryButton text="Сохранить" onClick={() => x.item ? x.vm.saveTestCase(x.item.id, form) : x.vm.saveTestCase(null, form)} />
            </Stack>
        </Stack>
    )
})

const ScenarioForm: React.FC<{ item: ScenarioType | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    useEffect(() => {
        x.vm.getAllTestCases.launch();
    }, [])

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        testCases: x.vm?.testCasesByScenario ?? [],
        projectTitle: x.item?.projectTitle ?? ""
    })

    const state = {
        options: x.vm.allTestCases.map(v => ({ name: v.title, id: v.id })),
        selected: form.testCases.map(v => ({ name: v.title, id: v.id })),
    };

    const onSelect = (selectedList: Option[], selectedItem: Option) => {
        form.testCases.push({ id: selectedItem.id, title: selectedItem.name })
    }

    const onRemove = (selectedList: Option[], selectedItem: Option) => {
        form.testCases = form.testCases.filter(v => v.id != selectedItem.id)
    }

    const saveForm = () => {
        return {
            ...form,
            testCases: form.testCases.map(v => v.id)
        }
    }

    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 40px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row">
                <StyledText size={22} weight={600}>{!x.item ? "Создание сценария" : "Редактирование сценария"}</StyledText>
                <Expandee />
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: 0, right: -30
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            {!x.item ? <Stack direction="column" gap={25}>
                <Dropdown width="100%" options={x.vm.projects.map(v => ({ label: v, value: v }))}
                    onChange={v => setForm({ ...form, projectTitle: v.value })} label="Выберите проект"
                    selectedValue={{ label: form.projectTitle, value: form.projectTitle }} />
                <HorizontalLine />
            </Stack> : null}
            <Stack direction="column" gap={20}>
                <Input value={form.title} onChange={v => setForm({ ...form, title: v })}
                    style={InputFormStyles} placeholder="Введите название" />
                <MultiSelectDropdown options={state.options} placeholder="Включить тест-кейсы"
                    selectedOptions={state.selected}
                    onSelect={onSelect} onRemove={onRemove} />
            </Stack>
            <Expandee />
            <Stack direction="row" gap={20} justify="end">
                <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                <PrimaryButton text="Сохранить" onClick={() => x.item ? x.vm.saveScenario.launch(x.item.id, saveForm()) : x.vm.saveScenario.launch(null, saveForm())} />
            </Stack>
        </Stack>
    )
})

const TestPlanForm: React.FC<{ item: TestPlanType | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    useEffect(() => {
        x.vm.getAllScenarios.launch();
    }, [])

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        startDate: x.item?.startDate ?? "",
        endDate: x.item?.endDate ?? "",
        scenarios: x.item?.scenarios ?? [],
        projectTitle: x.item?.projectTitle ?? ""
    })

    const state = {
        options: x.vm.allScenarios.map(v => ({ name: v.title, id: v.id })),
        selected: form.scenarios.map(v => ({ name: v.title, id: v.id })),
    };

    const onSelect = (selectedList: Option[], selectedItem: Option) => {
        form.scenarios.push({ id: selectedItem.id, title: selectedItem.name })
    }

    const onRemove = (selectedList: Option[], selectedItem: Option) => {
        form.scenarios = form.scenarios.filter(v => v.id != selectedItem.id)
    }

    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 40px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row">
                <StyledText size={22} weight={600}>{!x.item ? "Создание тест-плана" : "Редактирование тест-плана"}</StyledText>
                <Expandee />
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: 0, right: -30
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            {!x.item ? <Stack direction="column" gap={25}>
                <Dropdown width="100%" options={x.vm.projects.map(v => ({ label: v, value: v }))}
                    onChange={v => setForm({ ...form, projectTitle: v.value })} label="Выберите проект"
                    selectedValue={{ label: form.projectTitle, value: form.projectTitle }} />
                <HorizontalLine />
            </Stack> : null}
            <Stack direction="column" gap={20}>
                <Input value={form.title} onChange={v => setForm({ ...form, title: v })}
                    style={InputFormStyles} placeholder="Введите название" />
                <Stack direction="row" gap={50}>
                    <DatePicker value={form.startDate} onChange={v => setForm({ ...form, startDate: v })} />
                    <DatePicker value={form.endDate} onChange={v => setForm({ ...form, endDate: v })} />
                </Stack>
                <MultiSelectDropdown options={state.options} placeholder="Включить сценарии"
                    selectedOptions={state.selected}
                    onSelect={onSelect} onRemove={onRemove} />
            </Stack>
            <Expandee />
            <Stack direction="row" gap={20} justify="end">
                <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                <PrimaryButton text="Сохранить" onClick={() => x.item ? x.vm.saveTestPlan.launch(x.item.id, form) : x.vm.saveTestPlan.launch(null, form)} />
            </Stack>
        </Stack>
    )
})

export const ProjectForm: React.FC<{ form: ProjectType | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 50px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="row" justify="space-between">
                <StyledText weight={500} size={22}>{x.form?.title}</StyledText>
                <img src={CloseIcon} style={{
                    cursor: "pointer", width: "25px",
                    position: "relative", alignSelf: "end",
                    top: -5, right: -35
                }} onClick={() => x.vm.select(null)} />
            </Stack>
            <Stack direction="column" gap={30} style={{ height: "100%" }}>
                <Stack direction="column" gap={5}>
                    <StyledText style={{ border: `1px solid ${theme.colors.secondaryBg}`, padding: "3px 7px" }} size={15} weight={700}>
                        Включенные тест-планы
                    </StyledText>
                    <Stack direction="column" gap={5} style={{ border: `1px solid ${theme.colors.secondaryBg}`, padding: "5px 10px" }}>
                        {x.form?.testPlans.map(v => (
                            <Stack direction="row" gap={5}>
                                <StyledText weight={600} size={15}>{v.title}</StyledText>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
                <Expandee />
                <Stack direction="row" gap={20} style={{ alignSelf: "end", justifySelf: "end", position: "relative", bottom: -20, right: -35 }}>
                    <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                    {/* <PrimaryButton text="Сохранить" onClick={() => x.vm.select(null)} /> */}
                </Stack>
            </Stack>
        </Stack>
    )
})

export const ButtonGroup: React.FC<{ vm: AnalystPageViewModel }> = observer(x => {
    return (
        <Stack direction="row" justify="space-between">
            <SecondaryButton text="Статистика" />
            <PrimaryButton text="Создать тест-план" onClick={() => x.vm.select({ type: "TEST_PLAN", item: null })} />
            <PrimaryButton text="Создать сценарий" onClick={() => x.vm.select({ type: "SCENARIO", item: null })} />
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
            case "TEST_CASE": return <TestCaseForm item={selected.item} vm={vm} />
            case "PROJECT": return <ProjectForm form={selected.item} vm={vm} />;
            case "SCENARIO": return <ScenarioForm item={selected.item} vm={vm} />;
            case "TEST_PLAN": return <TestPlanForm item={selected.item} vm={vm} />;
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
