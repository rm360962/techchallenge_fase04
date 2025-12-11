import { View, Text, StyleSheet } from 'react-native';
import { Conteiner } from '../components/conteiner';
import { useState } from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const logarUsuario = () => {
        console.log('Logando usuário...');
    }
    return (
        <Conteiner>
            <View style={styles.container}>
               <View style={styles.conteinerLogin}>
                <Text style={styles.tituloApp}>Blog Educa</Text>
                <Input tipo="text" valor={usuario} onChange={() => setUsuario} titulo="Usuário" placeholder="Digite seu usuário" desabilitado={false} style={{width: '80%', marginBottom: 10}} />
                <Input tipo="password" valor={senha} onChange={setSenha} titulo="Senha" placeholder="Digite sua senha" desabilitado={false} style={{width: '80%', marginBottom: 10}} />
                <Button tipo="primary" onClick={() =>  logarUsuario()} style={{width: '80%', marginTop: 10}}>Entrar</Button>
               </View>
            </View>
        </Conteiner>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    conteinerLogin: {
        width: '90%',
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    },
    tituloApp: {
        fontSize: 24, 
        marginBottom: 20,
        fontWeight: 'semibold'   
    }
});

export default Login;