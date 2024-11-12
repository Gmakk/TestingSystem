import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

export interface InputProps {
    value: string
    onChange: (v: string) => void
    placeholder?: string
    style?: CSSProperties
}

const StyledInput = styled.input`
    outline: none;
    border: none;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    background: ${p => p.theme.colors.containerBg};
    padding: 10px 15px;
    font-size: 18px;
    width: 100%;
`;

export const Input: React.FC<InputProps> = x => {
    return (
        <StyledInput value={x.value} style={x.style}
            onChange={v => x.onChange(v.target.value)}
            placeholder={x.placeholder ?? "Введите значение"} />
    );
};
