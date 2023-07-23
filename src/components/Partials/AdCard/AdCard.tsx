import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../../types/types';
import DiscountIcon from '@mui/icons-material/Discount';
import styles from './AdCard.module.scss'

function AdCard(props: ProductType) {

    const { id, image, title, vendor, variants } = props
    const price = variants[0].price
    const navigate = useNavigate()

    return (
        <Card sx={{ width: { sm: '100%', xs: '100%', md: '40%', lg: '21%', xl: '21%' }, paddingTop: '20px', maxHeight: 500, margin: 1, transition: "transform 0.5s ease", ":hover": { transform: 'scale(1.05)' } }}>
            <CardMedia
                sx={{ height: 120, objectFit: 'scale-down' }}
                component='img'
                image={image === null ? '' : image.src}
                title={title}
            />
            <CardContent sx={{ minHeight: '120px' }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight={500} fontSize={'0.9rem'}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={'0.85rem'}> {vendor}
                </Typography>
                <Typography variant="body2" color="text.primary" fontSize={'0.85rem'} fontWeight={500}> {`Price: $${price}`}
                </Typography>
                {variants[0].compare_at_price &&

                    <>
                        <Typography variant="body2" color="text.secondary" sx={{ 'textDecoration': 'line-through' }} fontSize={'0.85rem'}> {`Price: $${variants[0].compare_at_price}`}
                        </Typography>
                        <div className={styles.compareAtPrice}>
                            <Typography variant="body2" color="text.secondary" fontSize={'0.85rem'}>
                                {`${(((parseInt(variants[0].compare_at_price) / parseInt(price)) - 1) * 100).toFixed(0)}% OFF`}
                            </Typography>
                            <DiscountIcon />
                        </div>
                    </>
                }


            </CardContent>
            <CardActions >
                <Button size="small" onClick={() => navigate(`/product/${id}`)}>See more...</Button>
            </CardActions>
        </Card>
    );
}

export default AdCard