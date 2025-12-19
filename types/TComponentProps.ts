import { ReactNode } from "react";
import { TPostagem } from "./TPostagem";

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
    style?: any
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
    postagem: TPostagem,
};