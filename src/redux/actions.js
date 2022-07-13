import axios from "axios";
const url = "https://concerteck.herokuapp.com";

export function getEvents() {
  return async function (dispatch) {
    try {
      let events = await axios.get(`${url}/api/events`);
      return dispatch({
        type: "GET_EVENTS",
        payload: events.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function searchEvent(name) {
  return async function (dispatch) {
    try {
      const events = await axios.get(`${url}/api/events?name=${name}`);
      return dispatch({
        type: "GET_EVENT_BY_NAME",
        payload: events.data,
      });
    } catch (error) {
      // alert('NO SE ENCONTRO EL EVENTO')
      return dispatch({
        type: "GET_EVENT_BY_NAME",
        payload: [],
      });
      // console.log(error.message);
    }
  };
}

export function EventById(id) {
  return async function (dispatch) {
    try {
      const event = await axios.get(`${url}/api/events?id=${id}`);
      return dispatch({
        type: "GET_EVENT_DETAIL",
        payload: event.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function CreateEvent(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(`${url}/api/events`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function GetGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get(`${url}/api/genres`);
      // console.log(genres.data);
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function CreateGenre(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(`${url}/api/genres`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function GetVenues() {
  return async function (dispatch) {
    try {
      const venues = await axios.get(`${url}/api/venues`);
      return dispatch({
        type: "GET_VENUES",
        payload: venues.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function CreateVenue(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(`${url}/api/venues`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return creation;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function CreateStock(value) {
  return async function (dispatch) {
    try {
      const creation = await axios.post(`${url}/api/ticketstock`, value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return creation;
    } catch (error) {
      console.log(" ENTRO POR EL CATCH DE LA ACCION DE CREAR EL STOCK ");
      console.log(error.message);
    }
  };
}

export function ClearDetail() {
  return function (dispatch) {
    return dispatch({ type: "CLEAR_DETAIL" });
  };
}

export function register(value) {
  return async function (dispatch) {
    try {
      const register = await axios.post(`${url}/api/user`, value);
      localStorage.setItem("token", register.data[2].token);
      localStorage.setItem("user", JSON.stringify(register.data[1].user[0]));
      return dispatch({
        type: "LOGIN_USER",
        payload: register.data[1],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function LoginUser(value) {
  return async function (dispatch) {
    try {
      const getUser = await axios.post(`${url}/api/login`, value);
      return dispatch({
        type: "LOGIN_USER",
        payload: getUser.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function LogOut() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "LOGOUT_USER",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationUser(value) {
  return async function (dispatch) {
    try {
      const user = await axios.post(`${url}/api/validation/login`, value);
      return dispatch({
        type: "VALIDATION_LOGIN",
        payload: user.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationEmail(value) {
  return async function (dispatch) {
    try {
      const email = await axios.post(`${url}/api/validation/email`, {
        email: value,
      });
      return dispatch({
        type: "VALIDATION_EMAIL",
        payload: email.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ValidationUsername(value) {
  return async function (dispatch) {
    try {
      const username = await axios.post(`${url}/api/validation/username`, {
        username: value,
      });
      return dispatch({
        type: "VALIDATION_USERNAME",
        payload: username.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterByGenres(payload) {
  return {
    type: "FILTER_GENRES",
    payload,
  };
}

export function OrderByDate(payload) {
  return {
    type: "ORDER_BY_DATE",
    payload,
  };
}

export function ModalCalendarVisible(booleanForVisible, dateFor) {
  return {
    type: "MODAL_CALENDAR_VISIBLE",
    payload: {
      visibleModal: booleanForVisible,
      dateForSearch: dateFor,
    },
  };
}

export function AddToBasket(payload) {
  return {
    type: "ADD_TO_BASKET",
    payload: payload,
  };
}

export function getLikes(idUser) {
  return async function (dispatch) {
    try {
      const allLikes = await axios.get(`${url}/api/like?idUser=${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_ALL_LIKES",
        payload: allLikes.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postLikes(idEvent, idUser) {
  return async function (dispatch) {
    try {
      const getLikes = await axios.post(
        `${url}/api/like`,
        { idEvent: idEvent, idUser: idUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "POST_LIKES",
        payload: getLikes.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteLikes(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${url}/api/like?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "DELETE_LIKES",
        payload: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let config = {
        method: "get",
        url: `${url}/api/user`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      /* console.log(token); */
      /* const encabezado = `Authorization: Bearer ${localStorage.getItem('token')}` */

      const adminState = await axios(config);
      return dispatch({
        type: "GET_ALL_USERS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllProducers() {
  return async function (dispatch) {
    try {
      const adminState = await axios.get(`${url}/api/producers`);
      return dispatch({
        type: "GET_ALL_PRODUCERS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllSolicits() {
  return async function (dispatch) {
    try {
      const adminState = await axios.post(`${url}/api/Solicits`, {
        Headers: {
          authorization: "",
        },
      });
      return dispatch({
        type: "GET_ALL_SOLICITS",
        payload: adminState.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function findUser(allusers, id) {
  const userSaved = allusers.find((user) => user.id === id);
  return {
    type: "FIND_USER",
    payload: userSaved,
  };
}
export function findEvent(allTickets, id) {
  const eventSave = allTickets?.find((event) => event.id === id);
  return {
    type: "FIND_EVENT",
    payload: eventSave,
  };
}
export function findTicket(allTickets, id) {
  const ticketSave = allTickets?.find((event) => event.id === id);
  return {
    type: "FIND_TICKET",
    payload: ticketSave,
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const userDeleted = await axios.delete(`${url}/api/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "DELETE_USER",
        payload: userDeleted.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function deleteEvents(id) {
  return async function (dispatch) {
    try {
      const eventDeleted = await axios.delete(`${url}/api/events?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "DELETE_EVENT",
        payload: eventDeleted,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function upgradeRank(id, boolean) {
  return async function (dispatch) {
    try {
      const userRanked = await axios.put(
        `${url}/api/upgrade`,
        { isAdmin: boolean, id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "USER_RANKED",
        payload: userRanked,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// export function searchUserByName (name){
//   return async function(dispatch){
//     try {
//       const userByName = await axios.get(`http://localhost:3001/api/user?name=${name}`, {headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       }}) ;
//       console.log(userByName, 'ESTOY RE LCOO')
//       return dispatch({
//         type : "SEARCH_USER_BY_NAME",
//         payload :userByName.data
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export function searchUserByUserName(username) {
  return async function (dispatch) {
    try {
      const userByUserName = await axios.get(
        `${url}/api/user?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "SEARCH_USER_BY_USERNAME",
        payload: userByUserName.data,
      });
    } catch (error) {
      console.log(error, "SEARCH_USER_BY_USERNAME");
    }
  };
}

export function findUser2(allusers, id) {
  const userSaved = allusers.find((user) => user.id === id);
  return {
    type: "FIND_USER_2",
    payload: userSaved,
  };
}

export function activeModalEventsAdminPanel(booleano) {
  return {
    type: "MODAL_EVENT_ADMIN_PANEL",
    payload: booleano,
  };
}
export function activeModalUsersAdminPanel(booleano) {
  return {
    type: "MODAL_USERS_ADMIN_PANEL",
    payload: booleano,
  };
}

export function activeModalUsersPermisedAdminPanel(booleano) {
  return {
    type: "MODAL_USERS_PERMISED_ADMIN_PANEL",
    payload: booleano,
  };
}
export function activeModalOrdersAdminPanel(booleano) {
  return {
    type: "MODAL_ORDERS_ADMIN_PANEL",
    payload: booleano,
  };
}

export function addCartDB(data) {
  return async function () {
    try {
      await axios.post(`${url}/api/cart`, data);
    } catch (error) {
      console.log(error);
    }
  };
}
export function findEventByName(name) {
  return async function (dispatch) {
    try {
      const eventos = await axios.get(`${url}/api/events?name=${name}`);
      return dispatch({
        type: "FIND_EVENT_BY_NAME",
        payload: eventos.data,
      });
    } catch (error) {
      // alert('NO SE ENCONTRO EL EVENTO')
      // return dispatch({
      //   type: "FIND_EVENT_BY_NAME",
      //   payload: [],
      // });
      console.log(error.message);
    }
  };
}

export function getCartDB(idUser) {
  return async function (dispatch) {
    try {
      const getCartDB = await axios.get(`${url}/api/cart?idUser=${idUser}`);
      return dispatch({
        type: "GET_CART_EVENT",
        payload: getCartDB.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCart(id) {
  return async function (dispatch) {
    try {
      const data = await axios.delete(`${url}/api/cart?id=${id}`);
      return dispatch({
        type: "DELETE_CART",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putCartDB(value) {
  return async function (dispatch) {
    try {
      const data = await axios.put(`${url}/api/cart`, value);
      return dispatch({
        type: "UPDATE_CART",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllBlackList() {
  return async function (dispatch) {
    try {
      const getAllBlackListData = await axios.get(`${url}/api/blackall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_ALL_BLACK_LIST",
        payload: getAllBlackListData.data,
      });
    } catch (error) {
      console.log(error, "GET_ALL_BLACK_LIST");
    }
  };
}

export function deleteUserBlackList(idUser) {
  return async function (dispatch) {
    try {
      const dataUser = await axios.delete(`${url}/api/black?id=${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "DELETE_USER_BLACK_LIST",
        payload: dataUser.data,
      });
    } catch (error) {
      console.log(error, "DELETE_USER_BLACK_LIST");
    }
  };
}
export function getAllLikesEventId(idEvent) {
  return async function (dispatch) {
    try {
      const allLikesEventId = await axios.get(
        `${url}/api/like?idEvent=${idEvent}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "GET_ALL_LIKES_EVENT_ID",
        payload: allLikesEventId.data,
      });
    } catch (error) {
      console.log(error, "GET_ALL_LIKES_EVENT_ID");
    }
  };
}

export function searchBlackList(name) {
  return async function (dispatch) {
    try {
      const allBlackList = await axios.get(`${url}/api/blackall?name=${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_NAME_BY_BLACKLIST",
        payload: allBlackList.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putUrlStreamingEvent(urlStreaming, idEvent) {
  return async function (dispatch) {
    try {
      const putUrlStreaming = await axios.put(
        `${url}/api/eventurl`,
        {
          urlStraming: urlStreaming,
          idEvent: idEvent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "PUT_URL_STREAMING_FOR_EVENT",
        payload: putUrlStreaming.data,
      });
    } catch (error) {
      console.log(error, "PUT_URL_STREAMING_FOR_EVENT");
    }
  };
}
export function getTicketById(id) {
  return async function (dispatch) {
    try {
      const ticket = await axios.get(`${url}/api/ticket?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_TICKET_BY_ID",
        payload: ticket.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getAllTickets() {
  return async function (dispatch) {
    try {
      const getAllTickets = await axios.get(`${url}/api/ticket`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_ALL_TICKETS",
        payload: getAllTickets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function verifiUserBanned(email) {
  return async function (dispatch) {
    try {
      const userSave = await axios.get(
        `${url}/api/verifibaned?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "VERIFY_USER_BANNED",
        payload: userSave.data,
      });
    } catch (error) {
      console.log(error, "VERIFY_USER_BANNED");
    }
  };
}
//verifibaned

export function searchOrder(name) {
  return async function (dispatch) {
    try {
      const allOrder = await axios.get(`${url}/api/ticket?name=${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dispatch({
        type: "GET_NAME_BY_ORDER",
        payload: allOrder.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchEventIDEmails(eventId) {
  return async function (dispatch) {
    try {
      const allEmails = await axios.get(
        `${url}/api/ticket?eventId=${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "GET_ALL_EMAILS_TICKET",
        payload: allEmails.data,
      });
    } catch (error) {
      console.log(error, "GET_ALL_EMAILS_TICKET");
    }
  };
}
export function putDataEvent(
  { name, artist, description, schedule, placeImage, performerImage },
  id
) {
  return async function (dispatch) {
    try {
      const eventUpdate = await axios.put(
        `${url}/api/events`,
        {
          id,
          name,
          artist,
          description,
          schedule,
          placeImage,
          performerImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return dispatch({
        type: "PUT_DATA_EVENT",
        payload: eventUpdate.data,
      });
    } catch (error) {
      console.log(error, "PUT_DATA_EVENT");
    }
  };
}

export function checkout(line_items) {
  return async function (dispatch) {
    try {
      const data = await axios.post(`${url}/api/tickets2`, { line_items });
      return dispatch({
        type: "SESION_DATA",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function ActualizacionStock(descontar) {
  return async function (dispatch) {
    try {
      await axios.put(`${url}/api/cart/update`, { descontar });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function ticketVoucher(id) {
  return async function (dispatch) {
    try {
      const tick = await axios.post(`${url}/api/voucher?${id}`);
      return dispatch({
        type: "TICKET_VOUCHER",
        payload: tick.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function ticketVoucher (id){
//   return async function (dispatch) {
//     try {
//       const tick = await axios.post(`http://localhost:3001/api/voucher?${id}`)
//       return dispatch ({
//         type: "TICKET_VOUCHER",
//         payload: tick.data
//       })
//     } catch (error) {
//       console.log(error)
//   }
// }
// }

export function postTicket(data) {
  return async function (dispatch) {
    try {
      await axios.post(`${url}/api/ticket`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* export function getAllSolicits(allevents) {
  return async function (dispatch) {
    try {
      console.log("EVENTOS", allevents);
      const filtersEvent = allevents.filter((event) => {
        if (!event.isAprobe) return event;
        else return;
      });
      return dispatch({
        type: "GET_ALL_SOLICITS",
        payload: filtersEvent,
      });
    } catch (error) {
      console.log(error.message, error);
    }
  };
} */

// export function filterByGenres (){
//     return async(dispatch) => {
//         const gen = await axios.get('http://localhost:3001/api/genres')
//         return{
//             type:"FILTER_GENRES"
//         }
//     }
// }

export function postAllEventsIdPrice(a, b) {
  return async function () {
    axios.post(`${url}/api/all`, { cantMin: a, cantMax: b });
  };
}
