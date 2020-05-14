import React, {useReducer} from 'react';

import FirebaseContext from './firebaseContext';
import {OBTENER_PRODUCTOS_EXITO} from '../../types';
import _ from 'lodash';
import firebase from '../../firebase';
import firebaseReducer from './firebaseReducer';

const FirebaseState = props => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  // Funcion para traer los productos
  const obtenerProductos = () => {
    //consulta firebase
    firebase.db
      .collection('productos')
      .where('existencia', '==', true)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Ordenar categoria con lodash
      platillos = _.sortBy(platillos, 'categoria');

      // tenemos resultados de la db
      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{menu: state.menu, firebase, obtenerProductos}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
