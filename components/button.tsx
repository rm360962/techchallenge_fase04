import { TButtonProps } from "../types/TComponentProps";
import {  Button as PaperButton } from 'react-native-paper';

export const Button = ({ desabilitado, onClick, style, corSecundaria, carregando, children}: TButtonProps) => {
    return (
        <PaperButton 
            disabled={desabilitado || carregando} 
            onPress={onClick} 
            style={{ ...style, backgroundColor: corSecundaria ? 'gray' : '#03318C', width: 200, justifyContent: 'center', borderRadius: 5}}
            labelStyle={{ color: 'white', fontSize: 15, fontWeight: 'semibold'}}
            loading={carregando}>
            {!carregando && children}
        </PaperButton>
    );
};