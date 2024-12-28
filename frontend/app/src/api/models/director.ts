import { z } from "zod";

export namespace DirectorModel {
    export const ApproveTestPlans = z.object({
        testPlanIds: z.array(z.number())
    })

    export const AssignTester = z.object({
        testerId: z.number(),
        scenarioIds: z.array(z.number())
    })
}