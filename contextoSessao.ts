import { createContext } from "react";
import { TSessao } from "./types/TSession";

export const ContextoSessao = createContext({
    sessao: {} as TSessao,
    setSessao: ((sessao : TSessao) => {}),
    usuarioPossuiPermissao: ((permissao: string) : boolean => { return false }),
});