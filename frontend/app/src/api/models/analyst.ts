import { z } from "zod";

export namespace AnalystModel {
    export const TestCaseCreate = z.object({
        title: z.string(),
        description: z.string(),
        inputData: z.string(),
        outputData: z.string(),
        projectTitle: z.string()
    })

    export const TestCase = z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        inputData: z.string(),
        outputData: z.string(),
        projectTitle: z.string()
    })
}