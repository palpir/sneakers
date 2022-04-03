import React from 'react';
import Info from '../Info';
import AppContext from '../context';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve)=> setTimeout(resolve,ms));

function Drawer ({ onClose,onRemove, items=[],open }) {
  const {} = useCart();
  const {cartItems, setCartItems}= React.useContext(AppContext);
  const [orderId,setOrderId]= React.useState(null);
  const [isOrderComplete,setIsOrderComplete]= React.useState(false);
  const [isLoading,setIsLoading]= React.useState(false);
  const totalPrice=cartItems.reduce((sum,obj)=>obj.price+sum,0);

  const onClickOrder= async () => {
    try {
    setIsLoading(true);
    const {data} = await axios.post('https://621a0ac981d4074e85b7fbb5.mockapi.io/orders',{
      items: cartItems,
    });
  
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);

    for (let i=0; i<cartItems.length; i++){
      const item = cartItems[i];
      await axios.delete(`https://621a0ac981d4074e85b7fbb5.mockapi.io/cart/${item.id}`);
      await delay(1000);
      
    }
   
    } catch (error) {
      console.log(error)
      alert('Не удалось создать заказ')
    }
    setIsLoading(false);
  }
    return (
       <div className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer }>
                <h2 className="d-flex justify-between mb-30 "> 
                Корзина <img onClick={onClose} className="removeBtn cu-p" 
            align='right' with={30} height={30} 
            src="img/close.png" alt="Close"/>
          </h2>
          {items.length > 0 ?(
              <div>
              <div className="items">
              {items.map((obj)=>( 
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div
                style={{backgroundImage:`url(${obj.img})`}} 
                className="cartItemImg" ></div>

            <div className="mr-20 flex">
              <p className="mb-5">{obj.tittle}</p>
              <b>{obj.price} руб </b>
            </div>
            
            <img
            onClick={()=>onRemove(obj.id)} 
            className="removeBtn " with={30}
            height={30} src="img/close.png"
            alt="Remove"
             />
            </div>
            ))}
          </div>
          <div className="cartTotalBlock">
                    <ul >
                        <li >
                             <span>Итого:</span>
                             <div></div>
                            <b>{totalPrice}руб</b>
                        </li>
                     <li>
                         <span>Налог 5%</span>
                         <div></div>
                         <b> {(totalPrice/100)*5}руб</b>
                     </li>
                    </ul>
                <button disabled={isLoading} onClick ={onClickOrder} className="greenButton">Оформить заказ</button> 
                </div>
            </div>
        ):(       
            <Info
            tittle={ isOrderComplete ? "Заказ оформлен": "Корзина пуста"}
            description={isOrderComplete ? `Ваш заказ # ${orderId} скоро будет передан в доставку` : "Добавьте хоть что-нибудь"}
            img={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
            />
          )}
         </div>
         </div>
         
         
         
    );
}
export default Drawer;