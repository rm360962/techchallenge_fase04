import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Conteiner } from "../../components/conteiner";
import { Input } from "../../components/input";
import { Avatar, DataTable, FAB, IconButton, Snackbar } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { CustomModal } from "../../components/modal";
import { TBuscaUsuario, TUsuario } from "../../types/TUsuario";
import { Button } from "../../components/button";
import { UsuarioService } from "../../service/usuario.service";
import { router } from "expo-router";
import ModalConfirmacao from "../../components/modalConfirmacao";
import { Option } from "react-native-paper-dropdown";
import Select from "../../components/select";
import { ContextoSessao } from "../../contextoSessao";

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
    const [filtrosBusca, setfiltrosBusca] = useState(usuarioBuscaInicial);
    const [filtrosBuscaAtiva, setFiltrosBuscaAtiva] = useState(usuarioBuscaInicial);
    const [pesquisando, setPesquisando] = useState(false);
    const [usuarios, setUsuarios] = useState([] as TUsuario[]);
    const [modalRemocao, setModalRemocao] = useState(false);
    const [removendo, setRemovendo] = useState(false);
    const [idRemocao, setIdRemocao] = useState<number | null>(null);
    const [categorias, setCategorias] = useState([] as Option[]);
    const [ativo, setAtivo] = useState<string | undefined>(undefined);
    const [mensagem, setMensagem] = useState("");
    const [mensagemVisivel, setMensagemVisivel] = useState(false);

    const usuarioService = new UsuarioService();
    const contexto = useContext(ContextoSessao);
    const permissaoEdicao = contexto.usuarioPossuiPermissao('editar_usuario');
    const permissaoCadastro = contexto.usuarioPossuiPermissao('cadastrar_usuario');
    const permissaoRemocao = contexto.usuarioPossuiPermissao('remover_usuario');

    const opcoesAtivo = [
        {
            label: 'Sim',
            value: '1'
        },
        {
            label: 'Não',
            value: '0'
        }
    ];

    useEffect(() => {
        pesquisar(filtrosBusca);
        buscarCategoriasUsuario();
    }, []);

    useEffect(() => {
        const delayBusca = setTimeout(() => {
            setFiltrosBuscaAtiva(prev => ({ ...prev, nome: nome }));
        }, 1000);

        return () => clearTimeout(delayBusca);
    }, [nome]);

    useEffect(() => {
        pesquisar(filtrosBuscaAtiva);
    }, [filtrosBuscaAtiva]);

    const buscarCategoriasUsuario = async () => {
        const { erro, categorias } = await usuarioService.buscarCategoriasUsuario();

        if (erro) {
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

    const visualizarFiltros = () => {
        setAtivo(undefined);
        setfiltrosBusca(usuarioBuscaInicial);
        setFiltroVisivel(true);
    };

    const pesquisar = async (filtrosBusca: TBuscaUsuario) => {
        if (ativo != null) {
            filtrosBusca.ativo = ativo === '1' ? 'true' : 'false';
        }

        setPesquisando(true);

        const { erro, usuarios: usuariosEncontrados } = await usuarioService.buscarUsuarios(filtrosBusca);

        setPesquisando(false);
        setFiltroVisivel(false);
        setUsuarios(usuariosEncontrados);

        if (erro) {
            mostrarMensagem(erro);
            return;
        }

        if (usuariosEncontrados.length === 0) {
            mostrarMensagem('Nenhum registro foi encontrado com os filtros aplicados');
        }
    };

    const editar = (id: number) => {
        router.push({
            pathname: "usuario/editar/[id]",
            params: { id: id }
        });
    };

    const mostrarMensagem = (mensagem: string) => {
        setMensagem(mensagem);
        setMensagemVisivel(true);
    };

    const confirmarRemocao = (id: number) => {
        setIdRemocao(id);
        setModalRemocao(true);
    };

    const removerUsuario = async () => {
        if (!idRemocao) return;

        setRemovendo(true);

        const usuarioRemovido = await usuarioService.removerUsuario(idRemocao);

        if (!usuarioRemovido) {
            setRemovendo(false);
            mostrarMensagem('Erro ao remover o usuário, contate o adminstrador do sistema');
            return;
        }

        setModalRemocao(false);

        pesquisar(filtrosBusca);

        setRemovendo(false);

        mostrarMensagem('Usuário removido com sucesso');
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
                                onChange={(valor) => { setNome(valor); }}
                                style={{ height: 42, width: '100%' }}
                            />
                        </View>
                        <View style={{ width: '10%' }}>
                            <View style={{ height: 7 }}></View>
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
                <ScrollView>
                    <DataTable style={{ width: 2000 }}>
                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Ações</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Código</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Nome</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>E-mail</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Login</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Categoria</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Ativo</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Data inclusão</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Usuário inclusão</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Data alteração</Text></DataTable.Title>
                            <DataTable.Title><Text style={styles.dataTableLabel}>Usuário alteração</Text></DataTable.Title>
                        </DataTable.Header>
                        {usuarios.map((usuario) => {
                            return (
                                <DataTable.Row key={usuario.id}>
                                    <DataTable.Cell>
                                        {(permissaoEdicao && usuario.ativo) && (
                                            <View style={{ marginRight: 10 }}>
                                                <IconButton
                                                    icon="pencil"
                                                    size={30}
                                                    mode="contained-tonal"
                                                    onPress={() => editar(usuario.id)}
                                                />
                                            </View>
                                        )}
                                        {(permissaoRemocao && usuario.ativo) && (
                                            <View>
                                                <IconButton
                                                    icon="delete"
                                                    size={30}
                                                    iconColor="red"
                                                    mode="contained-tonal"
                                                    onPress={() => confirmarRemocao(usuario.id)}
                                                />
                                            </View>
                                        )}
                                    </DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.id}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.nome}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.email}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.login}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.categoria?.nome}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.ativo ? 'Sim' : 'Não'}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.dataInclusao}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.usuarioInclusao}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.dataAlteracao}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.dataTableLabel}>{usuario.usuarioAlteracao}</Text></DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}
                    </DataTable>
                </ScrollView>
            </ScrollView>
            {permissaoCadastro && (
                <FAB
                    icon="plus"
                    style={styles.fab}
                    label="Novo"
                    onPress={() => router.push('/usuario/cadastrar')}
                    color="white"
                />
            )}
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
                            titulo='Nome'
                            placeholder='Digite o nome a ser buscado'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, nome: valor }) }}
                            style={{ marginBottom: 5 }} />
                        <Input
                            valor={filtrosBusca.email}
                            titulo='E-mail'
                            placeholder='Digite o e-mail a ser buscado'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, email: valor }) }}
                            style={{ marginBottom: 5 }} />
                        <Input
                            valor={filtrosBusca.login}
                            titulo='Login'
                            placeholder='Digite o login a ser buscado'
                            onChange={(valor) => { setfiltrosBusca({ ...filtrosBusca, login: valor }) }}
                            style={{ marginBottom: 5 }} />
                        <Select
                            valor={filtrosBusca.categoriaId}
                            valores={categorias}
                            label="Categoria"
                            onChange={(valor: string) => { setfiltrosBusca({ ...filtrosBusca, categoriaId: valor }); }} />
                        <Select
                            valor={ativo}
                            valores={opcoesAtivo}
                            label="Ativo"
                            onChange={(valor: string) => { setAtivo(valor); }} />
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
                titulo='Remover usuário'
                pergunta={`Confirma a remoção do usuário com código ${idRemocao}?`}
                acao={() => removerUsuario()}
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
    dataTableLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
});

export default Usuario;
