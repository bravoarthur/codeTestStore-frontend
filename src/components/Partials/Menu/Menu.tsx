import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './Menu.module.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups'
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Menu() {

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
        ) => {            
            if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
                return;
            }

        setState({ ...state, [anchor]: open });
    }; 

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={styles.listItems}>
                <Link to='/about'>
                    <ListItem disablePadding>
                        
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsIcon/>
                                </ListItemIcon>
                                
                                <ListItemText primary={'About Us'} />

                            </ListItemButton>
                        
                    </ListItem>
                </Link>
                <Link to='/catalog'>
                    <ListItem disablePadding>
                        
                            <ListItemButton>
                                <ListItemIcon>
                                    <MenuBookIcon/> 
                                </ListItemIcon>
                                
                                <ListItemText primary={'Catalog'} />

                            </ListItemButton>
                        
                    </ListItem>
                </Link>
        
            </List>
            <Divider />
            <List className={styles.listItems}>
                
                    <Link to={'/'}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Home Page'} />
                            </ListItemButton>
                        </ListItem>                    
                    </Link>
                
          </List>
        </Box>
    );




    return (

        <div>

            <IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon  />
            </IconButton>   
                    
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        
             
        </div>

    );

}

export default Menu;
