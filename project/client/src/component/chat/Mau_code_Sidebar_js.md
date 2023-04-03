const user = useSelector((state) => state.auth);
const auth = useSelector((state) => state.auth);
//const message = useSelector((state) => state.message);
// console.log("auth", user);
const [selectedButton, setSelectedButton] = React.useState(null);
const [message, setMessage] = useState([]);
const [comparearr, setComparearr] = useState([])
const [updatedPayload, setUpdatedPayload] = useState([]);
const [payload, setPayload] = useState([]);

const {
  socket,
  setMembers,
  members,
  setCurrentRoom,
  setRooms,
  privateMemberMsg,
  rooms,
  setPrivateMemberMsg,
  currentRoom,
  setMessages,
  messages,

} = useContext(AppContext);

const handleClick = (index) => {
  setSelectedButton(index);
};
const dispatch = useDispatch();




useEffect(() => {
  const intervalId = setInterval(() => {
    axios
      .get("http://127.0.0.1:5000/api/messages")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 1000);

  return () => clearInterval(intervalId);
}, []);
// console.log("[[]]", message);
// gộp tất cả đoạn chat có cùng nhóm chat vao với nhau
const result = message.reduce((acc, message) => {
  /* key cho object `acc` */
  const to = message.to;
  if (!acc[to]) {
    acc[to] = { to: to, _allMessages: [] };
  }
  acc[to]._allMessages.push(message);
  // Lấy tin nhắn cuối cùng trong mảng `_allMessages`
  acc[to]._recentMessage = acc[to]._allMessages.slice(-1)[0];
  return acc;
}, {});
/* console.log(JSON.stringify(result, null, 2));
 */
// console.log("result", result);

const resultArray = Object.values(result);
// console.log('arry', resultArray);
const toCompareresult = resultArray.map(item => {
  // Thêm thuộc tính recentMessage vào đối tượng được trả về của hàm map()
  return {
    to: item.to,
    recentMessage: item._recentMessage.content,
    date: item._recentMessage.date,
    time: item._recentMessage.time,
    // recent: item._recentMessage
  };
});
//console.log("toCompareresult", toCompareresult)
/* const toCompareArr1 = combinedIdsth1.map(item => item.to);
//console.log('toCompareArr1', toCompareArr1)
const toCompareArr2 = combinedIdsth2.map(item => item.to);
// console.log('toCompareArr2', toCompareArr2)

useEffect(() => {
  const tempSet = new Set();
  for (let i = 0; i < toCompareArr1.length; i++) {
    for (let j = 0; j < toCompareArr2.length; j++) {
      if (toCompareArr1[i] || toCompareArr2[j] === toCompareresult.includes(toCompareArr1[i])) {
        tempSet.add(toCompareArr1[i]);
        console.log('toCompare123', toCompareArr1[i]);
      }
    }
  }
  setComparearr(Array.from(tempSet));
}, [toCompareArr1, toCompareArr2, toCompareresult]);
*/

useEffect(() => {
  // gửi yêu cầu lấy tất cả tin nhắn đến server khi component được render
  socket.emit("get-all-messages");

  // lắng nghe sự kiện từ server trả về tất cả các tin nhắn được lấy ra từ database
  socket.on("all-messages", (messages) => {
    setMessages(messages);
  });

  // hủy lắng nghe sự kiện để tránh rò rỉ bộ nhớ
  return () => {
    socket.off("all-messages");
  };
}, []);

useEffect(() => {
  // console.log("All messages:", messages);
}, [messages]);
//console.log("members", members);
// console.log("privateMemberMsg", privateMemberMsg);
//console.log("messagesmessages", messages);

function joinRoom(room, isPublic = true) {
  if (!user) {
    return alert("Please login");
  }
  socket.emit("join-room", room, currentRoom);
  setCurrentRoom(room);

  if (isPublic) {
    setPrivateMemberMsg(null);
  }
  // dispatch for notifications
  dispatch(resetNotifications(room));
}

socket.off("notifications").on("notifications", (room) => {
  if (currentRoom != room) dispatch(addNotifications(room));
});

useEffect(() => {
  if (user) {
    setCurrentRoom("general");
    getRooms();
    socket.emit("join-room", "general");
    socket.emit("new-user");
  }
}, []);

// Hàm ý tưởng 
/* socket.off("new-user").on("new-user", (payload) => {
  // tạo chuỗi mới bằng cách nối chuỗi _id của payload với auth._id
  let authId = auth._id;
  const updatedPayload = payload.map(obj => ({
    ...obj, // giữ nguyên tất cả thuộc tính khác của đối tượng
    newId_to_1: obj._id + "-" + authId, // thêm thuộc tính newId mới
    newId_to_2: authId + "-" + obj._id // thêm thuộc tính newId mới
  }));

  // sử dụng updatedPayload để cập nhật state
  setMembers(updatedPayload);
}); */

// Hàm cấp 1 ý tưtưởng
// Cập nhật và nối 2 trường hợp tài khoản người dùng tức là định danh phòng chat đó

/*   socket.off("new-user").on("new-user", (payload) => {
    const authId = auth._id;
    let newId_to_1 = "";
    let newId_to_2 = "";
    const updatedPayload = payload.map(obj => {
      newId_to_1 = obj._id + "-" + authId;
      newId_to_2 = authId + "-" + obj._id;
      const tempArray = toCompareresult.filter(item => item.to === newId_to_1 || item.to === newId_to_2);
      return {
        ...obj,
        newId_to_1,
        newId_to_2,
        updatedArray: tempArray.concat(),
      };
    });
    setMembers(updatedPayload);
  });
 */

// Hàm cấp 2: fix lỗi cập nhật tin nhắn thời gian thực để hiển thị tin nhắn gần nhất
const handleNewUser = useCallback((data) => {
  setPayload(data);
}, []);

useEffect(() => {
  socket.on("new-user", handleNewUser);
  return () => {
    socket.off("new-user", handleNewUser);
  };
}, [socket, handleNewUser]);

const authId = auth._id;

useEffect(() => {
  let newId_to_1 = "";
  let newId_to_2 = "";
  const updatedPayload = payload.map(obj => {
    newId_to_1 = obj._id + "-" + authId;
    newId_to_2 = authId + "-" + obj._id;
    const tempArray = toCompareresult.filter(item => item.to === newId_to_1 || item.to === newId_to_2);
    return {
      ...obj,
      newId_to_1,
      newId_to_2,
      updatedArray: tempArray.concat(),
    };
  });
  setMembers(updatedPayload);
}, [payload, authId, toCompareresult, setMembers]);

function getRooms() {
  fetch("http://localhost:5000/rooms")
    .then((res) => res.json())
    .then((data) => setRooms(data));
}

function orderIds(id1, id2) {
  if (id1 > id2) {
    return id1 + "-" + id2;
  } else {
    return id2 + "-" + id1;
  }
}

function handlePrivateMemberMsg(member) {
  setPrivateMemberMsg(member);
  const roomId = orderIds(user._id, member._id);
  joinRoom(roomId, false);
}

if (!user) {
  return <></>;
}