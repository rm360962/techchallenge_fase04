
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Conteiner } from '../components/conteiner';
import { useState } from 'react';
import { Button } from '../components/button';
import { CustomModal } from '../components/modal';
import { Input } from '../components/input';
import { TBuscaPostagem, TPostagem } from '../types/TPostagem';
import { PostagemService } from '../service/postagem.service';
import filterImage from '../assets/filter-square.svg';
import { Avatar, IconButton } from 'react-native-paper';

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
    const [filtrosPostagem, setFiltrosPostagem] = useState(buscaPostagemInicial);
    const [titulo, setTitulo] = useState('');
    const [postagens, setPostagens] = useState([] as TPostagem[]);
    const postagemService = new PostagemService();

    const pesquisar = async () => {
        console.log('pesquisando')
        const { erro, postagens: listaPostagens } =
            await postagemService.buscarPostagens(filtrosPostagem);

        console.log(listaPostagens);
        if (erro) {
            return;
        }

        if (listaPostagens.length === 0) {
            return;
        }
        console.log('setando postagens');
        setPostagens(postagens);
    };

    const tituloChange = (titulo: string) => {
        setTitulo(titulo);
    };

    return (
        <Conteiner>
            <View style={styles.header}>
                <View style={styles.conteinerTitulo}>
                    <Text style={styles.titulo}>Postagens</Text>
                </View>

                <View style={styles.conteinerFiltros}>
                    <View style={{ flex: 1, marginRight: 10, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%'}}>
                            <Input
                                valor={titulo}
                                placeholder='Digite o título a ser buscado'
                                titulo='Título'
                                onChange={(valor) => tituloChange(valor)}
                                style={{ height: 25, width: '100%' }}
                            />
                        </View>
                        <View style={{ width: '10%'}}>
                            <IconButton
                                icon="filter-variant"
                                iconColor="white"
                                style={{ backgroundColor: '#03318C', borderRadius: 5 }}
                                size={30}
                                onPress={() => setFiltroVisivel(true)}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.listaScroll} contentContainerStyle={styles.listaConteudo}>
                {postagens.map((item: TPostagem) => (
                    <Postagem key={item.id} {...item} />
                ))}
            </ScrollView>
            <CustomModal titulo='Filtrar postagens' visivel={filtroVisivel}>
                <View>
                    <View>
                        <Input
                        valor={filtrosPostagem.id}
                        titulo='Código'
                        placeholder='Digite o código da postagem'
                        onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, id: valor }) }}
                        style={{ marginBottom: 5 }} />
                    </View>
                </View>
                <View>
                    <Button onClick={() => pesquisar()}>Aplicar filtros</Button>
                    <Button onClick={() => setFiltroVisivel(false)}>Voltar</Button>
                </View>
            </CustomModal>
        </Conteiner>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: 10,
    },
    conteinerTitulo: {
        alignItems: 'center',
        paddingVertical: 10
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
    listaScroll: {
        flex: 1,
        width: '100%',
    },
    listaConteudo: {
        padding: 15,
        paddingBottom: 30
    }
});
export default Postagem;