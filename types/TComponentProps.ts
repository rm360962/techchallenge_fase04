import { ReactNode } from "react";
import { TPostagem } from "./TPostagem";
import { Option } from "react-native-paper-dropdown";

export type TConteinerProps = {
    children: ReactNode
};

export type TInputProps = {
    titulo: string,
    valor: string,
    placeholder: string,
    obrigatorio?: boolean,
    onChange: (texto: string) => void
    desabilitado?: boolean
    erro?: boolean,
    mensagemErro?: string,
    style?: any,
    multiplasLinhas?: boolean,
    numeroLinhas?: number,
    senha?: boolean,
};

export type TButtonProps = {
    titulo?: string,
    carregando?: boolean,
    desabilitado?: boolean,
    corSecundaria?: boolean,
    children: ReactNode,
    onClick: () => void,
    style?: object,
};

export type TCustomModalProps = {
    titulo: string,
    visivel: boolean,
    children: ReactNode,
};

export type TPostagemCardProps = {
    tratarClique: Function,
    visualizar: Function,
    editar: Function,
    remover: Function,
    postagem: TPostagem,
    mostrarAcoes: boolean
};

export type THeaderProps = {
    titulo: string,
    voltar?: Function
};

export type TModalConfirmacao = {
    titulo: string, 
    pergunta: string, 
    visivel: boolean, 
    setVisivel: Function, 
    acao: Function,
    carregando: boolean,
};

export type TSelectProps = {
    label: string,
    valor: string,
    valores: Option[],
    onChange: Function,
};