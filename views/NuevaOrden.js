import {Button, Container, Text} from 'native-base';
import {StyleSheet, View} from 'react-native';

import React from 'react';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenidoLocal]}>
        <Button
          rounded
          block
          style={globalStyles.boton}
          onPress={() => navigation.navigate('Menu')}>
          <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
        </Button>
      </View>
    </Container>
  );
};

export default NuevaOrden;

const styles = StyleSheet.create({
  contenidoLocal: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
