import { Modal, Portal } from 'react-native-paper';
import { TCustomModalProps } from '../types/TComponentProps';
import { View, Text, StyleSheet } from 'react-native';

export const CustomModal = ({ titulo, visivel, children }: TCustomModalProps) => {
    return (
        <Portal>
            <Modal
                visible={visivel}
                style={{ padding: 20 }}
            >
                <View style={styles.conteiner}>
                    <View style={styles.tituloConteiner}>
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>
                    <View style={styles.conteudo}>
                        {children}
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    conteiner: { 
        backgroundColor: 'white',
    },
    tituloConteiner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'semibold',
    },
    conteudo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    }
});