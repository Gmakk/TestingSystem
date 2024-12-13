import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { Stack } from "./Stack";
import { StyledText } from "./Text";
import ArrowIcon from "../assets/arrow.svg";

export interface Option<T> {
    label: string
    value: T
}

interface DropdownProps<T> {
    options: Option<T>[]
    label: string
    width?: string
    selectedValue: Option<T> | undefined
    onChange: (value: Option<T>) => void
    readonly?: boolean
}

const DropdownContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${p => (p.width ? p.width : "170px")};
`;

const DropdownButton = styled.button<{ width?: string }>`
    text-overflow: ellipsis;
    width: 100%;
    display: flex;
    color: ${p => p.theme.colors.text.primary};
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
    border: 1px solid ${p => p.theme.colors.secondaryBg};
    padding: 5px;
    background-color: transparent;
    width: ${p => (p.width ? p.width : "170px")};
`;

const DropdownList = styled.ul`
    &::-webkit-scrollbar{
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${p => p.theme.colors.secondaryBg};
        border-radius: 20px;
        width: 2px;
        margin-right: 15px;
    }
    &::-webkit-scrollbar-track{
        width: 4px;
    }
      position: absolute;
      width: 100%;
      background-color: ${p => p.theme.colors.containerBg};
      border: 1px solid ${p => p.theme.colors.accentBg};
      max-height: 150px;
      overflow-y: auto;
      z-index: 5;
      list-style-type: none;
      padding: 0;
      margin: 0;
`;

const DropdownListItem = styled.li`
    padding: 8px;
    font-size: 16px;
    color: ${p => p.theme.colors.text.primary};
    cursor: pointer;
`;

export const Dropdown = observer(<T,>({
    options,
    selectedValue,
    onChange,
    width,
    label,
    readonly
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleSelect = (value: Option<T>) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <Stack direction="column" gap={15}>
            {/* <StyledText weight={500}>{label}</StyledText> */}
            <DropdownContainer ref={ref} width={width}>
                <DropdownButton disabled={readonly} onClick={() => setIsOpen(!isOpen)} width={width}>
                    {options.find(option => option.value === selectedValue?.value)?.label ?? label}
                    <img src={ArrowIcon} style={{ rotate: isOpen ? "180deg" : "0deg" }} />
                </DropdownButton>
                {isOpen && (
                    <DropdownList>
                        {options.map(option => (
                            <DropdownListItem key={String(option.value)}
                                onClick={() => handleSelect(option)}>
                                {option.label}
                            </DropdownListItem>
                        ))}
                    </DropdownList>
                )}
            </DropdownContainer>
        </Stack>
    );
});
