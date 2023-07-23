import styles from './ProductPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../helpers/CodeStoreAPI'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Alert, AlertTitle, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ProductType } from '../../types/types';
import DiscountIcon from '@mui/icons-material/Discount';


function ProductPage() {

    const api = useApi

    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [productInfo, setProductInfo] = useState({} as ProductType)
    const [error, setError] = useState('')



    useEffect(() => {
        const getProductInfo = async () => {
            const product = await api.getProduct(id!)
            if (product.error) {
                setError(product.error)
                setLoading(false)
                return
            }
            setProductInfo(product)
            setLoading(false)
        }
        getProductInfo()
    }, [id, api])



    return (

        <div className={styles.pageContainer}>
            {error &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error} — <strong>check it out!</strong>
                    </Alert>
                </Stack>
            }
            <div className={styles.adArea}>
                {loading && <CircularProgress />}

                <div className={styles.leftSide}>
                    <div className={styles.box}>
                        <div className={styles.adImage}>

                            {productInfo.images &&

                                productInfo.images.length
                                ?

                                <Slide>

                                    {productInfo.images.map((item, index) =>
                                        <div key={index} className={styles.eachSlide} >
                                            <img src={item.src} alt='' />
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
                                <hr />
                                <small>Category: {productInfo.product_type}</small>

                                {productInfo.variants &&

                                    <div className={styles.discount}>
                                        {productInfo.variants[0].compare_at_price &&

                                            <>
                                                <Typography variant="body2" color="text.secondary" sx={{ 'textDecoration': 'line-through' }} fontSize={'1.1rem'}> {`Price: $${productInfo.variants[0].compare_at_price}`}
                                                </Typography>
                                                <div className={styles.icon}>
                                                    <Typography variant="body2" color="text.primary" fontSize={'1rem'} marginRight='15px'>
                                                        {`${(((parseInt(productInfo.variants[0].compare_at_price) / parseInt(productInfo.variants[0].price)) - 1) * 100).toFixed(0)}% OFF`}


                                                    </Typography>
                                                    <DiscountIcon />
                                                </div>
                                            </>

                                        }
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.box + styles.boxPadding} >
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
                        <Button color='primary' variant='contained' sx={{ margin: '10px' }} >Buy Now</Button>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default ProductPage;





