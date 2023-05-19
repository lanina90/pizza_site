import React, {useContext, useEffect, useState} from 'react';
import {pizzaApi} from "../API/api";
import HomeContext from "../context/HomeContext";



const Categories = () => {

  const [categories, setCategories] = useState([])
  const {categoryId, setCategoryId} = useContext(HomeContext)

  useEffect(() => {
    pizzaApi.getCategories()
      .then(res => setCategories(res.data))
  }, [setCategories])

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return <li
            onClick={() => setCategoryId(i)}
            className={categoryId === category.id ? "active" : ''}
            key={i}>
            {category.name}</li>
        })
        }
      </ul>
    </div>
  );
};

export default Categories;