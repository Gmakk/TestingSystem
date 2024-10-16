import styled from "@emotion/styled";

export interface StackProps {
    direction: "column" | "row"
    align?: "center" | "start" | "end"
    justify?: "center" | "start" | "end" | "space-between"
}

export const Stack = styled.div<StackProps>`
    display: flex;
    flex-direction: ${p => p.direction};
    align-items: ${p => p.align ?? "stretch"};
    justify-content: ${p => p.justify ?? "stretch"};
`