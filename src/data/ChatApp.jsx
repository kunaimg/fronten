import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import $ from "jquery";
import messageSound from "../../public/tune.wav";
import messageSoundd from "../../public/tune2.wav";
const audio = new Audio(messageSound);
const audioo = new Audio(messageSoundd);

function ChatApp() {
  const chatContainerRef = useRef(null);
  const [name, setName] = useState();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [so, setso] = useState();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  useEffect(() => {
    setFile(localStorage.getItem("image"));
    setName(localStorage.getItem("name"));
  }, [name, file]);

  useEffect(() => {
    const socket = io("https://lastchat-ef8b.onrender.com/");

    socket.emit("newuser-join", {
      name: localStorage.getItem("name"),
      image: localStorage.getItem("image"),
    });

    setso(socket);

    socket.on("sabhidekhonewuser", (data) => {
      $(".boxes").append(`
          <div class="box1">
            <h6>
              <div class="row">
                <div class="col-9">
                  <p class="p">
                  <b>${data.name}</b>:new user joined
                  </p>
                </div>
                <div class="col-3">
                  <img src="./${data.image}" alt="" />
                </div>
              </div>
            </h6>
          </div>
        `);
      audioo.play();
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
    socket.on("usermessagedekho", (data) => {
      $(".boxes").append(`
        <div class="box1">
          <h6>
            <div class="row">
              <div class="col-9">
                <p class="p">
                <b>${data.name}</b>:${data.message}
                </p>
              </div>
              <div class="col-3">
                <img src="./${data.image}" alt="" />
              </div>
            </div>
          </h6>
        </div>
      `);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
    socket.on("sabhidekhonewuserr", (data) => {
      $(".boxes").append(`
          <div class="box1">
            <h6>
              <div class="row">
                <div class="col-9">
                  <p class="p">
                  <b>${data.name}</b>:User disconnected
                  </p>
                </div>
                <div class="col-3">
                  <img src="./${data.image}" alt="" />
                </div>
              </div>
            </h6>
          </div>
        `);
      audioo.play();
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
  }, []);
  function submit() {
    so.emit("send", message);
    setFile(file);
    $(".boxes").append(`
    <div class="box2">
      <h6>
        <div class="row">
          <div class="col-9">
            <p class="p">
              ${name}: <b>${message}</b>
            </p>
          </div>
          <div class="col-3">
            <img src="./${file}" alt="" />
          </div>
        </div>
      </h6>
    </div>

  `);
    audio.play();
    setMessage("");
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }
  function filed(e) {
    setMessage(e.target.value);
  }

  return (
    <div>
      <div className="chat">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 style={{ textAlign: "center", marginTop: "0.5rem" }}>
                Chat i
              </h2>
            </div>
            <div className="col-12 boxes" ref={chatContainerRef}>
              <div
                className="box1 main"
                style={{
                  textAlign: "center",
                }}
              >
                <h6>
                  <div className="row">
                    <div className="col-9">
                      <p
                        className="p"
                        style={{ fontSize: "1.1rem", color: "blue" }}
                      >
                        {" "}
                        Welcom in ichat : <b>{name}</b>
                      </p>
                    </div>
                    <div className="col-3">
                      <img src={`./${file}`} alt="" />
                    </div>
                  </div>
                </h6>
              </div>
            </div>
            <div className="col-12 textfield">
              <TextField
                value={message}
                color="secondary"
                fullWidth
                label={"type here"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SendIcon onClick={submit} sx={{ cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                }}
                onChange={filed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
