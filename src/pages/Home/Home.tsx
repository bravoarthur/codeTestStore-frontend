import styles from './Home.module.scss'
import useApi from '../../helpers/CodeStoreAPI'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import AdCard from '../../components/Partials/AdCard/AdCard';
import { CategorieListType, ProductListType } from '../../types/types';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';


function Home() {

    const api = useApi

    const [catList, setCatList] = useState([] as CategorieListType)
    const [productList, setProductList] = useState([] as ProductListType)
    const [error, setError] = useState('')

    useEffect(() => {
        const getCats = async () => {
            const cats = await api.getCategories()
            if(cats.error) {
                setError(cats.error)
                return
            }
            
            setCatList(cats) 
                     
        }
        getCats()
    }, [api])
    
    useEffect(() => {
        const getRandom = async () => {
            const randomProducts = await api.getProd({limit:8})
            if(randomProducts.error) {
                setError(randomProducts.error)
                return
            }           
            setProductList(randomProducts.productsList)
        }
        getRandom()
    }, [api])


    return (

        <div>

            {error && 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error} — <strong>check it out!</strong>
                    </Alert>
                </Stack>            
            }
            <div className={styles.searchArea}>
                <div className={styles.pageContainer}>
                    <div className={styles.searchBox}>
                        <form method="GET" action='/catalog'>
                            <input type="text" name="q" placeholder='Search on CodeStore'/>                        
                            <Button type='submit'>Search</Button>

                        </form>
                    </div>

                    <div className={styles.categoryList}>
                        {catList.map((item, index) => 
                            <Link key={index} to={`/catalog?cat=${item.id}`} className={styles.categoryItem}>
                                <img src={item.image.src} alt=''></img>
                                <span>{item.title}</span>
                            </Link>
                        )}

                    </div>



                </div>
            </div>

            <div className={styles.pageContainer}>
                <div className={styles.homeArea}>

                    <h2>Recent ads</h2>
                    <div className={styles.list}>
                        {productList.map((item, index) => 
                        <AdCard key={index} {...item  } />
                        )}
                    </div> 
                    <Link to='/catalog' className={styles.seeAllLink} >View All</Link>      

                    <hr/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae labore eius placeat! Vero, dignissimos. Architecto ad voluptatibus ut recusandae aspernatur beatae officia? Ratione voluptas accusantium iste placeat dolorum laudantium? Necessitatibus.       


                </div>

            </div>

        </div>

    );

}

export default Home;