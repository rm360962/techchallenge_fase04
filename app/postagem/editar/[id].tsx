import { useEffect, useState } from "react";
import { Conteiner } from "../../../components/conteiner";
import { View, Dimensions } from "react-native";
import Header from "../../../components/header";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { PostagemService } from "../../../service/postagem.service";
import { Snackbar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

const EditarPostagem = () => {
    const [editando, setEditando] = useState(false);
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState({ valor: '', erro: '' });
    const [descricao, setDescricao] = useState({ valor: '', erro: '' });
    const [visivel, setVisivel] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const postagemService = new PostagemService();
    
    const { id: idPostagem } = useLocalSearchParams();
    const { height: screenHeight } = Dimensions.get('window');

    useEffect(() => {
        buscarPostagem();
    }, []);

    const buscarPostagem = async () => {
        if (idPostagem && idPostagem !== 'null') {
            const { postagem } = await postagemService.buscarPostagemPorId(+idPostagem);
            setId(postagem.id.toString());
            setTitulo({ valor: postagem.titulo, erro: ''});
            setDescricao({ valor: postagem.descricao, erro: ''});
        }
    };

    const editarPostagem = async () => {
        const edicaoInvalida = validarEdicao();

        if(edicaoInvalida) {
            return;
        }

        setEditando(true);

        const erros = await postagemService.editarPostagem({
            id: +id,
            titulo: titulo.valor,
            descricao: descricao.valor,
        });

        setEditando(false);
        
        if(erros) {
            let mensagemPadrao = `O seguintes erros foram encontrados ao editar a postagem: `;
            const mensagemErros = erros.map(item => item.mensagem).join(', ');
            mostrarMensagem(`${mensagemPadrao}${mensagemErros}`);
            return;  
        }

        mostrarMensagem('Postagem editada com sucesso');
    };

    const validarEdicao = () => {
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

    const mostrarMensagem = (texto: string) => {
        setMensagem(texto);
        setVisivel(true);
    };

    return (
        <Conteiner>
            <Header titulo="Edição de postagem" voltar={() => { router.push('postagem') }}/>
            <View style={{ width: '100%', height: '77%', padding: 20 }}>
                <Input 
                    valor={id}
                    titulo="Código"
                    onChange={() => { } }
                    desabilitado={true} 
                    placeholder={""}                
                />
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
                    style={{ width: '100%', height: screenHeight * 0.5}}
                />
            </View>
            <View style={{ height: '10%' }}>
                <Button onClick={() => editarPostagem()} carregando={editando}>Gravar</Button>
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
    );
};

export default EditarPostagem;