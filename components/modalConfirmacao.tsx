import { View, Text } from "react-native";
import { CustomModal } from "./modal";
import { Button } from "./button";
import { TModalConfirmacao } from "../types/TComponentProps";

const ModalConfirmacao = ({ titulo, pergunta, visivel, setVisivel, acao, carregando }: TModalConfirmacao) => {
    return (
        <CustomModal titulo={titulo} visivel={visivel}>
            <View style={{ paddingBottom: 15 }}>
                <Text style={{ fontSize: 15 }}>{pergunta}</Text>
            </View>
            <View>
                <Button
                    onClick={() => acao()}
                    style={{ borderRadius: 0, marginBottom: 5 }}
                    carregando={carregando}>
                    Sim
                </Button>
                <Button
                    onClick={() => setVisivel(false)}
                    corSecundaria={true}
                    style={{ borderRadius: 0, marginBottom: 5 }}
                    desabilitado={carregando}
                >
                    Não
                </Button>
            </View>
        </CustomModal>
    )
};

export default ModalConfirmacao;