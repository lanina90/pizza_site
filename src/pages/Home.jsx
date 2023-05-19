import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock";

const Home = ({searchValue}) => {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortId, setSortId] = useState({
    name: 'most popular',
    sortProperty: "rating"})

  useEffect(() => {

    const order = sortId.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortId.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `title_like=${searchValue}` : ''

    axios(`http://localhost:3001/pizzas?${category}&_sort=${sortBy}&_order=${order}&${search}` )
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0,0)
  }, [categoryId, sortId, searchValue])

  const pizzasCatalog = pizzas?.map(pizza => (<PizzaBlock key={pizza.id} {...pizza}/>))

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort
          sortId={sortId}
          onClickSort={(id) => setSortId(id)}/>
      </div>
      <h2 className="content__title">Choose your favorite pizza</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : pizzasCatalog}
      </div></>
  );
};

export default Home;