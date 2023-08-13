import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./NewsHeader.css"
import { newsCategories } from "./PredefinedConst"
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Menu, Avatar, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

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


export default function NewsHeader({countryFlag}) {    

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);  
  const [searchText, setSearchText] = useState('')
  
  let navigate = useNavigate()

  let params = useParams()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);    
  };
  
  const handleClose = () => {        
    setAnchorEl(null);
  };

  const handleMenuClick = (event, item) => {    
    setAnchorEl(null);
    setSearchText('')
    if (item === "home") {
      navigate(`/`)
    } else {
      navigate(`/${item}`)
    }      
  }
  
  const handleSearchTextKeyDown = (event) => {
    
    if (event.key === 'Enter') {            
      if (event.target.value !== "") {
        navigate('/search/'+event.target.value)
      }
    }
  }

  const handleSearchTextChange = (event) => {    
    setSearchText(event.target.value)
  }

  const handleSearchTextOnBlur = (event) => {
    
    if (event.target.value !== "") {
      setSearchText(event.target.value)
      navigate(`/search/${event.target.value}`)
    }

  }
  const handleFlagIconClick = () => {
    setSearchText('')
    navigate('/')
    return true
  }
  useEffect(()=>{
    
    if (params?.searchText) {
      setSearchText(params?.searchText)      
    }
    if (params?.category) {
      setSearchText(params?.searchText)
    }
  },[])
  
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
            onClick={event => handleMenuClick(event,"home")}>
          HOME
        </MenuItem>
        {newsCategories.map((newsCategoryItem, index)=> 
          <MenuItem 
            key={index}
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
        <IconButton onClick={handleFlagIconClick} aria-label="home icon">
          <Avatar 
              alt={countryFlag?.emoji} 
              src={countryFlag?.svg} 
              variant='rounded'            
              sx={{ width: 40, minWidth: "30", height: "auto"}}
          />        
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
        <Box>
          <Search>
            <SearchIconWrapper >
              <IconButton>
                <SearchIcon sx={{color: "white"}} />
              </IconButton>              
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}    
              value={searchText}          
              onKeyDownCapture={handleSearchTextKeyDown}
              onChange={handleSearchTextChange}
              onBlur={handleSearchTextOnBlur}
            />
          </Search>
        </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
      </Box>      
  );
}
