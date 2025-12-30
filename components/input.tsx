import { View, Text, StyleSheet } from "react-native";
import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';

export const Input = ({ 
        valor, 
        onChange, 
        titulo, 
        placeholder, 
        desabilitado,
        style, 
        erro, 
        mensagemErro, 
        multiplasLinhas, 
        numeroLinhas 
    } : TInputProps) => {
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
                error={erro}
                style={[{ width: '100%', backgroundColor: 'white' }, style]}
                multiline={multiplasLinhas}
                numberOfLines={numeroLinhas}
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
        fontSize: 16,
        color: 'red',
        marginTop: 4,
    }
});