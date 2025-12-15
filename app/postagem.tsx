
import { View, Text } from 'react-native';
import { Conteiner } from '../components/conteiner';
import { useState } from 'react';
import { Button } from '../components/button';
import { CustomModal } from '../components/modal';
import { Input } from '../components/input';
import { TBuscaPostagem } from '../types/TPostagem';

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
    const pesquisar = async () => {
        console.log(`Pesquisando com os filtros ${JSON.stringify(filtrosPostagem)}`);
    };
    return (
        <Conteiner>
            <View>
                <Text>Postagens</Text>
                <CustomModal titulo='Filtrar postagens' visivel={filtroVisivel}>
                    <View>
                        <Input
                            valor={filtrosPostagem.id}
                            titulo='Código'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, id: valor }) }}
                            style={{ marginBottom: 5}} />
                        <Input
                            valor={filtrosPostagem.titulo}
                            titulo='Título'
                            placeholder='Digite o título a ser buscado'
                            onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, titulo: valor }) }}
                            style={{ marginBottom: 5}} />
                        <Input
                            valor={filtrosPostagem.descricao}
                            titulo='Descrição'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, descricao: valor }) }} 
                            style={{ marginBottom: 5}} />
                        <Input
                            valor={filtrosPostagem.id}
                            titulo='Código'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, id: valor }) }} 
                            style={{ marginBottom: 5}} />
                        <Input
                            valor={filtrosPostagem.id}
                            titulo='Código'
                            placeholder='Digite o código da postagem'
                            onChange={(valor) => { setFiltrosPostagem({ ...filtrosPostagem, id: valor }) }} 
                            style={{ marginBottom: 5}}/>
                    </View>
                    <View>
                        <Button onClick={() => pesquisar()}>Aplicar filtros</Button>
                        <Button onClick={() => setFiltroVisivel(false)}>Voltar</Button>
                    </View>
                </CustomModal>
                <Button onClick={() => setFiltroVisivel(true)}>Teste</Button>
            </View>
            <View>

            </View>
        </Conteiner>
    );
};


export default Postagem;