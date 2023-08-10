import "./NewsHeader.css"
import { newsCategories } from "./PredefinedConst"
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Menu } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Link, Navigate } from "react-router-dom";

export default function NewsHeader({countryCode}) {    

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menu, setMenu] = useState(null)
  const [searchText, setSearchText] = useState()
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);    
  };
  
  const handleClose = () => {        
    setAnchorEl(null);
  };

  const handleMenuClick = (event, item) => {
    console.log('you selected menu item: ',item)    
    setAnchorEl(null);
  }
  
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (            
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>        
        <Menu
          anchorEl={anchorEl}
          id="categary-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}          
          slotProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            }            
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem 
            component={Link}
            to='/'
            onClick={event => handleMenuClick(event,"/home")}>
          HOME
        </MenuItem>
        {newsCategories.map((newsCategoryItem, index)=> 
          <MenuItem 
            key={index}
            component={Link}
            to={`/${newsCategoryItem}`}
            onClick={event => handleMenuClick(event, `${newsCategoryItem}`)}
            >
            {newsCategoryItem.toLocaleUpperCase()}
          </MenuItem>
        )}
      </Menu>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>          
          <Typography
            variant="h4"
            noWrap
            component="div"
            fontFamily="Poppins"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          JSX Express
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(event)=> setSearchText(event.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
      </Box>
  );
}

/*
      <div className="navbar">
        <div className="logo">{countryCode && <img src={`https://flagcdn.com/120x90/${countryCode}.png`} alt="" />}<Link to="/">J Xpress&#8482;</Link></div>
        <div className="nav-links">
          <ul className="links">
            <li><Link to={`/${countryCode}`}>Home</Link></li>
              {newsCategories.map((newsCategory, index)=> {
                return (<li key={index}><Link to={`/${countryCode}/${newsCategory}`}>{newsCategory}</Link></li>)
              })}
              <li><Link to="/"><i className='bx bx-search'></i></Link></li>
          </ul>
          
        </div>
      </div>      

*/
