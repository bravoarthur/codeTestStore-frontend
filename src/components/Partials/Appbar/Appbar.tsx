import styles from './Appbar.module.scss'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '../Menu/Menu';

function AppbarHeader() {


    return ( 
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Menu/>
                    <Link to='/' className={styles.title}>
                        <Typography variant="h6" color="inherit" component="div">
                            Code Store
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>

    );
}

export default AppbarHeader;
