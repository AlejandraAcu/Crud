import axios from 'axios';
import { useState } from 'react'

const useCrud = (path) => {
  const [responde, setResponde] = useState();

  const BASE_URL = 'https://users-crud.academlo.tech'

  //Get => Read paso 1

  const getData = () => {
    const url = `${BASE_URL}${path}`;
    axios
    .get(url)
    .then((res) => setResponde(res.data))
    .catch((err) => console.error(err));

  }

  //Post => create paso 2
  const postData = (data) => {
    const url = `${BASE_URL}${path}`
    axios
        .post(url, data)
        .then((res) => {
            console.log(res.data)
            setResponde([...responde, res.data])
        })
        .catch((err) => console.error(err));
  };

  //delete => delete paso 3
  const deleteData = (id) => {
    const url = `${BASE_URL}${path}${id}/`
    axios
        .delete(url)
        .then ((res) => {
            console.log(res.data);
            setResponde(responde.filter(item => item.id !== id ));
        })
        .catch ((err) => console.error(err));
  }

  ///put o patch => Update paso 4
  const updateData = (id, data) =>{
    const url = `${BASE_URL}${path}${id}/`
    axios
        .patch(url, data)
        .then ((res) => {
            console.log(res.data);
            setResponde(responde.map((elem) => (elem.id === id ? res.data : elem)));
        })
        .catch ((err) => console.error(err));
  };

  return [responde, getData, postData, deleteData, updateData]
}

export default useCrud