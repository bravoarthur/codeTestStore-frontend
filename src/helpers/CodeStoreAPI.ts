import qs from 'qs'

type QType = {
    limit?: number,
    cat?: string,
    q?: string
    nextPage?: string,      
}

const BASE_API = 'http://localhost:3434'

const apiFetchGet = async (endPoint: string, query: {}) => {    
    
    const res = await fetch(`${BASE_API+endPoint}?${qs.stringify(query)}`, {
        method: 'GET',                       
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',      
        },            
    })    
    const json = await res.json()    
    console.log(json)
    return json.data    
}


const CodeStoreAPI = {

    getProducts: async () => {
        return await apiFetchGet('/api/products', {})        
    },

    getCategories: async () => {
        return await apiFetchGet('/api/categories', {}) 
    },

    getProduct: async (id: string) => {
        return await apiFetchGet(`/api/product/${id}`, {}) 
    },

    getProd: async (query: QType) => {
        console.log(query)
        return await apiFetchGet(`/api/catalogue`, {...query}) 
    }
}

export default CodeStoreAPI