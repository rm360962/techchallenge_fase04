import { View, Text, StyleSheet } from "react-native";
import { TInputProps } from "../types/TComponentProps";
import { TextInput } from 'react-native-paper';
import { useState } from "react";

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
    numeroLinhas,
    senha
}: TInputProps) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    return (
        <View style={styles.wrapper}>
            <TextInput
                mode="outlined"
                dense
                value={valor}
                onChangeText={onChange}
                label={<Text style={{ fontSize: 20}}>{titulo}</Text>}
                placeholder={placeholder}
                disabled={desabilitado}
                error={erro}
                style={[{ width: '100%', backgroundColor: 'white' }, style]}
                multiline={multiplasLinhas}
                numberOfLines={numeroLinhas}
                secureTextEntry={senha && !senhaVisivel}
                right={senha && (
                    <TextInput.Icon
                        icon={senhaVisivel ? "eye" : "eye-off"}
                        onPress={() => setSenhaVisivel(!senhaVisivel)}
                    />
                )}
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