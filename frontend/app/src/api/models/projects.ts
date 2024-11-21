import { z } from "zod";

export namespace ProjectsModel {
    export const Projects = z.array(z.string());
}