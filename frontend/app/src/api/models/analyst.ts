import { number, z } from "zod";

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

    export const ListItem = z.object({
        id: z.number(),
        title: z.string()
    })

    export const List = z.array(ListItem)

    export const TestPlanCreate = z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        projectTitle: z.string(),
        scenarios: z.array(ListItem)
    })

    export const TestPlan = z.object({
        id: z.number(),
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        approved: z.boolean(),
        projectTitle: z.string(),
        scenarios: z.array(ListItem)
    })

    export const Project = z.object({
        title: z.string(),
        testPlans: z.array(ListItem)
    })

    export const ByProject = z.object({
        title: z.string()
    })
}