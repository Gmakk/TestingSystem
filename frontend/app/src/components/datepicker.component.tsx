import { InputFormStyles } from "../pages/analyst.page";

export interface DatePickerProps {
    value?: Date
    onChange?: (v: Date) => void
}

export const DatePicker: React.FC<DatePickerProps> = x => {
    return (
        <input style={InputFormStyles} type="date"/>
    )
}