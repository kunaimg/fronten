import React, { useEffect, useRef, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import $ from "jquery";
import first from "../../public/tune.wav";
import firstt from "../../public/tune2.wav";

import io from "socket.io-client";
const mess = new Audio(first);
const dis = new Audio(firstt);
let socket;
function Joinchat() {
  const [messval, setmessval] = useState();
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  useEffect(() => {
    socket = io("https://chaat-cprl.onrender.com");

    socket.emit("newuserjoin", {
      image: sessionStorage.getItem("image"),
      name: sessionStorage.getItem("name"),
    });
    socket.on("usermessagedekho", (data) => {
      $(".boxes").append(`<div class="box1">
    <div class="row">
      <div class="col-8">
        <h3>${data.name}:New User joined</h3>
      </div>
      <div class="col-4">
        <img
          src="https://chaat-cprl.onrender.com/uploads/${data.image}"
          alt=""
        />
      </div>
    </div>
  </div>`);
      dis.play();
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    socket.on("disusermessagedekho", (data) => {
      $(".boxes").append(`<div class="box1">
    <div class="row">
      <div class="col-8">
        <h3>${data.name}:user disconnected</h3>
      </div>
      <div class="col-4">
        <img
          src="https://chaat-cprl.onrender.com/uploads/${data.image}"
          alt=""
        />
      </div>
    </div>
  </div>`);
      dis.play();
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    socket.on("messagee", (data) => {
      console.log(data);
      $(".boxes").append(`<div class="box1">
    <div class="row">
      <div class="col-8">
        <h3>${data.name}:${data.message}</h3>
      </div>
      <div class="col-4">
        <img
          src="https://chaat-cprl.onrender.com/uploads/${data.image}"
          alt=""
        />
      </div>
    </div>
  </div>`);
      mess.play();
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  function send() {
    socket.emit("message", {
      message: messval,
      name: sessionStorage.getItem("name"),
      image: sessionStorage.getItem("image"),
    });

    $(".boxes").append(`<div class="box2">
    <div class="row">
      <div class="col-8">
        <h3>${sessionStorage.getItem("name")}:${messval}</h3>
      </div>
      <div class="col-4">
        <img
          src="https://chaat-cprl.onrender.com/uploads/${sessionStorage.getItem(
            "image"
          )}"
          alt=""
        />
      </div>
    </div>
  </div>`);
    mess.play();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setmessval("");
  }
  return (
    <div>
      <div className="chat">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 boxes" ref={chatContainerRef}>
              <div className="box3">
                <div className="row">
                  <div className="col-8">
                    <h3>{sessionStorage.getItem("name")}:welcome in ichat</h3>
                  </div>
                  <div className="col-4">
                    <img
                      src={`https://chaat-cprl.onrender.com/uploads/${sessionStorage.getItem(
                        "image"
                      )}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <TextField
                value={messval}
                onChange={(e) => setmessval(e.target.value)}
                color="secondary"
                className="field"
                fullWidth
                label={"type here"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SendIcon onClick={send} sx={{ cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Joinchat;
