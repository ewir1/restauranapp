import {Alert, StyleSheet} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
} from 'native-base';
import React, {useContext, useEffect} from 'react';

import PedidosContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const ResumenPedido = () => {
  const navigation = useNavigation();
  const {
    pedido,
    total,
    mostrarResumen,
    eliminarProducto,
    pedidoRealizado,
  } = useContext(PedidosContext);

  useEffect(() => {
    calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
      mostrarResumen(nuevoTotal),
    );
  };

  // redirecciona a progreso de pedido
  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no podras cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear objeto
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };

            // escribir el pedido en firebase
            try {
              const pedido = await firebase.db
                .collection('ordenes')
                .add(pedidoObj);
              pedidoRealizado(pedido.id);
            } catch (error) {
              console.log(error);
            }
            // Redirecciona a pedido
            navigation.navigate('ProgresoPedido');
          },
        },
        {text: 'Revisar', style: 'cancel'},
      ],
    );
  };

  // Elimina un producto del arreglo
  const confirmarEliminacion = id => {
    Alert.alert(
      'Deseas eliminar este articulo',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            eliminarProducto(id);
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
        {pedido.map((platillo, i) => {
          const {cantidad, nombre, imagen, id, precio} = platillo;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: imagen}} />
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: $ {precio}</Text>
                  <Button
                    full
                    danger
                    style={{marginTop: 20}}
                    onPress={() => confirmarEliminacion(id)}>
                    <Text style={[globalStyles.botonTexto, {color: '#FFFFFF'}]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.cantidad}>Total a Pagar: ${total}</Text>
        <Button
          style={{marginTop: 30}}
          onPress={() => navigation.navigate('Menu')}
          full
          dark>
          <Text style={[globalStyles.botonTexto, {color: '#FFFFFF'}]}>
            Seguir Pidiendo
          </Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => progresoPedido()}
            full>
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;

const styles = StyleSheet.create({});
