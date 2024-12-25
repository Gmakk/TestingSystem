import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Stack } from "../components/Stack";
import { StyledText } from "../components/Text";
import ArrowIcon from "../assets/listArrow.svg";
import { Form, TreeComponentViewModel } from "../view-models/tree.vm";

export type canOpen = {
    project: boolean
    testPlan: boolean
    scenario: boolean
    testCase: boolean
}

export const Projects: React.FC<{
    title: string,
    vm: TreeComponentViewModel,
    select: (item: Form | null) => void
    canOpen: canOpen
}> = observer(x => {
    const [isOpen, setIsOpen] = useState(false);
    const [testPlans, setTestPlans] = useState<{ id: number, title: string }[]>([])

    const openList = async () => {
        setTestPlans(await x.vm.getTestPlansByProject.launch(x.title) ?? []);
        setIsOpen(!isOpen)
    }

    const openProject = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        const data = await x.vm.getProjectByTitle.launch(x.title);

        x.select({
            type: "PROJECT",
            item: data ?? null
        })
    }

    return (
        <Stack direction="column">
            <Stack direction="row" align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} onClick={() => openList()} style={{ rotate: !isOpen ? "270deg" : "0deg", cursor: "pointer" }} />
                <StyledText size={20} onClick={e => openProject(e)} >{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {testPlans.map(v => <TestPlan id={v.id} title={v.title} vm={x.vm} project={x.title} select={x.select} canOpen={x.canOpen} />)}
            </Stack>}
        </Stack>
    )
})

export const TestPlan: React.FC<{ 
    id: number, 
    title: string, 
    vm: TreeComponentViewModel, 
    project: string
    select: (item: Form | null) => void,
    canOpen: canOpen
}> = observer(x => {
    const [isOpen, setIsOpen] = useState(false);
    const [scenarios, setScenarios] = useState<{ id: number, title: string }[]>([])

    const openList = async () => {
        setScenarios(await x.vm.getScenariosByProject.launch(x.project) ?? []);
        setIsOpen(!isOpen)
    }

    const openTestPlan = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        const data = await x.vm.getTestPlanById.launch(x.id);

        x.select({
            type: "TEST_PLAN",
            item: data ?? null
        })
    }

    return (
        <Stack direction="column">
            <Stack direction="row" align="center" gap={5} style={{ cursor: "pointer" }}>
                <img onClick={() => openList()} src={ArrowIcon} style={{ rotate: !isOpen ? "270deg" : "0deg" }} />
                <StyledText onClick={e => openTestPlan(e)} size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {scenarios.map(v => <Scenario id={v.id} title={v.title} vm={x.vm} project={x.project} select={x.select} canOpen={x.canOpen} />)}
            </Stack>}
        </Stack>
    )
})

export const Scenario: React.FC<{ 
    id: number, 
    title: string, 
    vm: TreeComponentViewModel, 
    project: string
    select: (item: Form | null) => void
    canOpen: canOpen
}> = observer(x => {
    const [isOpen, setIsOpen] = useState(false);
    const [testCases, setTestCases] = useState<{ id: number, title: string }[]>([])

    const openList = async () => {
        setTestCases(await x.vm.getTestCasesByScenario.launch(x.id) ?? []);
        setIsOpen(!isOpen)
    }

    const openScenario = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        const data = await x.vm.getScenarioById.launch(x.id);
        const testCases = x.vm.testCasesByScenario;

        x.select({
            type: "SCENARIO",
            item: data ? {
                ...data,
                testCases: testCases.map(v => v.id)
            } : null
        })
    }

    return (
        <Stack direction="column">
            <Stack direction="row" align="center" gap={5} style={{ cursor: "pointer" }}>
                <img src={ArrowIcon} onClick={() => openList()} style={{ rotate: !isOpen ? "270deg" : "0deg" }} />
                <StyledText onClick={e => openScenario(e)} size={20}>{x.title}</StyledText>
            </Stack>
            {isOpen && <Stack direction="column" gap={12} style={{ padding: "15px 0 0 25px" }}>
                {testCases.map(v => <TestCaseComponent id={v.id} title={v.title} vm={x.vm} select={x.select} canOpen={x.canOpen} />)}
            </Stack>}
        </Stack>
    )
})

const TestCaseComponent: React.FC<{ 
    id: number, 
    title: string, 
    vm: TreeComponentViewModel
    select: (item: Form | null) => void
    canOpen: canOpen
}> = observer(x => {
    const openTestCase = async () => {
        const data = await x.vm.getTestCaseById.launch(x.id);

        x.select({
            type: "TEST_CASE",
            item: data ?? null
        })
    }

    return (
        <Stack direction="row" align="center" gap={5}
            style={{ cursor: "pointer", padding: "0 0 0 25px" }}>
            <StyledText onClick={() => openTestCase()} size={20}>{x.title}</StyledText>
        </Stack>
    )
})