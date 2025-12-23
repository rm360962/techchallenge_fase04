import { useEffect, useState } from "react";
import { TPostagem } from "../../types/TPostagem";
import { PostagemService } from "../../service/postagem.service";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Conteiner } from "../../components/conteiner";

const VisualizarPostagem = () => {
    const [postagem, setPostagem] = useState({} as TPostagem);
    const postagemService = new PostagemService();
    const { id: idPostagem } = useLocalSearchParams();

    const buscarPostagem = async () => {
        if (idPostagem && idPostagem !== 'null') {
            const { postagem } = await postagemService.buscarPostagemPorId(+idPostagem);
            setPostagem(postagem);
        }
    };

    useEffect(() => {
        buscarPostagem();
    }, []);

    return (
        <Conteiner>
            <View style={styles.shadowWrapper}>
                <View style={styles.headerContainer}>
                    <View style={styles.buttonWrapper}>
                        <IconButton
                            icon="arrow-left"
                            size={30}
                            iconColor={'white'}
                            style={{ backgroundColor: '#03318C', borderRadius: 5, margin: 0 }}
                            onPress={() => router.back()}
                        />
                    </View>

                    <View style={styles.titleWrapper}>
                        <Text style={styles.tituloText}>{postagem.titulo}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>{postagem.descricao}</Text>
            </ScrollView>
            <View>
                <Text style={{ fontWeight: 'semibold'}}>Postado por {postagem.usuario.nome} as {postagem.dataInclusao}</Text>
            </View>
        </Conteiner>
    );
};

const styles = StyleSheet.create({
    shadowWrapper: {
        marginTop: 10,
        overflow: 'hidden',
        paddingBottom: 5, 
        width: '100%',
    },
    headerContainer: {
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
    buttonWrapper: {
        width: '15%',
        justifyContent: 'flex-start',
        paddingLeft: 5
    },
    titleWrapper: {
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

export default VisualizarPostagem;