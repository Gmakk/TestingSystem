import { z } from "zod";

export namespace TesterModel {
    export const TestCaseSubmit = z.object({
        scenario: z.number(),
        passed: z.boolean(),
        comment: z.string()
    })
}