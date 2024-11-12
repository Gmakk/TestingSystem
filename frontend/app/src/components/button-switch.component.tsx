import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

interface ButtonSwitchProps {
    value: boolean
    toggle: () => void
    textActive: string // Текст для активной кнопки
    textInactive: string // Текст для неактивной кнопки
}

const ButtonContainer = styled.div`
    display: flex;
    background: ${p => p.theme.colors.accentBg};
    border-radius: 6px;
    padding: 3px 2px;
    gap: 10px;
`;

const Button = styled.button<{ isActive: boolean }>`
    white-space: nowrap;
  padding: 3px 34px;
    width: 100%;
  border: none;
  border-radius: 6px;
    font-size: 12pt;
  cursor: pointer;
  color: ${p => p.theme.colors.text.primary};
  background-color: ${({ isActive }) => (isActive ? p => p.theme.colors.text.secondary: "transparent")};
  transition: background-color 0.3s;
`;

const ButtonSwitch: React.FC<ButtonSwitchProps> = observer(({ value, toggle, textActive, textInactive }) => (
    <ButtonContainer>
        <Button isActive={value} onClick={toggle}>
            {textActive}
        </Button>
        <Button isActive={!value} onClick={toggle}>
            {textInactive}
        </Button>
    </ButtonContainer>
));

export default ButtonSwitch;
