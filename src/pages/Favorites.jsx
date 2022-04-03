
import React from 'react';

import Card from '../components/Card';
import  AppContext  from '../components/context';

function Favorites({ items , onAddToFavorite }) {
   const {favorites} = React.useContext( AppContext);
    return(
        <div className="content  p-30">
        <h1> Тут мои закладки </h1>
        <div className="d-flex flex-wrap">
            {favorites.map((item, index) =>(
                <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                
                {... item}
                />
            )) }
        </div>
       
      </div>
    );
}
export default Favorites;