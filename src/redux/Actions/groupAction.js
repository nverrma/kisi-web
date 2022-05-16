import { types } from "../constants"
import Kisi from "kisi-client";
import axios from "axios";
const kisiClient = new Kisi()


// export const doors = () => {
//   return async (dispatch) => {
//     kisiClient
//       .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
//       .then((client) => {
//         kisiClient
//           .get("places")
//           .then(places => console.log("placess here man-->", places))

//         kisiClient
//           .get("groups")
//           .then(place => {
//             dispatch({
//               type: types.GROUP_DATA,
//               payload: place
//             })
//           })

//         kisiClient
//           .get("locks")
//           .then(door => console.log("places one here man ssssssssss-->", door))

//         kisiClient
//           .get(`group_locks?group_id=${parseInt(39516)}`)
//           .then(org => console.log("id of group-->", org))
//         kisiClient
//           .post(`group_locks`, {
//             data: data
//           })
//           .then(org => console.log("id of group-->", org))
//         kisiClient
//           .get("organizations")
//           .then(org => console.log("places one here man-->", org))
//       }).catch((err) => {
//         console.log("errror of kisi", err)
//       })
//   }
// }


export const groupss = () => {
  return async (dispatch) => {
    kisiClient
      .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
      .then((client) => {
        kisiClient
          .get("groups")
          .then(place => {
            dispatch({
              type: types.GROUP_DATA,
              payload: place
            })
          })
      })
  }
}

export const getGroupLocks = (id) => {
  return async (dispatch) => {
    kisiClient
      .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
      .then((client) => {
        kisiClient
          .get(`group_locks?group_id=${parseInt(id)}`)
          .then(place => {
            dispatch({
              type: types.GROUP_LOCKS_DATA,
              payload: place
            })
          })
      })
  }
}

export const deleteGroupLocks = (id) => {
  return async (dispatch) => {
    kisiClient
      .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
      .then((client) => {
        kisiClient
          .delete(`group_locks/${parseInt(id)}`)
          .then(deletelock => {
            dispatch({
              type: types.GROUP_LOCKS_DATA_DELETE,
              payload: deletelock
            })
          })
      })
  }
}

export const placeLocks = (id) => {
  return async (dispatch) => {
    kisiClient
      .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
      .then((client) => {
        kisiClient
          .get(`places`)
          .then(places => {
            dispatch({
              type: types.GROUP_PLACES,
              payload: places
            })
          })
      })
  }
}

export const getLocks = () => {
  return async (dispatch) => {
    kisiClient
      .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
      .then((client) => {
        kisiClient
          .get(`locks`)
          .then(locks => {
            dispatch({
              type: types.GROUP_LOCKS,
              payload: locks
            })
          })
      })
  }
}

export const addlocks = (data) => {
  return async (dispatch) => {
    // kisiClient
    //   .signIn({ Authorization: "KISI-LOGIN 123", domain: 'test-task', email: "testaccount+16@kisi.io", password: "c9b29c70" })
    //   .then((client) => {
    //     kisiClient
    //       .post({url :'group_locks', Authorization: "123", body : data})
    //       .then(place => {
    //         console.log(" add lock groups-->", place)
    //         dispatch({
    //           type: types.GROUP_DATA,
    //           payload: place
    //         })
    //       })
    //   })
    axios({
      method: "post",
      url: 'https://api.kisi.io/group_locks',
      headers: { "Authorization": "123", "Content-Type": 'application/json', },
      data: data,
    }).then((res) => {
      
    })
  }
}