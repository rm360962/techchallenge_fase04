import { View } from "react-native";
import { Conteiner } from "../../components/conteiner";
import Header from "../../components/header";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import Select from "../../components/select";
import { Option } from "react-native-paper-dropdown";
import { UsuarioService } from "../../service/usuario.service";
import { router } from "expo-router";

const CadastrarUsuario = () => {
    const [nome, setNome] = useState({ valor: '', erro: '' });
    const [email, setEmail] = useState({ valor: '', erro: '' });
    const [login, setLogin] = useState({ valor: '', erro: '' });
    const [categoriaId, setCategoriaId] = useState({ valor: '', erro: '' });
    const [senha, setSenha] = useState({ valor: '', erro: '' });
    const [cadastrando, setCadastrando] = useState(false);
    const [visivel, setVisivel] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [categorias, setCategorias] = useState([] as Option[]);
    const usuarioService = new UsuarioService();
    const regex = /^[^\s@]+@[^\s@]+\.com$/;

    useEffect(() => {
        buscarCategoriasUsuario();
    }, []);

    const cadastrarUsuario = async () => {
        const cadastroInvalido = validarCadastro();

        if (cadastroInvalido) {
            return;
        }

        setCadastrando(true);

        const { erros, usuario } = await usuarioService.cadastrarUsuario({
            nome: nome.valor,
            email: email.valor,
            login: login.valor,
            categoriaId: +categoriaId.valor,
            senha: senha.valor
        });

        if (erros) {
            let mensagemPadrao = `O seguintes erros foram encontrados ao cadastrar a postagem: `;
            const mensagemErros = erros.map(item => item.mensagem).join(', ');
            mostrarMensagem(`${mensagemPadrao}${mensagemErros}`);
            setCadastrando(false);
            return;
        }

        mostrarMensagem('Usuário cadastrado com sucesso');

        setTimeout(() => {
            setCadastrando(false);

            router.push(`/usuario/editar/${usuario.id}`);
        }, 2000);
    };

    const buscarCategoriasUsuario = async () => {
        const { erro, categorias } = await usuarioService.buscarCategoriasUsuario();

        if (erro) {
            mostrarMensagem(erro);
            return;
        }

        const opcoes: Option[] = categorias.map((item) => {
            return {
                label: item.nome,
                value: item.id.toString(),
            };
        });

        setCategorias(opcoes);
    };

    const mostrarMensagem = (mensagem: string) => {
        setMensagem(mensagem);
        setVisivel(true);
    };

    const validarCadastro = () => {
        let invalido = false;

        if (!nome.valor || nome.valor.length === 0) {
            invalido = true;
            setNome({ ...nome, erro: 'O campo nome é obrigatório' });
        }

        if (!email.valor || email.valor.length === 0) {
            invalido = true;
            setEmail({ ...email, erro: 'O campo e-mail é obrigatório' });
        }

        if (email.valor && !regex.test(email.valor)) {
            invalido = true;
            setEmail({ ...email, erro: 'E-mail informado está invalido' });
        }

        if (!login.valor || login.valor.length === 0) {
            invalido = true;
            setLogin({ ...login, erro: 'O campo login é obrigatório' });
        }

        if (!senha.valor || senha.valor.length === 0) {
            invalido = true;
            setSenha({ ...senha, erro: 'O campo senha é obrigatório' });
        }

        return invalido;
    };

    return (
        <Conteiner>
            <Header titulo="Cadastro de usuário" />
            <View style={{ width: '100%', height: '77%', padding: 20 }}>
                <Input
                    valor={nome.valor}
                    titulo="Nome"
                    placeholder="Digite o nome do usuário"
                    onChange={(valor) => { setNome({ valor: valor, erro: '' }) }}
                    erro={nome.erro != null && nome.erro.length > 0}
                    mensagemErro={nome.erro}
                    style={{ width: '100%' }}
                />
                <Input
                    valor={email.valor}
                    titulo="E-mail"
                    placeholder="Digite o e-mail do usuário"
                    onChange={(valor) => { setEmail({ valor: valor, erro: '' }) }}
                    erro={email.erro != null && email.erro.length > 0}
                    mensagemErro={email.erro}
                    style={{ width: '100%' }}
                />
                <Input
                    valor={login.valor}
                    titulo="Login"
                    placeholder="Digite o login do usuário"
                    onChange={(valor) => { setLogin({ valor: valor, erro: '' }) }}
                    erro={login.erro != null && login.erro.length > 0}
                    mensagemErro={login.erro}
                    style={{ width: '100%' }}
                />
                <Input
                    valor={senha.valor}
                    titulo="Senha"
                    placeholder="Digite o senha do usuário"
                    onChange={(valor) => { setSenha({ valor: valor, erro: '' }) }}
                    erro={senha.erro != null && senha.erro.length > 0}
                    mensagemErro={senha.erro}
                    style={{ width: '100%' }}
                    senha={true}
                />
                <Select label="Selecione a categoria do usuário"
                    valor={categoriaId.valor}
                    valores={categorias}
                    onChange={(valor: string) => { setCategoriaId({ valor: valor, erro: '' }) }}
                />
            </View>
            <View style={{ height: '10%' }}>
                <Button onClick={() => cadastrarUsuario()} carregando={cadastrando}>Gravar</Button>
            </View>
            <Snackbar
                visible={visivel}
                onDismiss={() => setVisivel(false)}
                duration={5000}
                wrapperStyle={{ bottom: 50 }}
                style={{ backgroundColor: '#333' }}
            >
                {mensagem}
            </Snackbar>
        </Conteiner>
    )
};

export default CadastrarUsuario;
