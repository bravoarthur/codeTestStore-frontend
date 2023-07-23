import qs from 'qs'

type QType = {
    limit?: number,
    cat?: string,
    q?: string
    nextPage?: string,      
}

const BASE_API = 'http://192.168.0.3:3434'

const apiFetchGet = async (endPoint: string, query: {}) => {    
    
    const res = await fetch(`${BASE_API+endPoint}?${qs.stringify(query)}`, {
        method: 'GET',                       
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',      
        },            
    }).then( async (res) => {
        const json = await res.json()
        return json.data

    }).catch(() => {return {error: 'Server is not Responding'}})

    return res    
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
        return await apiFetchGet(`/api/catalogue`, {...query}) 
    }
}

export default CodeStoreAPI