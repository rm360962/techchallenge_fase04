import { Dropdown } from "react-native-paper-dropdown";
import { TSelectProps } from "../types/TComponentProps";

const Select = ({ label, valor, valores, onChange} : TSelectProps) => {
    return (
        <Dropdown
            mode="outlined"
            label={label}
            value={valor}
            options={valores}
            onSelect={(valor) => { onChange(valor); }} />
    );
};

export default Select;