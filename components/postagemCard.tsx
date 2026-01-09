import { Card, IconButton, Text } from "react-native-paper"
import { TPostagemCardProps } from "../types/TComponentProps";

export const PostagemCard = ({
    tratarClique,
    postagem,
    editar,
    remover,
    permissaoEdicao,
    permissaoRemocao
}: TPostagemCardProps) => {
    return (
        <Card style={{ marginBottom: 10, minHeight: '25%' }} onPress={() => { tratarClique(postagem.id) }}>
            <Card.Title title={`${postagem.id} - ${postagem.titulo}`} titleStyle={{ fontWeight: 'bold'}} />
            <Card.Content>
                <Text variant="bodyLarge">{postagem.descricao.length > 83 ? `${postagem.descricao.substring(0, 80)}...` : postagem.descricao}</Text>
                <Text variant="bodyMedium" style={{ marginTop: 10 }}>Postado por {postagem.usuario.nome} as {postagem.dataInclusao}</Text>
            </Card.Content>
            <Card.Actions style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {permissaoEdicao && (
                    <IconButton
                        icon="pencil"
                        mode="contained-tonal"
                        size={30}
                        onPress={() => editar(postagem.id)}
                    />
                )}
                {permissaoRemocao && (
                    <IconButton
                        icon="delete"
                        iconColor="red"
                        mode="contained-tonal"
                        size={30}
                        onPress={() => remover(postagem.id)}
                    />
                )}
            </Card.Actions>
        </Card>
    );
};  