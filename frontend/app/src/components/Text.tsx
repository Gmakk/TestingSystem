import styled from "@emotion/styled";

export interface TextProps {
    color?: string
    bg?: string
    size?: number
    weight?: number
}

export const StyledText = styled.span<TextProps>`
    color: ${p => p.color ?? "#313131"};
    background: ${p => p.bg ?? ""};
    font-size: ${p => p.size ?? "14"}px;
    font-weight: ${p => p.weight ?? "500"};
`