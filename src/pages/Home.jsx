import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import axios from "axios";

const Home = () => {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortId, setSortId] = useState({
    name: 'most popular',
    sortProperty: "rating"})

  useEffect(() => {

    axios(`http://localhost:3001/pizzas?${
      categoryId > 0 ? `category=${categoryId}` : '' }&_sort=${sortId.sortProperty}&order=desc` )
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0,0)
  }, [categoryId, sortId])

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

        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : (pizzas.map(pizza => (
            <Index key={pizza.id} {...pizza}/>
          )
        ))}

      </div></>
  );
};

export default Home;