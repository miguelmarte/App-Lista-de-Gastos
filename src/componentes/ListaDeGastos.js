import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elementos/Header";
import BtnRegresar from "../elementos/BtnRegresar";

const ListaDeGastos = () => {
  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
    </>
  );
};

export default ListaDeGastos;
