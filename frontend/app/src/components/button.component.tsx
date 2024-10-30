import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { ButtonHTMLAttributes, FC } from "react";

const StyledButton = styled.button<{ width?: number }>`
    margin-top: 10px;
    width:${p => (p.width ? `${p.width}px` : "100%")};
    font-size: 16px;
`;

export const Button: FC<{ width?: number } & ButtonHTMLAttributes<HTMLButtonElement>> = observer(x => <StyledButton {...x} width={x.width} />);
