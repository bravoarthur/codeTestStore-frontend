import styles from './ProductPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../helpers/CodeStoreAPI'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Button, CircularProgress } from '@mui/material';
import { ProductType } from '../../types/types';


function ProductPage() {

    const api = useApi

    const {id} = useParams()

    const [loading, setLoading] = useState(true)
    const [productInfo, setProductInfo] = useState({} as ProductType)
    
    useEffect(() => {
        const getProductInfo = async() => {
            const product = await api.getProduct(id!)
            console.log(product)
            setProductInfo(product)
            console.log(product)
            setLoading(false)
        }
        getProductInfo()
    }, [id, api])



    return (

        <div className={styles.pageContainer}>
            <div className={styles.adArea}>
                {loading && <CircularProgress/>}
                
                <div className={styles.leftSide}>
                    <div className={styles.box}>
                        <div className={styles.adImage}>

                            {productInfo.images && 

                                productInfo.images.length
                                ? 

                                <Slide>

                                {productInfo.images.map((item, index) => 
                                        <div key={index} className={styles.eachSlide} >
                                            <img src={item.src} alt=''/>
                                        </div>
                                    )}

                                </Slide> 
                                : 
                                ''
                            }
                            
                        </div>

                        <div className={styles.adInfo}>
                            <div className={styles.adName}>
                                <h2>{productInfo.title}</h2>

                                <small>Vendor: {productInfo.vendor}</small>
                            </div>
                            <div className={styles.adDescription}>
                                {productInfo.body_html}
                                <hr/>
                                <small>Category: {productInfo.product_type}</small>    

                            </div>
                        </div>                        
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.box+styles.boxPadding} >
                        {productInfo.variants && 

                            productInfo.variants.length
                                ? 
                                <div className={styles.price}>
                                Price: <span>AU ${productInfo.variants[0].price}</span> 
                                </div>
                                : 
                                ''
                        }

                    </div>

                    <div>
                        <Button>Buy Now</Button>

                        <div className={styles.createdBy+styles.box+styles.boxPadding}>
                        Created by:  
                            <strong> Info</strong>
                            <small>Info  </small>
                            <small>Info: </small>      

                        </div>
                        
                    </div>

                </div>
            </div>
        </div>

    );
}

export default ProductPage;
 




