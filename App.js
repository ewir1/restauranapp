/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import BotonResumen from './components/ui/BotonResumen';
import DetallePlatillo from './views/DetallePlatillo';
import FirebaseState from './context/firebase/firebaseState';
import FormularioPlatillo from './views/FormularioPlatillo';
import MenuPlatillo from './views/MenuPlatillo';
import {NavigationContainer} from '@react-navigation/native';
import NuevaOrden from './views/NuevaOrden';
import PedidoState from './context/pedidos/pedidosState';
import ProgresoPedido from './views/ProgresoPedido';
import React from 'react';
import ResumenPedido from './views/ResumenPedido';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{title: 'Nueva Orden'}}
              />
              <Stack.Screen
                name="Menu"
                component={MenuPlatillo}
                options={{
                  title: 'Nuestro Menu',
                  headerRight: props => <BotonResumen />,
                }}
              />
              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{title: 'Detalle Platillo'}}
              />
              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{title: 'Ordenar Platillo'}}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{title: 'Resumen Pedido'}}
              />
              <Stack.Screen
                name="ProgtresoPedido"
                component={ProgresoPedido}
                options={{title: 'Progreso Pedido'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
