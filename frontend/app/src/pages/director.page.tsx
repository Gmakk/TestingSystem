import { useTheme } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useMemo, useCallback, useState, useEffect, useRef } from "react";
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
import { Dropdown } from "../components/dropdown.component";
import { UsersApi } from "../api/endpoints/users";
import { DirectorApi } from "../api/endpoints/director";
import { toast } from "sonner";
import axios from "axios";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 30px 50px;
    height: 88vh;
`;

export const StatisticsDownload: React.FC = () => {
    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:9091/api/statistics', {
                responseType: 'blob',
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            let filename = 'Статистика_СуТест.txt';
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition && contentDisposition.indexOf('filename') > -1) {
                const filenameMatch = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '');
                }
            }
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            console.error('Ошибка скачивания файла:', error);
            alert('Не удалось скачать файл.');
        }
    };

    return (
        <SecondaryButton text="Статистика" onClick={handleDownload} />
    );
};

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Пожалуйста, выберите файл.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:9091/api/statistics', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                toast.success("Файл успешно загружен");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error: any) {
            console.error('Ошибка загрузки файла:', error);
            toast.error("Ошибка загрузки файла");
        }
    };

    const handleChooseFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <Stack direction="row" gap={10} align="center">
            <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <SecondaryButton onClick={handleChooseFile} text="Выбрать файл" />
            {selectedFile && <StyledText>{selectedFile.name}</StyledText>}
            {selectedFile && <PrimaryButton onClick={handleUpload} text="Загрузить файл" />}
        </Stack>
    );
};

export const ScenarioAssign: React.FC<{
    allTesters: UserInfo[]
    scenario: { id: number, title: string, executor: number | null }
    assignFn: (v: Assing) => void
}> = x => {
    const [testers, setTesters] = useState<{ id: number; fullName: string; }[]>([]);
    const [selected, setSelected] = useState<number | null>(x.scenario.executor);

    useEffect(() => {
        UsersApi.getTesters().then(v => setTesters(v ?? []));
    }, [])

    const assignTester = async () => {
        if (selected) {
            try {
                await DirectorApi.assignTesterOnScenario({ testerId: selected, scenarioIds: [x.scenario.id] })
                toast.success("Успешно")
            } catch (e) {

            }
        } else {
            toast.info("Выберите тестировщика, чтобы назначить")
        }
    }

    return (
        <Stack direction="column" gap={5}>
            <StyledText size={20}>{x.scenario.title}</StyledText>
            <Stack direction="row" align="center" gap={20}>
                <Dropdown width="300px"
                    options={testers.map(v => ({ label: v.fullName, value: v.id }))}
                    label={"Выберите тестировщика"}
                    selectedValue={{ value: selected, label: testers.find(v => v.id === selected)?.fullName ?? "" }}
                    onChange={v => setSelected(v.value)} />
                <SecondaryButton text="Назначить" onClick={assignTester} />
            </Stack>
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
            {x.item.approved ?
                <Stack direction="column" gap={15}>
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
            <Expandee />
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
                        <StatisticsDownload />
                        <FileUpload />
                    </Stack>
                    {vm.selected && <TestPlanForm item={vm.selected} vm={vm} />}
                </Stack>
            </GridContainer>
        </Page>
    )
})
