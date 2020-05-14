import {Alert, StyleSheet} from 'react-native';
import {
  Button,
  Col,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Grid,
  Icon,
  Input,
  Text,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';

import PedidosContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const FormularioPlatillo = () => {
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {precio} = platillo;

  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantidad]);

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar);
  };

  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  const confirmarPedido = () => {
    Alert.alert(
      'Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se puede modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };
            guardarPedido(pedido);
            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => decrementarUno()}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 20}}
                value={cantidad.toString()}
                onChangeText={cantidad => guardarCantidad(cantidad)}
                keyboardType="numeric"
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => incrementarUno()}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.boton} onPress={() => confirmarPedido()}>
            <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlatillo;

const styles = StyleSheet.create({});
