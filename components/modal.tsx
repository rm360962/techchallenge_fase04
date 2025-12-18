import { Modal, Portal } from 'react-native-paper';
import { TCustomModalProps } from '../types/TComponentProps';
import { View, Text, StyleSheet } from 'react-native';

export const CustomModal = ({ titulo, visivel, children }: TCustomModalProps) => {
    return (
        <Portal>
            <Modal
                visible={visivel}
                contentContainerStyle={styles.modalCard}
            >
                <View style={styles.tituloConteiner}>
                    <Text style={styles.titulo}>{titulo}</Text>
                </View>
                <View style={styles.conteudo}>
                    {children}
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalCard: {
        backgroundColor: 'white',
        margin: 20,      
        padding: 20,     
        borderRadius: 10,
    },
    tituloConteiner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    conteudo: {
        alignItems: 'center',
    }
});