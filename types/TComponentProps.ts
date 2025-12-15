import { ReactNode } from "react";

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
    style?: object
};

export type TButtonProps = {
    titulo?: string,
    carregando?: boolean,
    desabilitado?: boolean,
    children: ReactNode,
    onClick: () => void,
    style?: object,
};

export type TCustomModalProps = {
    titulo: string,
    visivel: boolean,
    children: ReactNode,
};