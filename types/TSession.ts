import { ReactNode } from "react";

export type TSessao = {
    usuarioLogado: TUsuarioLogado,
    token: string,
};

export type TUsuarioLogado = {
    id: number,
    login: string,
    nome: string,
    categoria: TCategoriaUsuario,
};

export type TCategoriaUsuario = {
    id: number,
    nome: string,
    permissoes: string[],
};

export type TLoginUsuario = {
    usuario: string,
    senha: string,
};

export type TRotaProtegidaProps = {
    children: ReactNode,
    permissoes: string[],
};