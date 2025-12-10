import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ContextoSessao } from '../contextoSessao';
import { TSessao } from '../types/TSession';
import imagemFundo from '../assets/bg-ia-generated.png';

const RootLayout = () => {
    const [sessao, setSessao] = useState({} as TSessao);

    return (
        <PaperProvider>
            <ContextoSessao.Provider value={{ sessao: sessao, setSessao: setSessao }}>
                <View style={styles.container}>
                    <ImageBackground
                        source={imagemFundo}
                        resizeMode="cover"
                        style={styles.imageBackground}
                    >
                        <View style={{ flex: 1, width: '100%' }}>
                            <Stack
                                screenOptions={{
                                    headerShown: false,
                                }}
                                initialRouteName="login"
                            >
                                <Stack.Screen name="login" />
                                <Stack.Screen
                                    name="postagem"
                                    options={{
                                        headerShown: true,
                                        title: 'Nova Postagem'
                                    }}
                                />
                            </Stack>
                        </View>
                    </ImageBackground>
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