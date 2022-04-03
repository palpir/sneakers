import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../components/context';
import styles from './Card.module.scss';

function Card ({
    id,
    onFavorite,
    tittle,
    img,
    price,
    onPlus,
    favorited=false,
    added=false,
    loading=false
   
}) {
const { isItemAdded } =React.useContext(AppContext);
const [isAdded,setIsAdded]=React.useState(added);
const obj = { id, parentId: id, tittle,img,price };
const [isFavorite,setIsFavorite]=React.useState(favorited);
const onClickPlus= () => {
    onPlus(obj);
    setIsAdded(!isAdded);
}
const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
}
return(
    <div className={styles.card}>
        {
            loading ? (<ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>) : (
              <>
            {onFavorite &&
                          <div className={styles.favorite} > 
                          <img  with={20} height={20} 
                          
                          onClick={onClickFavorite}
                          src={isFavorite ? "img/Like.png" : "img/notLike.png" } 
                          alt="Unliked"/>
                      </div>

            }
      
              <img with={150} height={150} src={img}/>
              <h5> {tittle}  </h5>
              <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                      
                      <span>Цена</span>
                      <b>{price}</b>
                      
                      </div>
                     {onPlus &&
                      <img className='removeBtn'
                      
                      onClick={onClickPlus}
                       with={50} height={50} 
                      src={isItemAdded(id) ? "img/mark.png" : "img/plus.png" } 
                      alt="Plus"/>

                     }
                  </div>
      
          </>
          )
        }
    
    </div>
    );
  }
  export default Card;