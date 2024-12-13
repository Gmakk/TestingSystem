import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import { StyledText } from "./Text";

export interface InputProps {
    value: string
    onChange?: (v: string) => void
    placeholder?: string
    style?: CSSProperties
    readonly?: boolean
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
        x.readonly ? <StyledText style={x.style}>{x.value}</StyledText> :
            <StyledInput value={x.value} style={x.style}
                onChange={v => x.onChange ? x.onChange(v.target.value) : void 0}
                placeholder={x.placeholder ?? "Введите значение"} />
    );
};
