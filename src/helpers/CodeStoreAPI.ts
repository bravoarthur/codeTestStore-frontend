import qs from 'qs'
import env from 'react-dotenv'

type QType = {
    limit?: number,
    cat?: string,
    q?: string
    nextPage?: string,
}

const apiFetchGet = async (endPoint: string, query: {}) => {

    const res = await fetch(`${env.API_URL + endPoint}?${qs.stringify(query)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(async (res) => {
        const json = await res.json()
        return json.data

    }).catch(() => { return { error: 'Server is not Responding' } })

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
        return await apiFetchGet(`/api/catalogue`, { ...query })
    }
}

export default CodeStoreAPI