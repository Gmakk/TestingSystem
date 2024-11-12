import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { StyledText } from "./Text";

const StyledCheckbox = styled.input`
    width: 16px;
    appearance: none;
    height: 16px;
    position: relative;
    margin: 0;
    cursor: pointer;
    background: ${p => p.theme.colors.containerBg};
    border: 1px solid ${p => p.theme.colors.secondaryBg};

    &:checked {
        background: ${p => p.theme.colors.accentBg};
        background-position-y: 0px;
        background-position-x: 0px;
        background-size: 20px;
        border: none;
    }
`;

const StyledLabel = styled.label`
    align-items: center;
    display: flex;
    gap: 12px;
`;

export const Checkbox: FC<{ checked: boolean; label?: string; onChange?: (val: boolean) => void; readonly?: boolean }> = observer(x => (
    <StyledLabel>
        <StyledCheckbox disabled={x.readonly}
                        type="checkbox"
                        onChange={e => x.onChange?.(e.target.checked)}
                        checked={x.checked} />
        <StyledText>{ x.label }</StyledText>
    </StyledLabel>
));
