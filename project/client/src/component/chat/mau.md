/*  useEffect(() => {
    socket.on("updateMessages", (data) => {
      setMessage(data);
    });

    axios.get("http://127.0.0.1:5000/api/messages").then((response) => {
      setMessage(response.data);
    });
    return () => socket.disconnect();
  }, []);
  console.log('alldata', message) */



    /*  const lastData =
    messages?.[messages.length - 1]?.["messagesByDate"]?.[
      messages[messages.length - 1]["messagesByDate"].length - 1
    ];
  const content = lastData ? lastData.content : null;
  const to = lastData ? lastData.to : null;
  const name = to && to.includes(user._id) ? lastData.name : null; */
  /*  console.log("lastData", lastData);
  console.log("name", name);
  console.log("to", to); */

  // hàm ý tưởng gộp 2 trường hợp người nhận gửi và người gửi nhận
  // th1
  /*  const combinedIdsth1 = members.map((item) => {
     return { to: `${user._id}-${item._id}` };
   });
   console.log("combinedIdsth1", combinedIdsth1);
   //th2
   const combinedIdsth2 = members.map((item) => {
     return { to: `${item._id}-${user._id}` };
   });
   console.log("combinedIdsth2", combinedIdsth2); */