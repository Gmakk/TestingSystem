import { observer } from "mobx-react-lite";
import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { Page } from "../components/Page";
import styled from "@emotion/styled";
import { Stack } from "../components/Stack";
import { useTheme } from "@emotion/react";
import { StyledText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import CloseIcon from "../assets/close.svg";
import { AnalystPageViewModel } from "../view-models/analyst.vm";
import { Expandee } from "../components/expandee.component";
import { Input } from "../components/input.component";
import { Dropdown } from "../components/dropdown.component";
import { MultiSelectDropdown, Option } from "../components/multiselect.component";
import { DatePicker } from "../components/datepicker.component";
import { canOpen, Projects } from "./Tree.component";
import { TestCaseType, ScenarioType, TestPlanType, ProjectType, TreeComponentViewModel, Form } from "../view-models/tree.vm";
import { StatisticsDownload } from "./director.page";
import { toast } from "sonner";
import { AnalystApi } from "../api/endpoints/analyst";

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

const TestCaseForm: React.FC<{ item: TestCaseType | null, vm: AnalystPageViewModel }> = observer(x => {
    const theme = useTheme();

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        description: x.item?.description ?? "",
        inputData: x.item?.inputData ?? "",
        outputData: x.item?.outputData ?? "",
        projectTitle: x.item?.projectTitle ?? ""
    });

    const generateDescription = async () => {
        if (form.title.length === 0) {
            toast.info("Для генерации описания необходимо ввести название");
        } else {
            const res = await AnalystApi.descriptionByTitle({ title: form.title });
            setForm({ ...form, description: res?.description ?? "" })
        }
    }

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
                <Stack direction="column" gap={10}>
                    <textarea style={InputFormStyles} placeholder="Введите описание" rows={3}
                        value={form.description} onChange={v => setForm({ ...form, description: v.target.value })} />
                    <SecondaryButton style={{ alignSelf: "flex-end" }} text="Сгенерировать по названию" onClick={generateDescription} />
                </Stack>
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
    const [testCases, setTestCases] = useState<{ title: string; id: number; }[]>([]);

    useEffect(() => {
        const requestData = async () => {
            await x.vm.getAllTestCases.launch();
            x.item?.id ? setTestCases(await x.vm.getTestCasesByScenario.launch(x.item.id)) : void 0;
        }
        requestData();
    }, [])

    const [form, setForm] = useState({
        title: x.item?.title ?? "",
        testCases: testCases,
        projectTitle: x.item?.projectTitle ?? ""
    })

    const state = {
        options: x.vm.allTestCases.map(v => ({ name: v.title, id: v.id })),
        selected: testCases.map(v => ({ name: v.title, id: v.id })),
    };

    const onSelect = (selectedList: Option[], selectedItem: Option) => {
        testCases.push({ id: selectedItem.id, title: selectedItem.name })
    }

    const onRemove = (selectedList: Option[], selectedItem: Option) => {
        setTestCases(testCases.filter(v => v.id != selectedItem.id))
    }

    const saveForm = () => {
        return {
            ...form,
            testCases: testCases.map(v => v.id)
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
        form.scenarios.push({ id: selectedItem.id, title: selectedItem.name, executor: null })
    }

    const onRemove = (selectedList: Option[], selectedItem: Option) => {
        form.scenarios = form.scenarios.filter(v => v.id != selectedItem.id)
    }

    const Form = () => {
        return {
            ...form,
            scenarioIds: form.scenarios.map(v => v.id)
        }
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
                <PrimaryButton text="Сохранить" onClick={() => x.item ? x.vm.saveTestPlan.launch(x.item.id, Form()) : x.vm.saveTestPlan.launch(null, Form())} />
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
                        {x.form?.testPlans.length === 0 && <StyledText>В проекте нет тест-планов</StyledText>}
                    </Stack>
                </Stack>
                <Expandee />
                <Stack direction="row" gap={20} style={{ alignSelf: "end", justifySelf: "end", position: "relative", bottom: -20, right: -35 }}>
                    <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                </Stack>
            </Stack>
        </Stack>
    )
})

export const ButtonGroup: React.FC<{ vm: AnalystPageViewModel }> = observer(x => {
    return (
        <Stack direction="row" justify="space-between">
            <StatisticsDownload />
            <PrimaryButton text="Создать тест-план" onClick={() => x.vm.select({ type: "TEST_PLAN", item: null })} />
            <PrimaryButton text="Создать сценарий" onClick={() => x.vm.select({ type: "SCENARIO", item: null })} />
            <PrimaryButton text="Создать тест-кейс" onClick={() => x.vm.select({ type: "TEST_CASE", item: null })} />
        </Stack>
    )
})

export const AnalystPage: React.FC = observer(() => {
    const vm = useMemo(() => new AnalystPageViewModel(), []);
    const treeVm = useMemo(() => new TreeComponentViewModel(), []);
    const theme = useTheme();

    const Form: React.FC = () => {
        const selected = useMemo(() => vm.selected, [vm.selected]);

        switch (selected?.type) {
            case "TEST_CASE": return <TestCaseForm item={selected.item} vm={vm} />
            case "PROJECT": return <ProjectForm form={selected.item} vm={vm} />;
            case "SCENARIO": return <ScenarioForm item={selected.item} vm={vm} />;
            case "TEST_PLAN": return <TestPlanForm item={selected.item} vm={vm} />;
            default: return null;
        }
    }

    const selectCallback = useCallback((item: Form | null) => {
        vm.select(item);
    }, [vm]);

    const canOpen: canOpen = {
        project: true,
        testPlan: true,
        scenario: true,
        testCase: true
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
                    {vm.projects?.map(v => <Projects title={v} vm={treeVm} select={selectCallback} canOpen={canOpen} />)}
                </Stack>
                <Stack direction="column" gap={30}>
                    <ButtonGroup vm={vm} />
                    {vm.selected && <Form />}
                </Stack>
            </GridContainer>
        </Page>
    )
})
