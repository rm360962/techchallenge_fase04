import { useEffect, useState } from "react";
import { TPostagem } from "../../../types/TPostagem";
import { PostagemService } from "../../../service/postagem.service";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { Conteiner } from "../../../components/conteiner";
import Header from "../../../components/header";

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
            <Header titulo={postagem.titulo} />
            <ScrollView style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>{postagem.descricao}</Text>
            </ScrollView>
            <View>
                <Text style={{ fontWeight: 'semibold'}}>Postado por {postagem?.usuario?.nome} as {postagem.dataInclusao}</Text>
            </View>
        </Conteiner>
    );
};

export default VisualizarPostagem;