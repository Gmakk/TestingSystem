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

    export const ScenarioCreate = z.object({
        title: z.string(),
        testCases: z.array(z.number()),
        projectTitle: z.string()
    })

    export const Scenario = z.object({
        id: z.number(),
        title: z.string(),
        projectTitle: z.string()
    })

    export const TestCasesList = z.array(
        z.object({
            id: z.number(),
            title: z.string()
        })
    )
}