import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useState } from "react";
import { Page } from "../components/Page";
import { TestCase, TestCaseSubmit, TesterPageViewModel } from "../view-models/tester.vm";
import styled from "@emotion/styled";
import { Stack } from "../components/Stack";
import { useTheme } from "@emotion/react";
import { StyledText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import CloseIcon from "../assets/close.svg";
import { Checkbox } from "../components/checkbox.component";
import { canOpen, Projects } from "./Tree.component";
import { Form, TestCaseType, TreeComponentViewModel } from "../view-models/tree.vm";

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

const FormTestCase: React.FC<{ item: TestCase, vm: TesterPageViewModel }> = observer(x => {
    const theme = useTheme();
    const [form, setForm] = useState<TestCaseSubmit>({
        passed: false,
        comment: ""
    });

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
                        <Checkbox checked={form.passed} onChange={v => setForm({...form, passed: v })} />
                        <StyledText size={15}>Выполнено успешно</StyledText>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="column" gap={10}>
                <StyledText size={20}>Комментарий</StyledText>
                <textarea style={{ background: theme.colors.containerBg, borderRadius: "6px", padding: "10px 15px" }}
                value={form.comment} onChange={e => setForm({...form, comment: e.target.value })} />
            </Stack>
            <div style={{ alignSelf: "end" }}>
                <PrimaryButton text="Сохранить" onClick={() => x.vm.submit.launch(x.item.id, x.vm.currentScenarioId, form)} />
            </div>
        </Stack>
    )
})

export const TesterPage: React.FC = observer(() => {
    const vm = useMemo(() => new TesterPageViewModel(), []);
    const treeVm = useMemo(() => new TreeComponentViewModel(), []);
    const theme = useTheme();

    const selectCallback = useCallback((item: Form | null) => {
        vm.select(item ? item.item as unknown as TestCaseType : null);
    }, [vm]);

    const canOpen: canOpen = {
        project: false,
        testPlan: false,
        scenario: false,
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
                    {vm.projects?.map(v => <Projects title={v} vm={treeVm} select={selectCallback} canOpen={canOpen} setScenarioId={v => vm.currentScenarioId = v} />)}
                </Stack>
                <Stack direction="column" gap={20}>
                    <SecondaryButton text="Статистика" />
                    {vm.selected && <FormTestCase item={vm.selected} vm={vm} />}
                </Stack>
            </GridContainer>
        </Page>
    )
})
