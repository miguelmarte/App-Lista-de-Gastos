import React, { useState } from "react";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "./../elementos/ElementosDeFormulario";
import Boton from "../elementos/Boton";
import { ReactComponent as IconoPlus } from "./../imagenes/plus.svg";
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicket";
import agregarGasto from "../firebase/agregarGasto";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import { useAuth } from "./../contextos/AuthContext";
import Alerta from "./../elementos/Alerta";
const FormularioGasto = () => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarinputCantidad] = useState("");
  const [categoria, cambiarcategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const { usuario } = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "cantidad") {
      cambiarinputCantidad(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let cantidad = parseFloat(inputCantidad).toFixed(2);
    if (inputDescripcion !== "" && cantidad !== "" && cantidad !== "NaN") {
      if (cantidad) {
        agregarGasto({
          categoria: categoria,
          descripcion: inputDescripcion,
          cantidad: cantidad,
          fecha: getUnixTime(fecha),
          uidUsuario: usuario.uid,
        })
          .then(() => {
            cambiarcategoria("hogar");
            cambiarInputDescripcion("");
            cambiarinputCantidad("");
            cambiarFecha(new Date());
            cambiarEstadoAlerta(true);
            cambiarAlerta({
              tipo: "exito",
              mensaje: "El gasto fue Agregado Correctamente",
            });
          })
          .catch((error) => {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
              tipo: "error",
              mensaje: "Hubo un problema al intentar agregar el gasto",
            });
          });
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "El valor que ingresaste no es correcto",
        });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarcategoria={cambiarcategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          placeholder="Descripcion del gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          Agregar Gasto <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
