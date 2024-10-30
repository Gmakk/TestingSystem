import styled from "@emotion/styled";

interface HrProps {
    color: string
    width?: string
    height?: string
}

export const Hr = styled.hr<HrProps>`
    width: ${p => p.width ?? "100%"};
    margin: 0;
    border: 0;
    border-top: ${p => `${p.height ?? "1px"} solid ${p.color}`};
`;
