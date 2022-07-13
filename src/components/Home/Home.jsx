import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";
import CardEvent from "../CardEvent/CardEvent";
import CardBigEvent from "../CardBigEvent/CardBigEvent";
//import Carrousel from "../Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import PaginadoBigEvents from "../Paginado/PaginadoBigEvents";
import PaginadoEvents from "../Paginado/PaginadoEvents";
import ModalCalendar from "../ModalCalendar/ModalCalendar";
import { BsFillHeartFill } from 'react-icons/bs';
import { getEvents, postLikes, getLikes, postAllEventsIdPrice, deleteLikes, getCartDB } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
/* import Streaming from "../Streaming/Streaming"; */
import Carousel2 from "../Carousel2/Carousel2";
import notfound from '../../img/no result.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const dispatch = useDispatch();
  const { user, loginWithPopup } = useAuth0();
  const {Likes} = useSelector((state)=> state);
  const { User, AllEvents } = useSelector((state) => state)
  let temporal = localStorage.getItem("user")
  let userStorage 
  if(temporal !== "nada"){
    userStorage = JSON.parse(temporal)
  }else{
    userStorage = ""
  }

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
    async function asincrono (){
      await dispatch(postAllEventsIdPrice(0,4))
      await dispatch(postAllEventsIdPrice(4,8))
      await dispatch(postAllEventsIdPrice(8,12))
      await dispatch(postAllEventsIdPrice(12,16))
      await dispatch(postAllEventsIdPrice(16,20))
      await dispatch(postAllEventsIdPrice(20,24))
    }
    asincrono()
  },[])

  useEffect(() => {
    dispatch(getEvents());
    if(userStorage !== ""){
      dispatch(getCartDB(userStorage.id))
    }
  }, [dispatch]);

  useEffect(()=>{
    if(userStorage !== ""){
      dispatch(getLikes(userStorage.id))
    }
  }, [dispatch])
  
  let view = true;
  if(currentBigEvents.length === 0 && currentEvents.length === 0){
    view= false;
  }else{
    view= true;
  }

  const handlePostAndDelete = (el) => {
    const pasa = Likes.find(e => e.idEvent === el.id)
    if(pasa){
      dispatch(deleteLikes(pasa.id))
    } else {
      dispatch(postLikes(el.id,userStorage.id))
    }
  }

  return (
    <div className={style.container}>
      <NavBar setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage} />
      <Carousel2 />
      {
        AllEvents.length>0? <div> 
        
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
                    <Link style={{ textDecoration: "none" }} to={`/detail/${el.id}`}>
                      <CardBigEvent
                        name={el.name}
                        genreId={el.genreId}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                        />
                    </Link>
                    <div>
                    </div>
                      <div className={Likes ? Likes.find(e => e.idEvent === el.id) ? style.heart : style.heartWhite : style.heartWhite} title="Agregar a favoritos">
                        <BsFillHeartFill size={30} onClick={()=> user ? handlePostAndDelete(el) : loginWithPopup()}/>
                        <Link to={`/streaming/${el.streaming}/${el.id}`}>{el.streaming ? <button className={style.containerStreaming} title="Ir a streaming"><FontAwesomeIcon icon={faVideo} /></button> : <></> }</Link>
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
                    <Link style={{ textDecoration: "none" }} to={`/detail/${el.id}`}>
                      <CardEvent
                        name={el.name}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                        />
                    </Link>
                    <div className={Likes.find(e => e.idEvent === el.id) ? style.heart2 : style.heart2White} title="Agregar a favoritos"><BsFillHeartFill size={20} onClick={()=> user ? handlePostAndDelete(el) : loginWithPopup()}/>
                    <Link to={`/streaming/${el.streaming}/${el.id}`}>{el.streaming ? <button className={style.containerStreaming} title="Ir a streaming"><FontAwesomeIcon icon={faVideo} /></button> : <></> }</Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>: <div className={style.noevents}> 
      <h1>Búsqueda sin resultados</h1>
      <img className={style.notfound} src={notfound} alt=''/>
      </div>} </div> : <div class={style.loader}> <span>Cargando...</span></div>
    }
      <br />
      <div>
        <Calendar />
      </div>
      <br />
      <Footer />
      <ModalCalendar />
    </div>
  );
}
