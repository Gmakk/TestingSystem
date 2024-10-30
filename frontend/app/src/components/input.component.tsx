import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { createContext, CSSProperties, forwardRef, InputHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MaskedInput from "react-text-mask";
import { Keyboard, KeyboardOptions } from "components/keyboard/Keyboard.tsx";
import { Typography } from "components/text.component.tsx";
import { InputStore } from "store/input.store.ts";
import { useOnClickOutside } from "utils/hooks/on-click-outside.hook.ts";
import { Mask } from "utils/input-masks.ts";

export const FocusContext = createContext<{
    isFocused: boolean
    setIsFocused(v: boolean): void
} | null>(null);

export interface InputProps {
    value?: string
    styles?: CSSProperties
    width?: number
    style?: CSSProperties
    containerStyle?: CSSProperties
    disabled?: boolean
    keyboardOptions?: KeyboardOptions
    keyBoardMask?: Mask
    dataChange: (v: string) => void
    onFocus?: () => void
    onBlur?: () => void
    placeholder?: string
    keyboardOpenOnStart?: boolean
    noKeyBoard?: boolean
    readonly?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    label?: string
    error?: boolean
}
const StyledMaskedInput = styled(MaskedInput)<{ width?: number; color?: string; error?: boolean }>`
    width: ${p => p.width ?? 200}px;
    color: ${p => (p.color ? p.color : p.theme.colors.baseColors.primaryText)};
    font-size: 16px;
    height: min-content;
    padding: 6px 8px;
    border: 1px solid ${p => (p.error ? p.theme.colors.baseColors.textError : p.theme.colors.baseColors.border)};
    ::placeholder {
        color: ${p => p.theme.colors.baseColors.placeholder};
    }
`;
const StyledInput = styled.input<{ width?: number; error?: boolean }>`
    width: ${p => p.width ?? 200}px;
    font-size: 16px;
    height: min-content;
    padding: 6px 8px;
    border: 1px solid ${p => (p.error ? p.theme.colors.baseColors.textError : p.theme.colors.baseColors.border)};
    ::placeholder {
        color: ${p => p.theme.colors.baseColors.placeholder};
    }
`;

const InputBase = observer(forwardRef<HTMLInputElement, InputProps & InputHTMLAttributes<HTMLInputElement>>(
    (x, ref) => {
        const [showKeyboard, setShowKeyboard] = useState(!!x.keyboardOpenOnStart);
        const inputStore = useMemo(() => new InputStore(x.dataChange, x.value), []);
        const keyboardRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLDivElement>(null);
        useOnClickOutside([keyboardRef], () => {
            setShowKeyboard(false);
        });
        useEffect(() => {
            const handleTouch = () => {
                inputStore.isTouchDevice = true;
            };
            inputRef.current?.addEventListener("touchstart", handleTouch);
            return () => inputRef.current?.removeEventListener("touchstart", handleTouch);
        });

        useEffect(() => {
            if (x.value !== undefined && x.value !== inputStore.data) {
                inputStore.setData(x.value);
            }
        }, [x.value]);

        if (x.readonly) return <Typography>{ x.value }</Typography>;
        if (x.keyBoardMask) inputStore.currentMask = x.keyBoardMask;

        return (
            <div onClick={e => {
                setShowKeyboard(true);
                x.onClick?.(e);
            }} ref={inputRef} style={{ ...x.containerStyle }}>
                {
                    x.label && <label>{ x.label }</label>
                }
                { x.keyBoardMask
                    ? (
                        <StyledMaskedInput {...x}
                                           guide={false}
                                           mask={x.keyBoardMask}
                                           onChange={e => {
                                               x.onChange?.(e);
                                               inputStore.setData(e.target.value);
                                           }}
                                           value={inputStore.data}
                                           ref={ref as React.Ref<MaskedInput>} />
                    )
                    : (
                        <StyledInput {...x}
                                     onChange={e => {
                                         x.onChange?.(e);
                                         inputStore.setData(e.target.value);
                                     }}
                                     value={inputStore.data}
                                     ref={ref} />
                    ) }

                { !x.noKeyBoard
                  && createPortal(
                      <div ref={keyboardRef}>
                          {
                              showKeyboard && inputStore.isTouchDevice && (
                                  <Keyboard defaults={x.keyboardOptions}
                                            ref={keyboardRef}
                                            inputStore={inputStore} />
                              )
                          }
                      </div>,
                      document.body
                  ) }
            </div>
        );
    }
));

export const Input = Object.assign(InputBase, { FocusContext });
