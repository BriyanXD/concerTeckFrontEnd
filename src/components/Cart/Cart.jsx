import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { getCartDB, deleteCart, putCartDB } from "../../redux/actions";
import Style from "./Cart.module.css"

export default function Cart() {
  const dispatch = useDispatch();
  const { user, loginWithPopup } = useAuth0();
  // const [card, setCard] = useState({
  //   quantity: 0,
  //   variant: "",
  //   itemTotal:0,
  //   price:0,
  // })
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    updateItem,
  } = useCart();
  const { AllEvents } = useSelector((state) => state);
  const { cartDB } = useSelector(state => state);
  console.log("🚀 ~ file: Cart.jsx ~ line 28 ~ Cart ~ cartDB", cartDB)
  const userData = useSelector(state => state.User);
 

  let events = [];
 
  useEffect(() => {
    dispatch(getEvents());
    if(userData[0]){
      dispatch(getCartDB(userData[0].id))
    }
  }, [dispatch]);

  userData[0]? cartDB.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.idEvent){
        let data = e;
        data.idDos = el.id 
        events.push(data);}
    });
  }):items.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.id) return events.push(e);
    });
  });
  //  if (isEmpty && cartDB) return <p>El carrito esta vacio</p>;
  console.log("evetos", events)
  return (
    <div>
    <div>
      {!userData[0]?events?.map((el) => {
        function handleChange(e) {
          updateItem(el.id, { variant: e.target.value });
          updateItem(el.id, { price: el.stock[e.target.value] });
        }

        const date = el.schedule.split("T")[0];
        const time =
          el.schedule.split("T")[1].split(":")[0] +
          ":" +
          el.schedule.split("T")[1].split(":")[1];
        return (
          <div className={Style.containerDetail}>
            <div>{el.name}</div>
            <div className={Style.text}>{date}</div>
            <div className={Style.text}>{time}</div>
            <select className={Style.select} onChange={handleChange} id={el.id} name="variant">
              <option value="1">Elegir tipo de entrada...</option>
              <option value="streamingPrice">
                Streaming: $ {el.stock.streamingPrice}
              </option>
              <option value="generalPrice">
                General: $ {el.stock.generalPrice}
              </option>
              <option value="generalLateralPrice">
                General lateral: $ {el.stock.generalLateralPrice}
              </option>
              <option value="vipPrice">Vip: $ {el.stock.vipPrice}</option>
              <option value="palcoPrice">Palco: $ {el.stock.palcoPrice}</option>
            </select>
          </div>
        );
      }):events?.map((el) => {
     
      async function handleCartDB(e) {
     
          dispatch(putCartDB({
            id: el.idDos,
            [e.target.name]: e.target.value,
            price: el.stock[e.target.value]
          }))
        }

        const date = el.schedule.split("T")[0];
        const time =
          el.schedule.split("T")[1].split(":")[0] +
          ":" +
          el.schedule.split("T")[1].split(":")[1];
        return (
          <div>
            <div>{el.name}</div>
            <div>{date}</div>
            <div>{time}</div>
            <select onChange={handleCartDB} id={el.id} name="variant">
              <option value="1">Elegir tipo de entrada...</option>
              <option value="streamingPrice">
                Streaming: $ {el.stock.streamingPrice}
              </option>
              <option value="generalPrice">
                General: $ {el.stock.generalPrice}
              </option>
              <option value="generalLateralPrice">
                General lateral: $ {el.stock.generalLateralPrice}
              </option>
              <option value="vipPrice">Vip: $ {el.stock.vipPrice}</option>
              <option value="palcoPrice">Palco: $ {el.stock.palcoPrice}</option>
            </select>
          </div>
        );
      })}

      <ul>
        {!userData[0]?items.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name} &mdash;
            <p>
              {" "}
              <div>
                Tipo de entrada:{" "}
                {item.variant === "streamingPrice"
                  ? "Streaming"
                  : item.variant === "generalPrice"
                  ? "General"
                  : item.variant === "generalLateralPrice"
                  ? "General lateral"
                  : item.variant === "vipPrice"
                  ? "Vip"
                  : item.variant === "palcoPrice"
                  ? "Palco"
                  : null}
              </div>
            </p>
            {item.price !== 0 ? <p>Precio: {item.price}</p>: null}
            <p>Total: {item.itemTotal === 0 ? null : item.itemTotal}</p>
            <button className={Style.btn}
              onClick={() =>
                item.quantity > 1
                  ? updateItemQuantity(item.id, item.quantity - 1)
                  : null
              }
            >
              -
            </button>
            <button className={Style.btn}
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button className={Style.btn} onClick={() => removeItem(item.id)}>&times;</button>
            <button className={Style.btncomprar}>Comprar entradas</button>
          </li>
          
        )): cartDB?.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.nombre} &mdash;
            <p>
              {" "}
              <div>
                Tipo de entrada:{" "}
                {item.variant === "streamingPrice"
                  ? "Streaming"
                  : item.variant === "generalPrice"
                  ? "General"
                  : item.variant === "generalLateralPrice"
                  ? "General lateral"
                  : item.variant === "vipPrice"
                  ? "Vip"
                  : item.variant === "palcoPrice"
                  ? "Palco"
                  : null}
              </div>
            </p>
            <p>Precio: {item.price}</p>
            <p>Total: {item.itemTotal === 0 ? null : item.itemTotal}</p>
            <button
              onClick={() =>
                item.quantity > 1
                  ? dispatch(putCartDB({id:item.id, quantity:item.quantity--, itemTotal: item.price * item.quantity}))
                  : null
              }
            >
              -
            </button>
            <button
              onClick={() => dispatch(putCartDB({id:item.id, quantity:item.quantity++, itemTotal: item.price * item.quantity}))}
            >
              +
            </button>
            <button onClick={() => dispatch(deleteCart(item.id))}>&times;</button>
            <button>Comprar entrada/s</button>
          </li>))}
        Total final: {cartTotal}
        <button
          onClick={() =>
            !user ? loginWithPopup() : alert("Pasarela de pagos")
          }
        >
          Comprar Todos
        </button>
      </ul>
      </div>
    </div>
  );
}
