import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ProjectsApi } from "../api/projects";

interface TesterPageProps {

}

export const TesterPage: React.FC<TesterPageProps> = observer(() => {
    useEffect(() => {
        async function getProjects() {
            const res = await ProjectsApi.getProjects();
        }
    })
    return <>Tester Page</>
})