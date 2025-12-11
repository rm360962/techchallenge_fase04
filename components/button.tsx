import { TButtonProps } from "../types/TComponentProps";
import { Button as PaperButton } from 'react-native-paper';

export const Button = (props: TButtonProps) => {
    return (
        <PaperButton disabled={props.desabilitado} onPress={props.onClick} style={props.style}>
            {props.carregando ? "Carregando..." : props.children}
        </PaperButton>
    )
};