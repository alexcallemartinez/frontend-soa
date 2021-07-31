import { URL_BACKEND } from '../environments/environments' ;


export const getProducto = async () => {
    const peticion = await fetch(`${URL_BACKEND}/producto`);
    const data = await peticion.json();
    return data;

}

export const getProductoById = async id => {
  const peticion = await fetch(`${URL_BACKEND}/producto/${id}`);
  const data = await peticion.json();
  return data;

}

export const postProducto = async (objProducto) => {
    const peticion = await fetch(`${URL_BACKEND}/producto`, {
        method: "POST",
        body: JSON.stringify(objProducto),
        headers: {
            "Content-type": "application/json"
        }

    });
    const data = await peticion.json();
    return data;
}

export const putProducto = async (objProducto) => {
    const peticion = await fetch(`${URL_BACKEND}/producto/${objProducto.productoId}`, 
    {
      method: "PUT",
      body: JSON.stringify(objProducto),
      headers: {
        "Content-type": "application/json"
      },
    });
    const data = await peticion.json();
    return data;
  }

  export const deleteProducto = async pro_id => {
    const peticion = await fetch(`${URL_BACKEND}/producto/${pro_id}`, {
      method: "DELETE"
    });
    const data = await peticion.json();
    return data;
  }