import { useState } from "react";
import { Conteiner } from "../../components/conteiner";
import { View, Dimensions } from "react-native";
import Header from "../../components/header";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { PostagemService } from "../../service/postagem.service";
import { Snackbar } from "react-native-paper";

const CadastrarPostagem = () => {
    const [cadastrando, setCadastrando] = useState(false);
    const [titulo, setTitulo] = useState({ valor: '', erro: '' });
    const [descricao, setDescricao] = useState({ valor: '', erro: '' });

    const [visivel, setVisivel] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const postagemService = new PostagemService();

    const { height: screenHeight } = Dimensions.get('window');

    const cadastrarPostagem = async () => {
        const cadastroInvalido = validarCadastro();

        if(cadastroInvalido) {
            return;
        }

        setCadastrando(true);

        const { postagem, erros } = await postagemService.cadastrarPostagem({
            titulo: titulo.valor,
            descricao: descricao.valor
        });

        setCadastrando(false);

        if (erros) {
            let mensagemPadrao = `O seguintes erros foram encontrados ao cadastrar a postagem: `;
            const mensagemErros = erros.map(item => item.mensagem).join(', ');
            mostrarErro(`${mensagemPadrao}${mensagemErros}`);
            return;
        }

        console.log('Cadastrando postagem');
    };

    const validarCadastro = () => {
        let invalido = false;

        if (titulo == null || titulo.valor.length === 0) {
            setTitulo({ ...titulo, erro: 'O campo título é obrigatório' });
            invalido = true;
        }

        if (descricao == null || descricao.valor.length === 0) {
            setDescricao({ ...descricao, erro: 'O campo descrição é obrigatório' });
            invalido = true;
        }

        return invalido;
    };

    const mostrarErro = (texto: string) => {
        setMensagemErro(texto);
        setVisivel(true);
    };

    return (
        <Conteiner>
            <Header titulo="Cadastro de postagem" />
            <View style={{ width: '100%', height: '77%', padding: 20 }}>
                <Input
                    valor={titulo.valor}
                    titulo="Título"
                    placeholder="Digite o título da postagem"
                    onChange={(valor) => { setTitulo({ valor: valor, erro: '' }) }}
                    erro={titulo.erro != null && titulo.erro.length > 0}
                    mensagemErro={titulo.erro}
                    style={{ width: '100%'}}
                />
                <Input
                    valor={descricao.valor}
                    titulo="Descrição"
                    placeholder="Digite a descrição da postagem"
                    onChange={(valor) => { setDescricao({ valor: valor, erro: '' }) }}
                    erro={descricao.erro != null && descricao.erro.length > 0}
                    mensagemErro={descricao.erro}
                    multiplasLinhas={true}
                    numeroLinhas={10}
                    style={{ width: '100%', height: screenHeight * 0.3}}
                />
            </View>
            <View style={{ height: '10%' }}>
                <Button onClick={() => cadastrarPostagem()} carregando={cadastrando}>Gravar</Button>
            </View>
            <Snackbar
                visible={visivel}
                onDismiss={() => setVisivel(false)}
                duration={5000} 
                wrapperStyle={{ bottom: 50 }}
                style={{ backgroundColor: '#333' }}
            >
                {mensagemErro}
            </Snackbar>
        </Conteiner>
    );
};

export default CadastrarPostagem;