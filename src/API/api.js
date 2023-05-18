import axios from "axios";

let instance = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const pizzaApi = {
  getCategories() {
    return instance.get('categories')
  },
  getPizzas() {
    return instance.get('pizzas')
  }
}

