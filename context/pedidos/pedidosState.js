import {
  CONFIRMAR_ORDENAR_PLATILLO,
  ELIMINAR_PRODUCTO,
  MOSTRAR_RESUMEN,
  PEDIDO_ORDENADO,
  SELECCIONAR_PRODUCTO,
} from '../../types';
import React, {useReducer} from 'react';

import PedidosContext from './pedidosContext';
import pedidosReducer from './pedidosReducer';

const PedidoState = props => {
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idpedido: '',
  };

  const [state, dispatch] = useReducer(pedidosReducer, initialState);

  // Selecciona el producto que el usuario desea
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  // cuando el usuario confirma un platillo
  const guardarPedido = pedido => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };

  // muestra el total a pagar en el resumen
  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  // Elimina un articulo del carrito
  const eliminarProducto = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  const pedidoRealizado = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idpedido: state.idpedido,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
      }}>
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidoState;
