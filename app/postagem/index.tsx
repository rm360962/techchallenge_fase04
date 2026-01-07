
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Conteiner } from '../../components/conteiner';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/button';
import { CustomModal } from '../../components/modal';
import { Input } from '../../components/input';
import { TBuscaPostagem, TPostagem } from '../../types/TPostagem';
import { PostagemService } from '../../service/postagem.service';
import { Avatar, IconButton, FAB, Snackbar } from 'react-native-paper';
import { PostagemCard } from '../../components/postagemCard';
import { useRouter } from 'expo-router';
import ModalConfirmacao from '../../components/modalConfirmacao';
import { TUsuario } from '../../types/TUsuario';
import { UsuarioService } from '../../service/usuario.service';
import { Option } from 'react-native-paper-dropdown';
import Select from '../../components/select';
import DateInput from '../../components/dateInput';

const Postagem = () => {
    const buscaPostagemInicial: TBuscaPostagem = {
        id: '',
        titulo: '',
        descricao: '',
        usuarioId: '',
        dataInclusaoInicio: '',
        dataInclusaoFim: ''
    };
    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [pesquisando, setPesquisando] = useState(false);
    const [filtrosBusca, setfiltrosBusca] = useState(buscaPostagemInicial);
    const [filtrosBuscaAtiva, setFiltrosBuscaAtiva] = useState(buscaPostagemInicial);
    const [titulo, setTitulo] = useState('');
    const [postagens, setPostagens] = useState([] as TPostagem[]);
    const [professores, setProfessores] = useState([] as Option[]);
    const [modalRemocao, setModalRemocao] = useState(false);
    const [removendo, setRemovendo] = useState(false);
    const [idRemocao, setIdRemocao] = useState<number | null>(null);
    const [mensagemVisivel, setMensagemVisivel] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [dataInicial, setDataInicial] = useState<Date | undefined>(undefined);
    const [dataFinal, setDataFinal] = useState<Date | undefined>(undefined);

    const postagemService = new PostagemService();
    const usuarioService = new UsuarioService();

    const router = useRouter();

    useEffect(() => {
        buscarProfessores();
        pesquisar(filtrosBusca);
    }, []);

    useEffect(() => {
        const delayBusca = setTimeout(() => {
            setFiltrosBuscaAtiva(prev => ({ ...prev, titulo }));
        }, 1000);

        return () => clearTimeout(delayBusca);
    }, [titulo]);

    useEffect(() => {
        pesquisar(filtrosBuscaAtiva);
    }, [filtrosBuscaAtiva]);

    const pesquisar = async (payload: TBuscaPostagem) => {
        setPesquisando(true);

        if(dataInicial != null) {
            payload.dataInclusaoInicio = formatarData(dataInicial);
        }

        if(dataFinal != null) {
            payload.dataInclusaoFim = formatarData(dataFinal);
        }


        const { erro, postagens: listaPostagens } =
            await postagemService.buscarPostagens(payload);

        setPesquisando(false);
        setFiltroVisivel(false);

        if (erro) {
            mostrarMensagem(erro);
            return;
        }

        setPostagens(listaPostagens);

        if (listaPostagens.length === 0) {
            mostrarMensagem('Nenhuma postagem encontrada com os filtros informados');
        }
    };

    const visualizarPostagem = (id: number) => {
        router.push({
            pathname: "postagem/visualizar/[id]",
            params: { id: id }
        });
    };

    const editarPostagem = (id: number) => {
        router.push({
            pathname: "postagem/editar/[id]",
            params: { id: id }
        });
    };

    const confirmarRemocaoPostagem = (id: number) => {
        setIdRemocao(id);
        setModalRemocao(true);
    };

    const removerPostagem = async () => {
        if (!idRemocao) return;

        setRemovendo(true);

        const postagemExcluida = await postagemService.removerPostagem(idRemocao);

        if (!postagemExcluida) {
            mostrarMensagem('Erro ao excluir a postagem, contate o adminstrador do sistema');
            return;
        }

        pesquisar(filtrosBusca);

        setRemovendo(false);
        setModalRemocao(false);

        mostrarMensagem('Postagem excluída com sucesso');
    };

    const visualizarFiltros = () => {
        setfiltrosBusca(buscaPostagemInicial);
        setDataInicial(undefined);
        setDataFinal(undefined);
        setFiltroVisivel(true);
    };

    const tituloChange = (titulo: string) => {
        setTitulo(titulo);
    };

    const mostrarMensagem = (mensagem: string) => {
        setMensagemVisivel(true);
        setMensagem(mensagem);
    };

    const formatarData = (data: Date) => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
    
        return `${ano}-${mes}-${dia}`;
    };
    const buscarProfessores = async () => {
        const { erro, usuarios } = await usuarioService.buscarProfessores();

        if (erro) {
            mostrarMensagem(erro);
            return;
        }

        const opcoes = usuarios.map((usuario) => {
            return {
                label: usuario.nome,
                value: usuario.id.toString(),
            };
        });

        setProfessores(opcoes);
    };

    return (
        <Conteiner>
            <View style={styles.header}>
                <View style={styles.conteinerTitulo}>
                    <Text style={styles.titulo}>Blog Educa</Text>
                </View>

                <View style={styles.conteinerFiltros}>
                    <View style={{ flex: 1, marginRight: 10, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%' }}>
                            <Input
                                valor={titulo}
                                placeholder='Digite o título a ser buscado'
                                titulo='Título'
                                onChange={(valor) => tituloChange(valor)}
                                style={{ height: 42, width: '100%' }}
                            />
                        </View>
                        <View style={{ width: '10%' }}>
                            <IconButton
                                icon="filter-variant"
                                iconColor="white"
                                style={{ backgroundColor: '#03318C', borderRadius: 5 }}
                                size={30}
                                onPress={() => visualizarFiltros()}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.conteinerSubtitulo}>
                <Avatar.Icon
                    size={40}
                    icon="magnify"
                    style={{ backgroundColor: 'white' }}
                    color="#03318C"
                />
                <Text style={styles.subtitulo}>Postagens encontradas</Text>
            </View>
            <ScrollView style={styles.listaScroll} contentContainerStyle={styles.listaConteudo}>
                {postagens.map((item: TPostagem) => (
                    <PostagemCard
                        key={item.id}
                        postagem={item}
                        tratarClique={visualizarPostagem}
                        visualizar={visualizarPostagem}
                        editar={editarPostagem}
                        remover={confirmarRemocaoPostagem}
                        mostrarAcoes={true}
                    />
                ))}
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                label="Novo"
                onPress={() => router.push('/postagem/cadastrar')}
                color="white"
            />
            <CustomModal titulo='Filtrar postagens' visivel={filtroVisivel}>
                <View>
                    <View>
                        <Input
                            valor={filtrosBusca.id}
                            titulo='Código'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, id: valor }) }} />
                        <Input
                            valor={filtrosBusca.descricao}
                            titulo='Descrição'
                            placeholder='Digite a descrição da postagem'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, descricao: valor }) }} />
                        <Select
                            valor={filtrosBusca.usuarioId}
                            valores={professores}
                            label='Professor'
                            onChange={(valor: string) => { setfiltrosBusca({ ...filtrosBusca, usuarioId: valor }) }} />
                        <DateInput
                            data={dataInicial}
                            label="Data inícial"
                            onChange={(data: Date) => setDataInicial(data)}
                        />
                        <DateInput
                            data={dataFinal}
                            label="Data final"
                            onChange={(data: Date) => setDataFinal(data)}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                    <Button
                        onClick={() => pesquisar(filtrosBusca)}
                        style={{ marginBottom: 5 }}
                        carregando={pesquisando}>
                        Aplicar filtros
                    </Button>
                    <Button
                        onClick={() => setFiltroVisivel(false)}
                        corSecundaria={true}
                        desabilitado={pesquisando}>
                        Voltar
                    </Button>
                </View>
            </CustomModal>
            <ModalConfirmacao
                titulo='Remover postagem'
                pergunta={`Confirma a remoção da postagem com código ${idRemocao}?`}
                acao={() => removerPostagem()}
                visivel={modalRemocao}
                setVisivel={setModalRemocao}
                carregando={removendo} />
            <Snackbar
                visible={mensagemVisivel}
                onDismiss={() => setMensagemVisivel(false)}
                duration={2000}
                wrapperStyle={{ bottom: 50 }}
                style={{ backgroundColor: '#333' }}
            >
                {mensagem}
            </Snackbar>
        </Conteiner>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 15
    },
    conteinerTitulo: {
        alignItems: 'center',
        paddingVertical: 10,
        letterSpacing: 0.5
    },
    conteinerFiltros: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        width: '100%',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    conteinerSubtitulo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: '600',
    },
    listaScroll: {
        flex: 1,
        width: '100%',
    },
    listaConteudo: {
        padding: 10,
        paddingBottom: 30
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#03318C',
    },
});

export default Postagem;