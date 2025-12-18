
import { Card, Text } from "react-native-paper"
import { TPostagem } from "../types/TPostagem";

export const Postagem = ({titulo, usuario, descricao, dataInclusao} : TPostagem) => {
    return (
        <Card>
            <Card.Title title={titulo} />
            <Card.Content>
                <Text variant="titleLarge">{titulo}</Text>
                <Text variant="bodyMedium">{descricao}</Text>
            </Card.Content>
        </Card>
    );
}   