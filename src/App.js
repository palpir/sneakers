
import React, { useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';

import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './components/context'
import Orders from './pages/Orders';


function App() {
  const [cartItems,setCartItems]=React.useState([]);
  const [cartOpen,setCartOpen]=React.useState(false);
  const [searchValue,setSearchValue]=React.useState('');
  const [items,setItems]=React.useState([]);
  const [favorites,setFavorites]=React.useState('');
  const [isLoading,setIsLoading]=React.useState(true);

  React.useEffect(()=> {
    async function fetchData () {
      setIsLoading(true);
      const itemsResponse=
      await axios.get('https://621a0ac981d4074e85b7fbb5.mockapi.io/sneakers');
     
      const cartResponse =
      await axios.get('https://621a0ac981d4074e85b7fbb5.mockapi.io/cart');
     
      const favoritesResponse =
      await axios.get('https://621a0ac981d4074e85b7fbb5.mockapi.io/favorites');

      setIsLoading(false);
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  },[]);
 
  
  const onAddToCart= async (obj)=>{
    const findItem = cartItems.find((item)=>Number(item.parentId)==Number(obj.id));
    if(findItem) {
      axios.delete(`https://621a0ac981d4074e85b7fbb5.mockapi.io/cart/${findItem.id}`);
      setCartItems(prev=>prev.filter(item => Number(item.parentId) !== Number(obj.id)));
    } else {
      setCartItems((prev)=>[ ... prev, obj]); 
      const {data}= await axios.post('https://621a0ac981d4074e85b7fbb5.mockapi.io/cart',obj);
      setCartItems((prev)=>(prev.map(item => {
        if (item.parentId == data.parentId) {
          return {
            ...item,
            id: data.id
          }
        };
        return item;
      } ))); 
    }
 
  };

  const onRemoveItem=(id)=>{

     axios.delete(`https://621a0ac981d4074e85b7fbb5.mockapi.io/cart/${id}`);
     setCartItems((prev)=>prev.filter((item) => Number(item.id )!== Number(id)));  
  };

  const onChangeSearchInput = (event) => {
    
    setSearchValue(event.target.value);

  };

  const onAddToFavorite = async (obj) => {
    try{
      if (favorites.find((favObj)=>Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://621a0ac981d4074e85b7fbb5.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev)=>prev.filter((item) => item.id !== obj.id));  
       
      }  else {
        const { data } = await axios.post('https://621a0ac981d4074e85b7fbb5.mockapi.io/favorites',obj);
        setFavorites((prev)=>[... prev,data]);
      } 

    }
   catch(errpr){
     alert('ошибка в фаворитах')
   }
   
  };
  //Отображение лайков в карточек
  const isItemAdded = (id) => { 
    return cartItems.some((obj)=> Number(obj.parentId) === Number(id));
    

  };
  return (
    <AppContext.Provider value={{
      cartItems,
      favorites, 
      items,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpen,
      setCartItems
      }}>
        <div className="wrapper clear">
      
      <Drawer items={cartItems} 
      onClose={()=> setCartOpen(false)} onRemove={onRemoveItem} open={cartOpen}/> 
      <Header onClickCart={()=> setCartOpen(true)} /> 
       <Routes>
          <Route path={process.env.PUBLIC_URL + '/'} exact 
          element={ 
          <Home dever
          items={items} 
          
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          />}
          />

          <Route path={process.env.PUBLIC_URL + '/favorites'}
          exact 
          element={ <Favorites dever
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          />}
          />
          
          <Route path={process.env.PUBLIC_URL + '/Orders'}
          exact 
          element={ <Orders 
          />}
          />
          
      </Routes>  

      
    </div>
 
    </AppContext.Provider>
     );
}

export default App;
