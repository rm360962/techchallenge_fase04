
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Conteiner } from '../components/conteiner';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { CustomModal } from '../components/modal';
import { Input } from '../components/input';
import { TBuscaPostagem, TPostagem } from '../types/TPostagem';
import { PostagemService } from '../service/postagem.service';
import { Avatar, IconButton } from 'react-native-paper';
import { PostagemCard } from '../components/postagemCard';
import { useRouter } from 'expo-router';

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
    const postagemService = new PostagemService();
    const router = useRouter();
    
    useEffect(() => {
        const delayBusca = setTimeout(() => {
            setFiltrosBuscaAtiva(prev => ({ ...prev, titulo}));
        }, 1000);

        return () => clearTimeout(delayBusca);
    }, [titulo]);

    useEffect(() => {
        pesquisar(filtrosBuscaAtiva)
    }, [filtrosBuscaAtiva]);

    useEffect(() => {
        pesquisar(filtrosBusca);
    }, []);

    const pesquisar = async (payload: TBuscaPostagem) => {
        setPesquisando(true);
        
        const { erro, postagens: listaPostagens } =
            await postagemService.buscarPostagens(payload);
        
        setPesquisando(false);
        setFiltroVisivel(false);

        if (erro) {
            return;
        }

        if (listaPostagens.length === 0) {
            return;
        }

        setPostagens(listaPostagens);
    };

    const visualizarPostagem = (id: number) => {
        router.push(`visualizar-postagem/${id}`);
    };

    const visualizarFiltros = () => {
        setfiltrosBusca(buscaPostagemInicial);
        setFiltroVisivel(true);
    };

    const tituloChange = (titulo: string) => {
        setTitulo(titulo);
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
                    style={{ backgroundColor: 'white'}}
                    color="#03318C"
                    />
                <Text style={styles.subtitulo}>Postagens encontradas</Text>
            </View>
            <ScrollView style={styles.listaScroll} contentContainerStyle={styles.listaConteudo}>
                {postagens.map((item: TPostagem) => (
                    <PostagemCard key={item.id} postagem={item} tratarClique={visualizarPostagem} />
                ))}
            </ScrollView>
            <CustomModal titulo='Filtrar postagens' visivel={filtroVisivel}>
                <View>
                    <View>
                        <Input
                            valor={filtrosBusca.id}
                            titulo='Código'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, id: valor }) }}
                            style={{ marginBottom: 5 }} />
                        <Input
                            valor={filtrosBusca.descricao}
                            titulo='Descrição'
                            placeholder='Digite a descrição da postagem'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, descricao: valor }) }}
                            style={{ marginBottom: 5 }} />
                    </View>
                </View>
                <View>
                    <Button onClick={() => pesquisar(filtrosBusca)} style={{ marginBottom: 5}} carregando={pesquisando}>Aplicar filtros</Button>
                    <Button onClick={() => setFiltroVisivel(false)} corSecundaria={true} desabilitado={pesquisando}>Voltar</Button>
                </View>
            </CustomModal>
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
    }
});
export default Postagem;