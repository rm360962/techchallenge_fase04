import { DatePickerInput } from "react-native-paper-dates";
import { TDateInputProps } from "../types/TComponentProps";

const DateInput = ({ data, label, onChange } : TDateInputProps) => {
    return (
        <DatePickerInput
          locale="pt"
          label={label}
          value={data}
          onChange={(data) => { onChange(data); }}
          inputMode="start"
          mode="outlined"
        />
    );
};

export default DateInput;