import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../../types/types';






function AdCard(props:  ProductType) {

    const {id, image, title, vendor, variants} = props

    const price = variants[0].price

    const navigate = useNavigate()

    


    return (
        <Card sx={{ width: '21%', maxHeight: 500, margin: 1, transition: "transform 0.5s ease",":hover": {transform: 'scale(1.05)'}}}>
            <CardMedia
                sx={{ height: 130, objectFit:'scale-down' }}
                component='img'
                image={image===null? '' : image.src}
                title={title}
            />
            <CardContent sx={{minHeight: '120px'}}>
                <Typography gutterBottom variant="h5" component="div" fontSize={'1.1rem'}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={'0.85rem'}> {vendor}
                </Typography>
                <Typography variant="body2" color="text.primary" fontSize={'0.85rem'}> {`Price: $${price}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/product/${id}`)}>See more...</Button>                
            </CardActions>
        </Card>
  );
}

export default AdCard