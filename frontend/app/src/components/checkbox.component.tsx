import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { StyledText } from "./Text";

const StyledCheckbox = styled.input<{ readonly: boolean }>`
    width: 29px;
    appearance: none;
    height: 29px;
    position: relative;
    cursor: ${p => (p.readonly ? "default" : "pointer")};
    margin: 0;

    &:checked {
        background: url("data:image/svg+xml,%3Csvg%20width%3D%2221%22%20height%3D%2214%22%20viewBox%3D%220%200%2021%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19.2692%201L7.21148%2013L1.73071%207.54545%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A") no-repeat #32A7F7;
        background-position-y: 8px;
        background-position-x: 5px;
        background-size: 20px;
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
                        readonly={x.readonly ?? false}
                        type="checkbox"
                        onChange={e => x.onChange?.(e.target.checked)}
                        checked={x.checked} />
        <StyledText>{ x.label }</StyledText>
    </StyledLabel>
));
