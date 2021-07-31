import { URL_BACKEND } from '../environments/environments' ;


export const getPedido = async () => {
    const peticion = await fetch(`${URL_BACKEND}/pedido`);
    const data = await peticion.json();
    return data;

}

export const getPedidoById = async id => {
  const peticion = await fetch(`${URL_BACKEND}/pedido/${id}`);
  const data = await peticion.json();
  return data;

}

export const postPedido = async (objPedido) => {
    const peticion = await fetch(`${URL_BACKEND}/pedido`, {
        method: "POST",
        body: JSON.stringify(objPedido),
        headers: {
            "Content-type": "application/json"
        }

    });
    const data = await peticion.json();
    return data;
}

export const putPedido = async (objPedido) => {
    const peticion = await fetch(`${URL_BACKEND}/pedido/${objPedido.pedidoId}`, 
    {
      method: "PUT",
      body: JSON.stringify(objPedido),
      headers: {
        "Content-type": "application/json"
      },
    });
    const data = await peticion.json();
    return data;
  }

  export const deletePedido = async ped_id => {
    const peticion = await fetch(`${URL_BACKEND}/pedido/${ped_id}`, {
      method: "DELETE"
    });
    const data = await peticion.json();
    return data;
  }