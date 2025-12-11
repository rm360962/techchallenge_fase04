import { ReactNode } from "react";

export type TConteinerProps = {
    children: ReactNode
};

export type TInputProps = {
    tipo: string,
    titulo: string,
    valor: string,
    placeholder: string,
    obrigatorio?: boolean,
    onChange: (texto: string) => void
    desabilitado?: boolean
    style?: object
};

export type TButtonProps = {
    tipo: string,
    titulo?: string,
    carregando?: boolean,
    desabilitado?: boolean,
    children: ReactNode,
    onClick: () => void,
    style?: object,
};