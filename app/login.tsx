import { View, Text, StyleSheet } from 'react-native';

const Login = () => {
    return (
             <View style={styles.container}>
                <Text>Login</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o conteúdo da tela preencher o Stack
        backgroundColor: 'transparent', // Permite que a ImageBackground apareça
        justifyContent: 'center', // Opcional: Centraliza o texto "Login"
        alignItems: 'center',     // Opcional: Centraliza o texto "Login"
    },
});

export default Login;