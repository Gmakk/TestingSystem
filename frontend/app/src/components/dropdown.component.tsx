import styled from "@emotion/styled";
import ArrowDown from "assets/icons/arrow-down.svg?react";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useOnClickOutside } from "utils/hooks/on-click-outside.hook.ts";
import { Stack } from "./Stack";
import { StyledText } from "./Text";

export interface Option<T> {
    label: string
    value: T
}

interface DropdownProps<T> {
    options: Option<T>[]
    label: string
    width?: number
    selectedValue: Option<T> | undefined
    onChange: (value: Option<T>) => void
    readonly?: boolean
}

const DropdownContainer = styled.div<{ width?: number }>`
  position: relative;
    
  width:${p => (p.width ? p.width : 300)}px;
`;

const DropdownButton = styled.button`
    text-overflow: ellipsis;
    width: 100%;
    display: flex;
    color: ${p => p.theme.colors.baseColors.inputText};
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
    border: none;
    padding: 8px;
    border-radius: 6px;
    background-color: ${p => p.theme.colors.baseColors.dropdownBg};
`;

const DropdownList = styled.ul`
    &::-webkit-scrollbar{
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${p => p.theme.colors.baseColors.secondaryText};
        border-radius: 20px;
        width: 2px;
        margin-right: 15px;
    }
    &::-webkit-scrollbar-track{
        width: 4px;
    }
      position: absolute;
      width: 100%;
      background-color: ${p => p.theme.colors.baseColors.dropdownBg};
      max-height: 150px;
      overflow-y: auto;
      z-index: 999;
      list-style-type: none;
      padding: 0;
      margin: 0;
`;

const DropdownListItem = styled.li`
  padding: 8px;
    font-size: 16px;
    color: ${p => p.theme.colors.baseColors.inputText};
`;

export const Dropdown = observer(<T, >({
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
    useOnClickOutside([ref], () => setIsOpen(false));

    return (
        <Stack direction="column" gap={15}>
            <StyledText weight={500}>{ label }</StyledText>
            <DropdownContainer ref={ref} width={width}>
                <DropdownButton disabled={readonly} onClick={() => setIsOpen(!isOpen)}>
                    { options.find(option => option.value === selectedValue?.value)?.label ?? "Выберите" }
                    <ArrowDown style={{ rotate: isOpen ? "180deg" : "0deg" }} />
                </DropdownButton>
                { isOpen && (
                    <DropdownList>
                        { options.map(option => (
                            <DropdownListItem key={String(option.value)}
                                              onClick={() => handleSelect(option)}>
                                { option.label }
                            </DropdownListItem>
                        )) }
                    </DropdownList>
                ) }
            </DropdownContainer>
        </Stack>
    );
});
