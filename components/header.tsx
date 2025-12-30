import { router } from "expo-router";
import { THeaderProps } from "../types/TComponentProps";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const Header = ({ titulo, voltar }: THeaderProps) => {
    return (
        <View style={styles.conteinerPrincipal}>
            <View style={styles.conteinerHeader}>
                <View style={styles.conteinerBotao}>
                    <IconButton
                        icon="arrow-left"
                        size={30}
                        iconColor={'white'}
                        style={{ backgroundColor: '#03318C', borderRadius: 5, margin: 0 }}
                        onPress={voltar ? () => voltar() : () => router.back()}
                    />
                </View>

                <View style={styles.conteinerTitulo}>
                    <Text style={styles.tituloText}>{titulo}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    conteinerPrincipal: {
        marginTop: 10,
        overflow: 'hidden',
        paddingBottom: 5, 
        width: '100%',
    },
    conteinerHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    conteinerBotao: {
        width: '15%',
        justifyContent: 'flex-start',
        paddingLeft: 5
    },
    conteinerTitulo: {
        width: '80%',
        alignItems: 'center',
        paddingBottom: 5
    },
    tituloText: {
        fontSize: 19,
        fontWeight: 'bold' as const,
        textAlign: 'center'
    }
});

export default Header