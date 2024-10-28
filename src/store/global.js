import axios from "axios";
const apiDBTeste = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: 'http://localhost:1337',
    headers: {
        Accept: 'application/json',
        'Content-type':'application/json' 
    }
})

export default {    
    //FAZ A REQUISIÇÃO DOS PRODUTOS
    async getProdutos(){
        return await apiDBTeste.get('products?_sort=date:DESC&_start=0&_limit=100')
    },

    //FAZ A REQUISIÇÃO DOS PRODUTOS COM HILIGHT TRUE
    async getProdutosDestaque(){
        return await apiDBTeste.get('products?hilight=true&_limit=100&_sort=creatdAt:DESC')
    },
}

