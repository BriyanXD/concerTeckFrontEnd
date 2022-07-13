import Detail from "../components/Detail/Detail";

const initialState = {
  AllEvents: [],
  AllBigEvents: [],
  AllLitleEvents: [],
  Detail: {},
  User: "",
  userDeleted: "",
  eventDeleted: "",
  userSaved: "",
  eventSaved: "",
  // TodosEvents:[],
  BigEvents: [],
  Events: [],
  Genres: [],
  Venues: [],
  Stock: [],
  Basket: [],
  Likes: [],
  userValidation: "",
  emailValidation: "",
  usernameValidation: "",
  stateModalCalendar: {
    isVisbleModal: false,
    eventsForCalendar: [],
  },
  sesion: {},
  cartDB: [],
  stateAdminPanel: {
    allUsers: [],
    tdosEvents: [],
    allBlackList: [],
    blackListByName: [],
    userSaveBlackList: "",
    // UserByName:[],
    UserByUserName: [],
    allProducers: [],
    allSolicits: [],
    modalEvent: false,
    modalUser: false,
    modalOrder: false,
    modalUserPermised: false,
    allLikesEventId: [],
    putUrlStreaming: "",
    allTickets: [],
    allTiketsByName: [],
    saveFindTicket: "",
    userBanned: "",
    allEmails: [],
  },
  token: "",
  ticket: {},
  Voucher: {},
};

function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_EVENTS":
      // console.log(payload)
      const BigE = payload.filter((e) => e.venue.isBigEvent === true);
      // (e => e.isBigEvent === true)
      // console.log(BigE);
      const Eve = payload.filter((e) => e.venue.isBigEvent === false);
      // payload.filter(e => e.isBigEvent === false)
      // console.log(Eve);
      return {
        ...state,

        AllEvents: payload,
        // TodosEvents:payload,
        AllBigEvents: BigE,
        BigEvents: BigE,
        AllLitleEvents: Eve,
        Events: Eve,
      };
    case "GET_GENRES": {
      // console.log(payload)
      return {
        ...state,
        Genres: payload,
      };
    }
    case "ADD_TO_BASKET":
      if (state.Basket.includes(payload)) return state;
      return {
        ...state,
        Basket: [...state.Basket, payload],
      };
    case "POST_LIKES":
        return {
          ...state,
          Likes: [...state.Likes, payload],
        };
    case "DELETE_LIKES":
      return {
        ...state,
        Likes: state.Likes.filter((f) => f.id !== payload),
      };
    case "GET_ALL_LIKES":
      return {
        ...state,
        Likes: payload,
      };
    case "GET_EVENT_BY_NAME": {
      const bigEvents = payload.filter((e) => e.venue.isBigEvent === true);
      const smallEvents = payload.filter((e) => e.venue.isBigEvent === false);

      return {
        ...state,
        BigEvents: bigEvents,
        Events: smallEvents,
      };
    }

    case "GET_EVENT_DETAIL":
      return {
        ...state,
        Detail: payload,
      };

    case "CLEAR_DETAIL": {
      let prueb = Detail.length>0? "TIENE DATOS" : "NO HAY NADA"
      console.log("ENTRO",prueb)
      return {
        ...state,
        Detail: {},
      };

    }

    case "LOGIN_USER": {
      return {
        ...state,
        User: payload.user,
      };
    }

    case "LOGOUT_USER": {
      return {
        ...state,
        User: "",
      };
    }
    // case "FILTER_GENRES":{
    //   return {
    //   }
    // }
    case "FILTER_GENRES": {
      // console.log(state.AllEvents)
      // console.log(payload)
      const generos =
        payload === "all"
          ? state.AllBigEvents
          : state.AllBigEvents.filter(
              (e) => parseInt(e.genreId) === parseInt(payload)
            );
      // console.log(generos)
      const generoso =
        payload === "all"
          ? state.AllLitleEvents
          : state.AllLitleEvents.filter(
              (e) => parseInt(e.genreId) === parseInt(payload)
            );
      // console.log(generoso);
      // const prueba = state.AllLitleEvents.filter(e => e.name === e.name)
      // console.log(prueba)
      return {
        ...state,
        BigEvents: generos,
        Events: generoso,
      };
    }
    case "ORDER_BY_DATE":
      // if(state.AllEvents.venue.isBigEvent === true){
      let reubicacionByDate =
        payload === "asc"
          ? state.AllEvents.sort(function (a, b) {
              if (a.schedule > b.schedule) {
                return 1;
              }
              if (b.schedule > a.schedule) {
                return -1;
              }
              return 0;
            })
          : state.AllEvents.sort(function (a, b) {
              if (a.schedule > b.schedule) {
                return -1;
              }
              if (b.schedule > a.schedule) {
                return 1;
              }
              return 0;
            });
      // console.log(reubicacionByDate)
      return {
        ...state,
        Events: reubicacionByDate.filter((e) => e.venue.isBigEvent === false)
          ? reubicacionByDate.filter((e) => e.venue.isBigEvent === false)
          : state.AllLitleEvents,
        BigEvents: reubicacionByDate.filter((e) => e.venue.isBigEvent === true)
          ? reubicacionByDate.filter((e) => e.venue.isBigEvent === true)
          : state.AllBigEvents,
        // ...state,
        // AllEvents: payload === 'all'?  state.TodosEvents  : reubicaciónByDate
      };

    // case "LOGOUT":{
    //   return {
    //     ...state,
    //     User:{}
    //   }
    // }
    case "POST_EVENT":
      return {
        ...state,
        Genres: payload,
      };
    case "POST_GENRE":
      return {
        ...state,
      };
    case "GET_VENUES":
      return {
        ...state,
        Venues: payload,
      };
    case "POST_VENUE":
      return {
        ...state,
        Venues: [...state.Venues, payload],
      };
    case "POST_STOCK":
      return {
        ...state,
        Stock: [...state.Stock, payload],
      };
    case "VALIDATION_LOGIN":
      return {
        ...state,
        userValidation: payload,
      };
    case "VALIDATION_EMAIL":
      return {
        ...state,
        emailValidation: payload,
      };
    case "VALIDATION_USERNAME":
      return {
        ...state,
        usernameValidation: payload,
      };
    case "MODAL_CALENDAR_VISIBLE":
      return {
        ...state,
        stateModalCalendar: {
          isVisbleModal: payload.visibleModal,
          eventsForCalendar: searchEventForCalendar(
            state.AllEvents,
            payload.dateForSearch,
            payload.visibleModal
          ),
        },
      };
    case "GET_ALL_USERS": {
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allUsers: payload,
        },
      };
    }
    case "GET_ALL_SOLICITS":
      const filter = payload.filter((event) => event.isAprobe === false);
      return {
        ...state,
        stateAdminPanel: {
          allSolicits: filter ? filter : "error no hay eventos",
        },
      };
    case "DELETE_USER":
      return {
        ...state,
        userDeleted: payload,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        eventDeleted: payload,
      };
    case "FIND_USER":
      return {
        ...state,
        userSaved: payload,
      };
    case "USER_RANKED":
      return {
        ...state,
        userSaved: payload.data.user,
      };
    //USER_RANKED
    case "FIND_EVENT":
      return {
        ...state,
        eventSaved: payload,
      };
    // case "SEARCH_USER_BY_NAME":
    //   return{
    //     ...state,
    //     stateAdminPanel:{
    //       UserByName:payload,
    //     }
    //   };
    case "SEARCH_USER_BY_USERNAME":
      return {
        ...state,
        stateAdminPanel: {
          UserByUserName: payload,
        },
      };
    case "FIND_USER_2":
      return {
        ...state,
        UserByUserName: payload,
      };
    case "MODAL_EVENT_ADMIN_PANEL":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          modalEvent: payload,
        },
      };
    case "MODAL_USERS_ADMIN_PANEL":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          modalUser: payload,
        },
      };
    case "MODAL_USERS_PERMISED_ADMIN_PANEL":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          modalUserPermised: payload,
        },
      };
    case "GET_CART_EVENT":
      return {
        ...state,
        cartDB: payload,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartDB: state.cartDB.map((e) => {
          return e.id === payload.id ? payload : e;
        }),
      };
    case "DELETE_CART":
      return {
        ...state,
        cartDB: state.cartDB.filter((e) => e.id !== payload.ShoppingSave.id),
      };
    case "FIND_EVENT_BY_NAME":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          tdosEvents: payload,
        },
      };
    case "GET_ALL_BLACK_LIST":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allBlackList: payload,
        },
      };
    case "DELETE_USER_BLACK_LIST":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          userSaveBlackList: payload,
        },
      };
    //GET_ALL_LIKES_EVENT_ID
    case "GET_ALL_LIKES_EVENT_ID":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allLikesEventId: payload,
        },
      };
    case "PUT_URL_STREAMING_FOR_EVENT":
      return {
        ...state,
        eventSaved: payload,
      };
    case "GET_TICKET_BY_ID":
      return {
        ...state,
        ticket: payload,
      };
    case "SESION_DATA":
      console.log(payload);
      return {
        ...state,
        sesion: payload,
      };
    //GET_ALL_TICKETS
    case "GET_ALL_TICKETS":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allTickets: payload,
        },
      };
    //MODAL_ORDERS_ADMIN_PANEL
    case "MODAL_ORDERS_ADMIN_PANEL":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          modalOrder: payload,
        },
      };
    //FIND_TICKET
    case "FIND_TICKET":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          saveFindTicket: payload,
        },
      };
    case "GET_NAME_BY_BLACKLIST":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          blackListByName: payload,
        },
      };
    //VERIFY_USER_BANNED
    case "VERIFY_USER_BANNED":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          userBanned: payload,
        },
      };
    case "GET_NAME_BY_ORDER":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allTiketsByName: payload,
        },
      };
    //GET_ALL_EMAILS_TICKET
    case "GET_ALL_EMAILS_TICKET":
      return {
        ...state,
        stateAdminPanel: {
          ...state.stateAdminPanel,
          allEmails: payload,
        },
      };
    //PUT_DATA_EVENT
    case "PUT_DATA_EVENT":
      return {
        ...state,
        eventSaved: payload,
      };
    default:
      return state;
  }
}

function searchEventForCalendar(allEvents, dateForCalendar, visibleMod) {
  if (visibleMod) {
    console.log("argumento", dateForCalendar);
    const EventSaved = allEvents.filter((e) => {
      const dateCurrent = e.schedule.split("T")[0];
      console.log("convertido", dateCurrent);
      if (dateCurrent === dateForCalendar) return e;
      else return null;
    });
    return EventSaved;
  } else {
    return dateForCalendar;
  }
}

export default reducers;
