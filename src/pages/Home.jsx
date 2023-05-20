import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import AppContext from "../context/AppContext";
import HomeContext from "../context/HomeContext";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";

const Home = () => {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const {searchValue} = useContext(AppContext)


  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortId = useSelector(state => state.filter.sort.sortProperty)

  useEffect(() => {

    const order = sortId.includes('-') ? 'asc' : 'desc'
    const sortBy = sortId.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `title_like=${searchValue}` : ''

    axios(`http://localhost:3001/pizzas?${category}&_page=${currentPage}&_limit=4&_sort=${sortBy}&_order=${order}&${search}`)
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortId, searchValue, currentPage])

  const pizzasCatalog = pizzas?.map(pizza => (<PizzaBlock key={pizza.id} {...pizza}/>))

  return (
    <>
      <HomeContext.Provider value={{categoryId}}>
      <div className="content__top">
        <Categories onChangeCategory={(id)=> dispatch(setCategoryId(id))}/>
        <Sort/>
      </div>
      <h2 className="content__title">Choose your favorite pizza</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : pizzasCatalog}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
      </HomeContext.Provider>
    </>
  );
};

export default Home;