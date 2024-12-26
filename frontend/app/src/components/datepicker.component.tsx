import { InputFormStyles } from "../pages/analyst.page";

export interface DatePickerProps {
    value: string
    onChange: (v: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = x => {
    const value = x.value.split("T");
    return (
        <input style={InputFormStyles} type="date" value={value[0]} onChange={v => x.onChange(v.target.value)}/>
    )
}