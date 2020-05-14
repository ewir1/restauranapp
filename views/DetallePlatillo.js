import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Text,
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import React, {useContext} from 'react';

import PedidosContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const DetallePlatillo = () => {
  const {platillo} = useContext(PedidosContext);
  const {nombre, imagen, descripcion, precio} = platillo;

  const navigation = useNavigation();
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyles.imagen} source={{uri: imagen}} />
              <Text style={{marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => navigation.navigate('FormularioPlatillo')}>
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetallePlatillo;

const styles = StyleSheet.create({});
