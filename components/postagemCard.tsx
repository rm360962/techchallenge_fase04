import { Card, IconButton, Text } from "react-native-paper"
import { TPostagemCardProps } from "../types/TComponentProps";

export const PostagemCard = ({ tratarClique, postagem, visualizar, editar, remover, mostrarAcoes }: TPostagemCardProps) => {
    return (
        <Card style={{ marginBottom: 10, minHeight: '25%' }} onPress={() => { tratarClique(postagem.id) }}>
            <Card.Title title={`${postagem.id} - ${postagem.titulo}`} />
            <Card.Content>
                <Text variant="bodyLarge">{postagem.descricao.length > 80 ? `${postagem.descricao.substring(0, 80)}...` : ''}</Text>
                <Text variant="bodyMedium" style={{ marginTop: 10 }}>Postado por {postagem.usuario.nome} as {postagem.dataInclusao}</Text>
            </Card.Content>
            {mostrarAcoes && (
                <Card.Actions style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <IconButton
                        icon="eye"
                        mode="contained-tonal"
                        onPress={() => visualizar(postagem.id)}
                    />
                    <IconButton
                        icon="pencil"
                        mode="contained-tonal"
                        onPress={() => editar(postagem.id)}
                    />
                    <IconButton
                        icon="delete"
                        iconColor="red"
                        mode="contained-tonal"
                        onPress={() => remover(postagem.id)}
                    />
                </Card.Actions>
            )}
        </Card>
    );
};  