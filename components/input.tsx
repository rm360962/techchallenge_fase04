import { View, Text, StyleSheet } from "react-native";
import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';

export const Input = ({ valor, onChange, titulo, placeholder, desabilitado, style, erro, mensagemErro }: TInputProps) => {
    return (
        <View style={styles.wrapper}>
            <TextInput
                mode="outlined"
                dense
                value={valor}
                onChangeText={onChange}
                label={titulo}
                placeholder={placeholder}
                disabled={desabilitado}
                style={[{ width: '100%', backgroundColor: 'white' }, style]}
            />
            {erro ? <Text style={styles.mensagemErro}>{mensagemErro}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center'
    },
    mensagemErro: {
        fontSize: 12,
        color: 'red',
        marginTop: 4,
    }
});