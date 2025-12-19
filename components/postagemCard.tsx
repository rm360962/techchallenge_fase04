
import { Card, Text } from "react-native-paper"
import { TPostagemCardProps } from "../types/TComponentProps";

export const PostagemCard = ({ tratarClique, postagem} : TPostagemCardProps) => {
    return (
        <Card style={{ marginBottom: 10, minHeight: '25%' }} onPress={() => { tratarClique(postagem.id) }}>
            <Card.Title title={`${postagem.id} - ${postagem.titulo}`} />
            <Card.Content>
                <Text variant="bodyLarge">{postagem.descricao.length > 80 ? `${postagem.descricao.substring(0, 80)}...` : ''}</Text>
                <Text variant="bodyMedium" style={{marginTop: 10}}>Postado por {postagem.usuario.nome} as {postagem.dataInclusao}</Text>
            </Card.Content>
        </Card>
    );
};  