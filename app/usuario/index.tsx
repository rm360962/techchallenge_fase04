import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Conteiner } from "../../components/conteiner";
import { Input } from "../../components/input";
import { Avatar, DataTable, FAB, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { CustomModal } from "../../components/modal";
import { TBuscaUsuario, TUsuario } from "../../types/TUsuario";
import { Button } from "../../components/button";
import { UsuarioService } from "../../service/usuario.service";
import { router } from "expo-router";
import ModalConfirmacao from "../../components/modalConfirmacao";

const Usuario = () => {
    const usuarioBuscaInicial: TBuscaUsuario = {
        id: '',
        nome: '',
        email: '',
        login: '',
        categoriaId: '',
        ativo: '',
    };
    const [nome, setNome] = useState('');
    const [filtroVisivel, setFiltroVisivel] = useState(false);
    const [filtrosBusca, setfiltrosBusca] = useState(usuarioBuscaInicial)
    const [pesquisando, setPesquisando] = useState(false);
    const [usuarios, setUsuarios] = useState([] as TUsuario[]);
    const [modalRemocao, setModalRemocao] = useState(false);
    const [removendo, setRemovendo] = useState(false);
    const [idRemocao, setIdRemocao] = useState<number | null>(null);
    const usuarioService = new UsuarioService();

    useEffect(() => {
        pesquisar(filtrosBusca);
    }, []);

    const nomeChanged = (valor: string) => {

    };

    const visualizarFiltros = () => {
        setfiltrosBusca(usuarioBuscaInicial);
        setFiltroVisivel(true);
    };

    const pesquisar = async (filtrosBusca: TBuscaUsuario) => {
        const { erro, usuarios: usuariosEncontrados } = await usuarioService.buscarUsuarios(filtrosBusca);

        if (erro) {
            return;
        }

        if (!usuariosEncontrados && usuariosEncontrados.length === 0) {
            return;
        }

        setUsuarios(usuariosEncontrados);
    };

    const editar = (id: number) => {
        router.push({
            pathname: "usuario/editar/[id]",
            params: { id: id }
        });
    };

    const confirmarRemocao = (id: number) => {
        setIdRemocao(id);
        setModalRemocao(true);
    };

    const removerUsuario = async () => {
        if(!idRemocao) return;

        const usuarioRemovido = await usuarioService.removerUsuario(idRemocao);

        pesquisar(filtrosBusca);
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
                                valor={nome}
                                placeholder='Digite o nome a ser buscado'
                                titulo='Nome'
                                onChange={(valor) => nomeChanged(valor)}
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
                <Text style={styles.subtitulo}>Usuários encontrados</Text>
            </View>
            <ScrollView horizontal>
                <DataTable style={{ width: 2000 }}>
                    <DataTable.Header>
                        <DataTable.Title>Ações</DataTable.Title>
                        <DataTable.Title>Código</DataTable.Title>
                        <DataTable.Title>Nome</DataTable.Title>
                        <DataTable.Title>E-mail</DataTable.Title>
                        <DataTable.Title>Login</DataTable.Title>
                        <DataTable.Title>Categória</DataTable.Title>
                        <DataTable.Title>Ativo</DataTable.Title>
                        <DataTable.Title>Data inclusão</DataTable.Title>
                        <DataTable.Title>Usuário inclusão</DataTable.Title>
                        <DataTable.Title>Data alteração</DataTable.Title>
                        <DataTable.Title>Usuário alteração</DataTable.Title>
                    </DataTable.Header>
                    {usuarios.map((usuario) => {
                        return (
                            <DataTable.Row key={usuario.id}>
                                <DataTable.Cell>
                                    <IconButton
                                        icon="pencil"
                                        mode="contained-tonal"
                                        onPress={() => editar(usuario.id)}
                                        style={{ marginRight: 10 }}
                                    />
                                    <IconButton
                                        icon="delete"
                                        iconColor="red"
                                        mode="contained-tonal"
                                        onPress={() => confirmarRemocao(usuario.id)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell>{usuario.id}</DataTable.Cell>
                                <DataTable.Cell>{usuario.nome}</DataTable.Cell>
                                <DataTable.Cell>{usuario.email}</DataTable.Cell>
                                <DataTable.Cell>{usuario.login}</DataTable.Cell>
                                <DataTable.Cell>{usuario?.categoria?.nome}</DataTable.Cell>
                                <DataTable.Cell>{usuario.ativo}</DataTable.Cell>
                                <DataTable.Cell>{usuario.dataInclusao}</DataTable.Cell>
                                <DataTable.Cell>{usuario.usuarioInclusao}</DataTable.Cell>
                                <DataTable.Cell>{usuario.dataAlteracao}</DataTable.Cell>
                                <DataTable.Cell>{usuario.usuarioAlteracao}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                label="Novo"
                onPress={() => router.push('/usuario/cadastrar')}
                color="white"
            />
            <CustomModal titulo='Filtrar usuários' visivel={filtroVisivel}>
                <View>
                    <View>
                        <Input
                            valor={filtrosBusca.id}
                            titulo='Código'
                            placeholder='Digite o código do usuário'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, id: valor }) }}
                            style={{ marginBottom: 5 }} />
                        <Input
                            valor={filtrosBusca.nome}
                            titulo='Descrição'
                            placeholder='Digite o nome a ser buscado'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, nome: valor }) }}
                            style={{ marginBottom: 5 }} />
                    </View>
                </View>
                <View>
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
                titulo='Remover usuário'
                pergunta='Confirma a remoção do usuário?'
                acao={() => removerUsuario()}
                visivel={modalRemocao}
                setVisivel={setModalRemocao}
                carregando={removendo} />
        </Conteiner>
    )
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#03318C',
    },
});

export default Usuario;
