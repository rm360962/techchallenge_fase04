import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ContextoSessao } from '../contextoSessao';
import { TSessao } from '../types/TSession';
import FooterNav from '../components/footerNav';

const RootLayout = () => {
    const [sessao, setSessao] = useState({} as TSessao);
    const [visualizarNavegacao, setVisualizarNavegacao] = useState(false);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        setVisualizarNavegacao(usuarioPossuiPermissao('buscar_usuario'));
    }, [sessao]);

    const usuarioPossuiPermissao = (permissao: string) => {
        if(!sessao.usuarioLogado) return false;

        const permissaoUsuario = sessao.usuarioLogado.categoria.permissoes.find(elemento => elemento === permissao);

        return permissaoUsuario != null;
    };

    return (
        <PaperProvider>
            <ContextoSessao.Provider value={{ sessao: sessao, setSessao: setSessao, usuarioPossuiPermissao }}>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: width, height: height }}>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                            initialRouteName="login"
                        >
                            <Stack.Screen name="login" />
                            <Stack.Screen name="/postagem/index" />
                            <Stack.Screen name="/postagem/visualizar/[id]" />
                            <Stack.Screen name="/postagem/editar/[id]" />
                            <Stack.Screen name="/postagem/cadastrar"/>
                            <Stack.Screen name="/usuario/index" />
                            <Stack.Screen name="/usuario/cadastrar" />
                            <Stack.Screen name="/usuario/editar[id]" />
                        </Stack>
                    </View>
                    {visualizarNavegacao && (
                        <FooterNav />
                    )}
                </View>
            </ContextoSessao.Provider>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RootLayout;