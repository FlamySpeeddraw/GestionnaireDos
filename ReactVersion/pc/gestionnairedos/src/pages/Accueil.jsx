import React, { useState, useEffect } from 'react';
import { getAllData, deleteData } from './../DataManager';

export const Accueil = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setData(result);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteData(id);
    const updatedData = await getAllData();
    setData(updatedData);
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.name}: {item.message}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};