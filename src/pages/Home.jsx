import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from 'qs'
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import AppContext from "../context/AppContext";
import HomeContext from "../context/HomeContext";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {searchValue} = useContext(AppContext)

  const categoryId = useSelector(state => state.filter.categoryId)
  const sortId = useSelector(state => state.filter.sort.sortProperty)
  const currentPage = useSelector(state => state.filter.currentPage)


  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortId?.includes('-') ? 'asc' : 'desc'
    const sortBy = sortId?.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `title_like=${searchValue}` : ''


    axios(`http://localhost:3001/pizzas?${category}&_page=${currentPage}&_limit=4&_sort=${sortBy}&_order=${order}&${search}`)
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
      .catch(error => {
      console.error('Error fetching pizzas:', error);
      setIsLoading(false);
    });

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
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryId, sortId, searchValue, currentPage])


  const pizzasCatalog = pizzas?.map(pizza => (<PizzaBlock key={pizza.id} {...pizza}/>))

  return (
    <>
      <HomeContext.Provider value={{categoryId}}>
        <div className="content__top">
          <Categories onChangeCategory={(id) => dispatch(setCategoryId(id))}/>
          <Sort/>
        </div>
        <h2 className="content__title">Choose your favorite pizza</h2>
        <div className="content__items">
          {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : pizzasCatalog}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </HomeContext.Provider>
    </>
  );
};

export default Home;