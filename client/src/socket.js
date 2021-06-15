import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  displayTypingStatus,
} from "./store/conversations";

// autoConnect set to false so that the connection is not established immediately.
// Connection will be manually established using socket.connect() in login/register thunks.
const socket = io(window.location.origin, { autoConnect: false });

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on('typing-status', (data) => {
    store.dispatch(displayTypingStatus(data.sender, data.boolean))
  })
});

export default socket;
