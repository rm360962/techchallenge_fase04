import { View, Text, StyleSheet } from "react-native";
import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';

export const Input = ({ valor, onChange, titulo, placeholder, desabilitado, style, erro, mensagemErro }: TInputProps) => {
    return (
        <View style={styles.conteiner}>
            <TextInput
                value={valor}
                onChangeText={onChange}
                label={titulo}
                placeholder={placeholder}
                disabled={desabilitado}
                style={{ width: 200, height: 55, ...style}}
            />
            {erro ? <Text style={styles.mensagemErro}>{mensagemErro}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mensagemErro: {
        fontSize: 14,
        color: 'red'
    }
});