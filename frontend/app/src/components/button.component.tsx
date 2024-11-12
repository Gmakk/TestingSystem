import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: number;
    padding?: string;
    disabled?: boolean;
    height?: string;
    width?: string;
    border?: string
}

const StyledButton = styled.button<Omit<ButtonProps, "text">>`
    background-color: ${p => p.backgroundColor ?? p.theme.colors.accentBg};
    color: ${p => p.textColor ?? p.theme.colors.text.accent};
    font-size: ${p => p.fontSize ?? "16px"};
    font-weight: ${p => p.fontWeight ?? 400};
    padding: ${p => p.padding ?? "8px 14px"};
    cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
    opacity: ${p => (p.disabled ? 0.5 : 1)};
    height: ${p => p.height ?? "auto"};
    width: ${p => p.width ?? "fit-content"};
    border: ${p => p.border ?? "1px solid transparent"};
    border-radius: 6px;
    box-shadow: 0px 1px 4px rgba(49, 49, 49, 0.25);
    outline: none;
`;

export const Button: React.FC<ButtonProps> = x => {
    return (
        <StyledButton
            onClick={x.disabled ? () => void 0 : x.onClick}
            disabled={x.disabled}
            backgroundColor={x.backgroundColor}
            textColor={x.textColor}
            fontSize={x.fontSize}
            fontWeight={x.fontWeight}
            padding={x.padding}
            border={x.border}
            width={x.width}
            height={x.height}
        >
            {x.text}
        </StyledButton>
    );
};

export const PrimaryButton: React.FC<Pick<ButtonProps, "text" | "onClick">> = x => {
    return <Button text={x.text}
        onClick={x.onClick}
        fontWeight={100} />
}

export const SecondaryButton: React.FC<Pick<ButtonProps, "text" | "onClick">> = x => {
    const theme = useTheme();
    return <Button text={x.text}
        onClick={x.onClick}
        backgroundColor="transparent"
        textColor={theme.colors.accentBg}
        border={`1px solid ${theme.colors.accentBg}`} />
}
