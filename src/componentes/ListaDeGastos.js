import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elementos/Header";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import UseObtenerGastos from "../hooks/useObtenerGastos";
import {
  Lista,
  ElementoLista,
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from "../elementos/ElementosDeLista";
const ListaDeGastos = () => {
  const [gastos] = UseObtenerGastos();
  //console.log(gastos);
  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
      <Lista>
        {gastos.map((gasto) => {
          return (
            <ElementoLista key={gasto.id}>{gasto.descripcion}</ElementoLista>
          );
        })}
      </Lista>
      <BarraTotalGastado />
    </>
  );
};

export default ListaDeGastos;
