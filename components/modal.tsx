import { Modal, Portal } from 'react-native-paper';
import { TCustomModalProps } from '../types/TComponentProps';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const CustomModal = ({ titulo, visivel, children, altura }: TCustomModalProps) => {
    return (
        <Portal>
            <Modal
                visible={visivel}
                contentContainerStyle={altura ? {...styles.modalCard, height: altura} : {...styles.modalCard, minHeight: '65%'}}
            >
                <View style={styles.tituloConteiner}>
                    <Text style={styles.titulo}>{titulo}</Text>
                </View>
                <ScrollView 
                    style={styles.scroll} 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={true}
                >
                    {children}
                </ScrollView>
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
        maxHeight: '90%'
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
    scroll: {
        flex: 1, 
    },
    scrollContent: {
        paddingBottom: 10,
    }
});