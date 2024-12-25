import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { FC } from "react";

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 31px;
`;

const Slider = styled.div<{ isActive: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.isActive ? props.theme.colors.accentBg : "#2b354d")};
  transition: 0.4s;
  border-radius: 18px;

  &:before {
    position: absolute;
    content: "";
    height: 27px;
    width: 27px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => (props.isActive ? "translateX(20px)" : "translateX(0)")};
  }
`;

const ToggleSwitch: FC<{ isActive: boolean; onToggle: () => void }> = observer(x => (
    <Switch onClick={x.onToggle}>
        <Slider isActive={x.isActive}></Slider>
    </Switch>
));

export default ToggleSwitch;
