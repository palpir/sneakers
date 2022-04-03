
import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import AppContext from '../components/context';



function Orders() {
    const { onAddToFavorite, onAddToCart }= React.useContext(AppContext);
    const [orders,setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        ( async () => {
        const { data } = await axios.get('https://621a0ac981d4074e85b7fbb5.mockapi.io/orders');
        setOrders(data.map((obj)=>obj.items).flat());
        setIsLoading(false);
        })();
    },[]);
  
    return(
        <div className="content  p-30">
        <h1> Тут мои заказы </h1>
        <div className="d-flex flex-wrap">
            { ( isLoading ? [... Array(8)] : orders).map((item,index)=>(
                <Card
                key={index}
                loading={isLoading}
                {...item}
                />
            )) }
        </div>
      </div>
    );
}
export default Orders;