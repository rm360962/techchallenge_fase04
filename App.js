import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import imagemFundo from './assets/bg-ia-generated.png';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={imagemFundo} 
        resizeMode="cover" 
        style={styles.imageBackground}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1, // Faz a imagem de fundo ocupar todo o espaço do container
    justifyContent: 'center', // Alinha o conteúdo (texto) no centro vertical
    alignItems: 'center', // Alinha o conteúdo (texto) no centro horizontal
  },
});
