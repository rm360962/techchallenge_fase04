import { View, Text, StyleSheet, Alert } from 'react-native';
import { Conteiner } from '../components/conteiner';
import { useContext, useState } from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { LoginService } from '../service/login.service';
import { ContextoSessao } from '../contextoSessao';
import { useRouter } from 'expo-router';

const Login = () => {
    const [usuario, setUsuario] = useState({ valor: 'Sistema', erro: ''});
    const [senha, setSenha] = useState({ valor: '12345678', erro: ''});
    const [logando, setLogando] = useState(false);
    const loginService = new LoginService();
    const contextoSessao = useContext(ContextoSessao);
    const router = useRouter();

    const logarUsuario = async () => {
        setLogando(true);
        
        const loginInvalido = validarLogin();

        if(loginInvalido) {
            return;
        }

        const { erro, tokenJwt, usuarioLogado } = await loginService.logarUsuario({
            usuario: usuario.valor,
            senha: senha.valor
        });

        setLogando(false);
        
        if(erro) {
            Alert.alert(erro);
        }

        contextoSessao.sessao = {
            usuarioLogado: usuarioLogado,
            token: tokenJwt,
        };
        
        router.replace('postagem');
    }
    
    const validarLogin = () : boolean => {
        let invalido = false;
        if(usuario.valor == null || usuario.valor.trim().length === 0) {
            setUsuario({ ...usuario, erro: 'O campo usuário é obrigatório'})
            invalido = true;
        }

        if(senha.valor == null || senha.valor.trim().length === 0) {
            setSenha({ ...senha, erro: 'O campo senha é obrigatório'})
            invalido = true;
        }

        return invalido;
    };

    return (
        <Conteiner>
            <View style={styles.container}>
               <View style={styles.conteinerLogin}>
                <Text style={styles.tituloApp}>Blog Educa</Text>
                <Input 
                    valor={usuario.valor} 
                    onChange={(valor) => setUsuario({ valor: valor, erro: ''})} 
                    titulo="Usuário" 
                    placeholder="Digite seu usuário" 
                    desabilitado={false} 
                    style={{width: '80%', marginBottom: 10}}
                    erro={usuario.erro != null && usuario.erro.length > 0}
                    mensagemErro={usuario.erro} 
                />
                <Input 
                    valor={senha.valor} 
                    onChange={(valor) => setSenha({ valor: valor, erro: ''})} 
                    titulo="Senha" 
                    placeholder="Digite sua senha" 
                    desabilitado={false} 
                    style={{width: '80%', marginBottom: 10}}
                    erro={senha.erro != null && senha.erro.length > 0}
                    mensagemErro={senha.erro}
                />
                <Button onClick={() =>  logarUsuario()} style={{width: '80%', marginTop: 10}} carregando={logando}>Entrar</Button>
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
        fontWeight: 'bold'   
    }
});

export default Login;