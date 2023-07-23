import { Pagination, Stack, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdCard from '../../components/Partials/AdCard/AdCard';
import useApi from '../../helpers/CodeStoreAPI';
import { CategorieListType, ProductListType } from '../../types/types';
import styles from './Catalog.module.scss'

let timer: NodeJS.Timeout

function Catalog() {

    const api = useApi

    const navigate = useNavigate()
    const useQueryString = () => new URLSearchParams(useLocation().search)
    const queryGetter = useQueryString()

    let limit = 20
    const [prodTotal, setProdTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [previousPageUrl, setPreviousPageUrl] = useState('')
    const [pageDirection, setPageDirection] = useState(0)

    const [productsList, setProductsList] = useState([] as ProductListType)
    const [catList, setCatList] = useState([] as CategorieListType)


    const [resultOpacity, setResultOpacity] = useState(1)
    const [loading, setLoading] = useState(true)

    const [query, setQuery] = useState(queryGetter.get('q') != null ? queryGetter.get('q') as string : '')
    const [cat, setCat] = useState(queryGetter.get('cat') !=null ? queryGetter.get('cat') as string : '')

    const currentPageHandler = (item: number) => {

        if(item > currentPage) {
            setPageDirection(1)
            setCurrentPage(item)

        } else {           

            setPageDirection(-1)
            setCurrentPage(item)

        }

    }



    const getAdsList = async () => {
        setLoading(true)
                console.log(previousPageUrl)
        const data = await api.getProd({cat, nextPage: pageDirection>0 ? nextPageUrl : previousPageUrl, q:query, limit})
        console.log(data)
        setProductsList(data.productsList)
        setNextPageUrl(data.nextPageUrl)
        setPreviousPageUrl(data.previousPage)
        setProdTotal(data.total)
        setResultOpacity(1)
        setLoading(false)
    }   

    useEffect(() => {
        const getCatList = async () => {
            const catList = await  api.getCategories()
            setCatList(catList)
        }
        getCatList()
    }, [api])

    useEffect(()=> {

        let queryString = []
        if(query) {
            queryString.push(`q=${query}`)
        }
        if(cat) {
            queryString.push(`cat=${cat}`)
        }       
        navigate({search:`?${queryString.join('&')}`})

        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(getAdsList, 2000)
        setCurrentPage(1)  
        setResultOpacity(0.2)     

    }, [query, cat, query, navigate])


    useEffect(()=> {
        if(productsList.length > 0) {
            setPageCount(Math.ceil(prodTotal/limit))            
        } else {
            setPageCount(0)
        }
        
   }, [prodTotal, productsList.length, limit])


   useEffect(() => {        
        getAdsList()
    }, [currentPage])


    let pagination = []
    for(let i=1; i<=pageCount; i++) {
     pagination.push(i)
    }


    return (

        <div className={styles.pageContainer}>
            
            <div className={styles.adsArea}>

                <div className={styles.leftSide}>

                    <form method='GET'>
                        <input type='text' name='query' placeholder='Search...' value={query} onChange={(event => setQuery(event.target.value))}/>
                        <div className={styles.filterName}>Category:</div>
                        <ul>
                        <li className={cat ? `${styles.categoryItem} ` :` ${styles.categoryItem} ${styles.active}`}
                            onClick={() =>  { 
                                setCurrentPage(1)
                                setCat('')}
                                }>   
                                <span>All</span>
                            </li>
                            {catList.map((item, index) => 
                            <li key={item.id} className={cat===item.id.toString() ? `${styles.categoryItem} ${styles.active}` : styles.categoryItem}
                            onClick={() =>  { 
                                setCurrentPage(1)
                                setCat(item.id.toString())}
                                }>
                                <img src={item.image.src} alt=''/>
                                <span>{item.title}</span>
                            </li> )}
                        </ul>
                    </form>
                </div>
                <div className={styles.rightSide}>
                    <h2>Results</h2>

                    {loading &&
                        <div className={styles.listWarning}>Loading...</div>
                    }
                    {!loading && productsList.length===0 &&
                        <div className={styles.listWarning}>No Results Found.</div>
                    }

                    <div className={styles.list} style={{opacity: resultOpacity}}>
                        {productsList.map((item, index) => 
                            <AdCard key={index} {...item}/>
                        )}

                    </div>

                    <div className={styles.pagination}>
                    {((prodTotal/limit)-currentPage)< 0  ? <div className={styles.cont}>. . .</div> : ''}
                    {pagination.map ((item, index) => 
                            <div onClick={() => currentPageHandler(item)} className={item===currentPage ? `${styles.pagItem} ${styles.active}` : Math.abs(currentPage-item)>1 ? styles.hidden  : styles.pagItem} key={index} >{item}</div>
                            
                        )}
                        {Math.abs(currentPage-(prodTotal/limit))>1 ? <div className={styles.cont}>. . .</div> : ''}
                       
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default Catalog;


/*{pagination.map ((item, index) => 
                            <div onClick={() => currentPageHandler(item)} className={item===currentPage ? `${styles.pagItem} ${styles.active}` : styles.pagItem} key={index} >{item}</div>
                        )}
 */