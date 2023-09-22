import React, { useState } from "react";
import io from "socket.io-client";

function Socket() {
  const [data, setData] = useState();
  //   const message = socket.on("message", (data) => {
  //     setData(data);
  //   });
  //   setTimeout(() => {
  //     socket.emit("message", "hello sahil");
  //   }, 3000);
  //   socket.on("broadcast", (data) => {
  //     setData(data);
  //   });
  //   socket.on("namespace", (data) => {
  //     setData(data);
  //   });
  function server1() {
    const socket1 = io("http://localhost:2000/kunal");
    socket1.on("enterroom", (data) => {
      setData(data);
    });
  }
  function server2() {
    const socket2 = io("http://localhost:3000/kunal");
    socket2.on("enterroomm", (data) => {
      setData(data);
    });
  }

  return (
    <div>
      <button onClick={server1}>server1 conncect</button>
      <button onClick={server2}>server2 conncect</button>
      {data}
    </div>
  );
}

export default Socket;
