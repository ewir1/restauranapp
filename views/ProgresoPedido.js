import {Button, Container, H1, H3, Text, View} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';

import Countdown from 'react-countdown';
import PedidosContext from '../context/pedidos/pedidosContext';
import {StyleSheet} from 'react-native';
import firebase from '../firebase';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const ProgresoPedido = () => {
  const {idpedido} = useContext(PedidosContext);
  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function(doc) {
          guardarTiempo(doc.data().tiempoentrega);
          guardarCompletado(doc.data().completado);
        });
    };

    obtenerProducto();
  }, [idpedido]);

  //Muestra contdown en pantall
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds} Min.
      </Text>
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Hemos recibido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Su orden estara lista en:</Text>
            <Text>
              <Countdown
                date={Date.now() + tiempo * 6000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
          <>
            <H1 style={styles.textoCompletado}>Orden lista.</H1>
            <H3 style={styles.textoCompletado}>
              Por favor, pase a recoger su pedido.
            </H3>
            <Button
              style={[globalStyles.boton, {marginTop: 100}]}
              rounded
              block
              onPress={() => navigation.navigate('NuevaOrden')}>
              <Text style={globalStyles.botonTexto}>
                Comenzar una orden nueva
              </Text>
            </Button>
          </>
        )}
      </View>
    </Container>
  );
};

export default ProgresoPedido;

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
  textoCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
