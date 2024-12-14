import { toast } from "sonner";
import { httpRequest } from "./http"
import { ProjectsModel } from "./models/projects"

export namespace ProjectsApi {
    export const getProjects = async () => {
        const result = await httpRequest.request(
            "GET",
            "/project/all",
            undefined,
            undefined,
            ProjectsModel.Projects,
            undefined)
        if ('error' in result) {
            toast.error('Ошибка получения списка проектов:', result.error);
        } else {
            return result;
        }
    }
}