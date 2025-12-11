import { StyleSheet, View, ImageBackground } from 'react-native';
import { TConteinerProps } from '../types/TComponentProps';
import imagemFundo from '../assets/bg-ia-generated.png';

export const Conteiner = (props : TConteinerProps) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagemFundo}
                resizeMode="cover"
                style={styles.imageBackground}
            >
            {props.children}     
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
