/** @format */

import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [prevchats, setPrevChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
      }),
    };

    try {
      if (value.trim().length === 0) {
        return;
      } else {
        console.log("!!!!sent request to api ");
        const response = await fetch(
          "http://localhost:8000/completions",
          options
        );
        const data = await response.json();
        console.log(data);
        setMessage(data.choices[0].message);
      }
    } catch (error) {
      console.log("an error occured on frontend", error);
    }
  };

  useEffect(() => {
    if (!currentTitle && message?.content) {
      setCurrentTitle(value);
    }

    if (currentTitle && message) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: value,
          title: currentTitle,
        },
        {
          role: message.role,
          content: message.content,
          title: currentTitle,
        },
      ]);
    }
  }, [currentTitle, message]);

  // console.log("prev chats array", prevchats);

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
        <nav>{!currentTitle && <p>Made by Mariam</p>}</nav>
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
            <div onClick={getMessages} id="submit">
              Send
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
