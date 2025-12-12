import { View, Text, StyleSheet } from "react-native";
import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';

export const Input = (props: TInputProps) => {
    return (
        <View style={styles.conteiner}>
            <TextInput
                value={props.valor}
                onChangeText={props.onChange}
                label={props.titulo}
                placeholder={props.placeholder}
                disabled={props.desabilitado}
                style={props.style}
            />
            {props.erro ? <Text style={styles.mensagemErro}>{props.mensagemErro}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {},
    mensagemErro: {
        fontSize: 14,
        color: 'red'
    }
});