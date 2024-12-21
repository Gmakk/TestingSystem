import { useTheme } from "@emotion/react"
import Multiselect from "multiselect-react-dropdown"
import { InputFormStyles } from "../pages/analyst.page"

export type Option = {
    name: string
    id: number
}

export interface MultiSelectDropdownProps {
    options: Option[]
    selectedOptions: Option[]
    onSelect: (selectedList: Option[], selectedItem: Option) => void
    onRemove: (selectedList: Option[], selectedItem: Option) => void
    placeholder: string
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = x => {
    const theme = useTheme();
    return (
        <Multiselect placeholder={x.placeholder} emptyRecordMsg="Список пуст"
            style={{
                chips: {
                    background: theme.colors.accentBg
                },
                option: {
                    background: theme.colors.primaryBg,
                    color: theme.colors.accentBg
                },
                searchBox: InputFormStyles
            }}
            options={x.options}
            selectedValues={x.selectedOptions}
            onSelect={x.onSelect}
            onRemove={x.onRemove}
            displayValue="name"
        />
    )
}