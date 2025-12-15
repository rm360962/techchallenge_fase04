import { TButtonProps } from "../types/TComponentProps";
import { Button as PaperButton } from 'react-native-paper';

export const Button = (props: TButtonProps) => {
    return (
        <PaperButton 
            disabled={props.desabilitado} 
            onPress={props.onClick} 
            style={{ ...props.style, backgroundColor: '#03318C', borderRadius: '10', width: 200}}
            labelStyle={{ color: 'white', fontSize: 15, fontWeight: 'semibold'}}>
            {props.carregando ? "Carregando..." : props.children}
        </PaperButton>
    );
};