import React, {useEffect, useState} from 'react';
import {pizzaApi} from "../API/api";


const Categories = ({categoryId, onClickCategory}) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    pizzaApi.getCategories()
      .then(res => setCategories(res.data))
  }, [setCategories])

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return <li
            onClick={() => onClickCategory(i) }
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