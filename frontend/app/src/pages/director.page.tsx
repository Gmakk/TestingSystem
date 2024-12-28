import { useTheme } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useMemo, useCallback, useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "../components/button.component";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { TreeComponentViewModel, Form, TestPlanType } from "../view-models/tree.vm";
import { canOpen, Projects } from "./Tree.component";
import styled from "@emotion/styled";
import { Assing, DirectorPageViewModel, UserInfo } from "../view-models/director.vm";
import { StyledText } from "../components/Text";
import { Expandee } from "../components/expandee.component";
import CloseIcon from "../assets/close.svg";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 30px 50px;
    height: 88vh;
`;

export const ScenarioAssign: React.FC<{
    allTesters: UserInfo[]
    scenario: { id: number, title: string, executor: number | null }
    assignFn: (v: Assing) => void
}> = () => {
    return (
        <Stack direction="row">

        </Stack>
    )
}

export const TestPlanForm: React.FC<{
    item: TestPlanType
    vm: DirectorPageViewModel
}> = x => {
    const theme = useTheme();
    useEffect(() => {
        x.vm.getTesters.launch();
    }, [])
    return (
        <Stack direction="column" gap={30} style={{
            background: theme.colors.containerBg, padding: "10px 40px 40px 50px",
            boxShadow: "0px 0px 20px rgba(49, 49, 49, 0.15)", height: "100%"
        }}>
            <Stack direction="column">
                <Stack direction="row">
                    <StyledText size={22} weight={600}>{x.item.title}</StyledText>
                    <Expandee />
                    <img src={CloseIcon} style={{
                        cursor: "pointer", width: "25px",
                        position: "relative", alignSelf: "end",
                        top: 0, right: -30
                    }} onClick={() => x.vm.select(null)} />
                </Stack>
                <StyledText style={{ fontSize: "18px" }}>{x.item.startDate.split("T")[0]} — {x.item.endDate.split("T")[0]}</StyledText>
            </Stack>
            <Expandee />
            {x.item.approved ?
                <Stack direction="column">
                    {x.item.scenarios.map(v =>
                        <ScenarioAssign allTesters={x.vm.allTesters}
                            scenario={v}
                            assignFn={v => x.vm.assignTester.launch(v)} />)
                    }
                </Stack> :
                <Stack direction="column" gap={30}>
                    <StyledText>Сначала необходимо утвердить тест-план</StyledText>
                    <PrimaryButton text="" onClick={() => x.vm.approveTestPlan.launch(x.item.id)} />
                </Stack>
            }
            {x.item.approved && <Stack direction="row" gap={20} justify="end">
                <SecondaryButton text="Отменить" onClick={() => x.vm.select(null)} />
                <PrimaryButton text="Сохранить" onClick={() => void 0} />
            </Stack>}
        </Stack>
    )
}

export const DirectorPage: React.FC = observer(() => {
    const vm = useMemo(() => new DirectorPageViewModel(), []);
    const treeVm = useMemo(() => new TreeComponentViewModel(), []);
    const theme = useTheme();

    const selectCallback = useCallback((item: Form | null) => {
        vm.select(item ? item.item as unknown as TestPlanType : null);
    }, [vm]);

    const canOpen: canOpen = {
        project: false,
        testPlan: true,
        scenario: false,
        testCase: false
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
                <Stack direction="column" gap={20}>
                    <Stack direction="row" gap={20}>
                        <SecondaryButton text="Статистика" />
                        <PrimaryButton text="Утвердить" />
                    </Stack>
                    {vm.selected && <TestPlanForm item={vm.selected} vm={vm} />}
                </Stack>
            </GridContainer>
        </Page>
    )
})
