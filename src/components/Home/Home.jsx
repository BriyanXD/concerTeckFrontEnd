import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";
import CardEvent from "../CardEvent/CardEvent";
import CardBigEvent from "../CardBigEvent/CardBigEvent";
import Carrousel from "../Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions";
import { Link } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import PaginadoBigEvents from "../Paginado/PaginadoBigEvents";
import PaginadoEvents from "../Paginado/PaginadoEvents";
import ModalCalendar from "../ModalCalendar/ModalCalendar";
import { BsFillHeartFill } from 'react-icons/bs';
import { AddToFav } from '../../redux/actions';
import Favorites from "../Favorites/Favorites";
import { useAuth0 } from "@auth0/auth0-react";


export default function Home() {
  const dispatch = useDispatch();
  const { user, loginWithPopup } = useAuth0();
  const {Likes} = useSelector((state)=> state);
  // const {User} = useSelector(state => state);
  
  const allEventsPagination = useSelector((state) => {
    return state.BigEvents;
  });
  const [currentPag, setCurrenPag] = useState(1);
  const [eventsPerPag, setEventsPerPage] = useState(2);
  const indexLastEvent = currentPag * eventsPerPag;
  const indexFirstEvent = indexLastEvent - eventsPerPag;
  const currentBigEvents = allEventsPagination.slice(
    indexFirstEvent,
    indexLastEvent
  );

  const allSmallEventsPagination = useSelector((state) => {
    return state.Events;
  });
  const [currentpage, setCurrentPage] = useState(1);
  const [eventPerPage, setEventPerPage] = useState(4);
  const indexLastEventt = currentpage * eventPerPage;
  const indexfirstEventt = indexLastEventt - eventPerPage;
  const currentEvents = allSmallEventsPagination.slice(
    indexfirstEventt,
    indexLastEventt
  );

  const pagination = (numberPage) => {
    setCurrenPag(numberPage);
  };

  const pagination2 = (numberPage2) => {
    setCurrentPage(numberPage2);
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  let view = true;
  if(currentBigEvents.length === 0 && currentEvents.length === 0){
    view= false;
  }else{
    view= true;
  }

  
// console.log(currentBigEvents)
  return (
    <div className={style.container}>
      <NavBar setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage} />
      <Carrousel />
      {view === true ? <div className={style.eventcontainer}>
        <div className={style.midcontainer}>
          <PaginadoBigEvents
            eventsPerPag={eventsPerPag}
            allEventsPagination={allEventsPagination.length}
            pagination={pagination}
          />
          <div className={style.bigcontainer}>
            {currentBigEvents?.map((el) => {
                return (
                  <div key={el.id}>
                    <Link style={{ textDecoration: "none" }} to={`/details/${el.id}`}>
                      <CardBigEvent
                        name={el.name}
                        genreId={el.genreId}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                      />
                    </Link>
                      <div className={Likes.find(e => e.id === el.id) ? style.heart : style.heartWhite}>
                        <BsFillHeartFill size={30} onClick={()=> user ? dispatch(AddToFav(el)) : loginWithPopup()}/>
                        {/* <BsFillHeartFill size={30} onClick={()=>dispatch(AddToFav(el))}/> */}
                      </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={style.midcontainer}>
          <PaginadoEvents
            eventPerPage={eventPerPage}
            allSmallEventsPagination={allSmallEventsPagination.length}
            pagination2={pagination2}
          />
          <div className={style.litlecontainer}>
            {currentEvents?.map((el) => {
                return (
                  <div key={el.id}>
                    <Link style={{ textDecoration: "none" }} to={`/details/${el.id}`}>
                      <CardEvent
                        name={el.name}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                      />
                    </Link>
                    <div className={Likes.find(e => e.id === el.id) ? style.heart2 : style.heart2White}><BsFillHeartFill size={20} onClick={()=> user ? dispatch(AddToFav(el)) : loginWithPopup()}/></div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>: <div> <h1>No se encontraron eventos</h1></div>}
      <br />
      <div>
        <Calendar />
      </div>
      <br />
      <Footer />
      <ModalCalendar />
      {/* <Favorites/> */}
    </div>
  );
}
