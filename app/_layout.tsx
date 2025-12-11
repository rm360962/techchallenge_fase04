import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ContextoSessao } from '../contextoSessao';
import { TSessao } from '../types/TSession';

const RootLayout = () => {
    const [sessao, setSessao] = useState({} as TSessao);

    return (
        <PaperProvider>
            <ContextoSessao.Provider value={{ sessao: sessao, setSessao: setSessao }}>
                <View style={styles.container}>
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