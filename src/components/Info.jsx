import React from 'react';
import AppContext from './context';


const Info = ({tittle,description,img}) => {
    const { setCartOpen }=React.useContext(AppContext);
  return (
<div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px"  src={img} alt="Empty" />
            <h2>{tittle}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={()=> setCartOpen(false)} className="greenButton">
              
              Вернуться назад
            </button>
          </div> 
  )
}

export default Info;
