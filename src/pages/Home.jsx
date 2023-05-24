import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from 'qs'
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";

import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const searchValue = useSelector(state => state.filter.searchValue)
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortId = useSelector(state => state.filter.sort.sortProperty)
  const currentPage = useSelector(state => state.filter.currentPage)

  const {pizzas, status} = useSelector(state => state.pizzas)


  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {

    const order = sortId?.includes('-') ? 'asc' : 'desc'
    const sortBy = sortId?.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `title_like=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        order, sortBy, category, search, currentPage
      }))

    window.scrollTo(0, 0)
  }
  //если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortId, currentPage])

  // //если был первый ендер то проверяем URL - параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(obj => obj.sortProperty === params.sortId)
      dispatch(setFilters({...params, sort}))
    }
    isSearch.current = false
  }, [])


  //если был первый рендер то запрашиваем пиццы
  useEffect(() => {

    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sortId, searchValue, currentPage])


  const pizzasCatalog = pizzas?.map(pizza => <Link key={pizza.id} to={`/pizza/${pizza.id}`}><PizzaBlock {...pizza}/></Link>)

  return (
    <>
        <div className="content__top">
          <Categories/>
          <Sort/>
        </div>
        <h2 className="content__title">Choose your favorite pizza</h2>
        {status === 'error' ? (<div><h2>Oops....something went wrong</h2></div>) : (<div className="content__items">
          {status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : pizzasCatalog}
        </div>)}

        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  );
};

export default Home;