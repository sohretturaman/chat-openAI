/** @format */

import { useEffect, useState } from "react";
import { getMessages } from "./services";

function App() {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [prevchats, setPrevChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("current title", currentTitle);
  }, [currentTitle, message, prevchats]);

  const getResponse = async () => {
    if (!currentTitle) {
      setCurrentTitle(value);
      console.log("if is worked", currentTitle);
    } else {
      setIsLoading(true);
      const MessageData = await getMessages(value);
      console.log("current title", currentTitle);
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: value,
          title: currentTitle ? currentTitle : value,
        },
        {
          role: MessageData.role,
          content: MessageData.content,
          title: currentTitle ? currentTitle : value,
        },
      ]);
      setIsLoading(false);
      setValue("");
    }
  };

  console.log("prev chats array", prevchats);

  const chatTitles = [...new Set(prevchats.map((prevChat) => prevChat.title))];

  const currentChat = prevchats.filter(
    (prevChat) => prevChat.title === currentTitle
  );
  const handleNewChat = () => {
    setCurrentTitle("");
    setMessage("");
    setValue("");
  };

  const handleCurrentTitle = (title) => {
    setCurrentTitle(title);
  };
  return (
    <div className="app">
      <section className="sidebar">
        <button onClick={handleNewChat}> + New Chat</button>

        <ul className="history">
          {chatTitles?.map((title, index) => (
            <li key={index} onClick={() => handleCurrentTitle(title)}>
              {title}
            </li>
          ))}
        </ul>
        <nav>
          {currentTitle ? <p>{currentTitle}</p> : <p>Made by Mariam</p>}
        </nav>
      </section>

      <section className="main">
        <h1>MariamGpt</h1>
        <ul className="feed">
          {currentChat?.map((prevChat, index) => (
            <li key={index}>
              <p className="role">{prevChat.role}</p>
              <br />
              <p className="content">{prevChat.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottomSection">
          <div className="inputContainer">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div onClick={getResponse} id="submit">
              {isLoading ? "loading.." : "send"}
            </div>
          </div>
          <p className="info">
            chat GPT Mar 14 version. Free Reasearch Preview. Our goal is make AI
            systems more natural and safe to interact with. Your feedback will
            help us improve.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
