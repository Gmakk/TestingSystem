import { InputFormStyles } from "../pages/analyst.page";

export interface DatePickerProps {
    value: string
    onChange: (v: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = x => {
    return (
        <input style={InputFormStyles} type="date" value={x.value} onChange={v => x.onChange(v.target.value)}/>
    )
}