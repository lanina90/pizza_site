import React, {useContext, useEffect, useState} from 'react';
import {pizzaApi} from "../API/api";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";


const Categories = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])

  const categoryId = useSelector(state => state.filter.categoryId)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  useEffect(() => {
    pizzaApi.getCategories()
      .then(res => setCategories(res.data))
  }, [setCategories])

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return <li
            onClick={() => onChangeCategory(i)}
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