import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';

export const Input = (props: TInputProps) => {
    return (
        <TextInput
        value={props.valor}
        onChangeText={props.onChange}
        label={props.titulo}
        placeholder={props.placeholder}
        disabled={props.desabilitado}
        style={props.style}
        ></TextInput>
    );
};

const styles = {
    input: {}
};