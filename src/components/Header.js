import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header (props) 
{
    const {totalPrice }=useCart();
    
    return (
        <header className="d-flex justify-between align-center">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <div className="headerLeft">
                    
                        <img with={100} height={100} src="img/logo.jpg"/>
                        <div className="headerInfo">
                            <h3>React Sneackers</h3>
                                <div>
                                <p className="opacity-5">Лучшие кроссовки</p>
                            </div>
                        </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img className="mr-20 cu-p" with={33} height={33} src="img/korzina.png" alt="shop"/>
                    <span className="cu-p ">{totalPrice} руб</span>   
                </li>
                <li className="mr-30 cu-p">
                <Link to = {process.env.PUBLIC_URL + '/favorites'}>
                        <img  
                        with={25} height={25} 
                        src="img/heart.svg" 
                        alt="heart"/>
               </Link>
                </li>
                <li>
                    <Link to ={process.env.PUBLIC_URL + '/Orders'}
                    >
                    <img className="mr-30 cu-p" with={25} height={25} src="img/user.png" alt="Orders"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header;