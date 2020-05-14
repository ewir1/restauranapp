import {
  Body,
  Container,
  Content,
  List,
  ListItem,
  Separator,
  Text,
  Thumbnail,
} from 'native-base';
import React, {Fragment, useContext, useEffect} from 'react';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';
import {StyleSheet} from 'react-native';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const MenuPlatillo = () => {
  // Context firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  // Context pedido
  const {seleccionarPlatillo} = useContext(PedidosContext);

  // Redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  });

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFFFFF'}}>
        <List>
          {menu.map((platillo, i) => {
            const {
              imagen,
              nombre,
              descripcion,
              categoria,
              precio,
              id,
            } = platillo;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    // Eliminar algunas propiedades del platillo
                    const {existencia, ...platillo2} = platillo;
                    seleccionarPlatillo(platillo2);
                    navigation.navigate('DetallePlatillo');
                  }}>
                  <Thumbnail large square source={{uri: imagen}} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note numberOfLines={2}>
                      {descripcion}
                    </Text>
                    <Text>$ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default MenuPlatillo;

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000000',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
