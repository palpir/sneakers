import React from 'react';
import Card from '../components/Card';
import AppContext from '../components/context';
function Home ( {items,searchValue, setSearchValue,
                onChangeSearchInput, onAddToFavorite, onAddToCart,isLoading}) {

     const { isItemAdded } =React.useContext(AppContext);

      const renderItems= () => {
        const filterItems=  items.filter((item)=>
        item.tittle.toLowerCase().includes(searchValue.toLowerCase())); 
        return (isLoading ? [...Array(8)]:items)
          .map((item, index) =>(
            <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            
            
            loading={isLoading}
            {...item}
            />
          ))
          
    }
  
    return(
        <div className="content  p-30">
        <div className="d-flex align-center mb-40 justify-between" >
          <h1 >{searchValue? `Поиск по ${searchValue}`: 'Все кроссовки'}</h1>
          <div  className="search">
            <img with={45} height={35}  src="img/search.png" alt="Search"/>
           <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"/>  
           </div>
        </div>
        <div className="d-flex flex-wrap">
          
          {renderItems()}
        </div>
      </div>
    );
}
export default Home;