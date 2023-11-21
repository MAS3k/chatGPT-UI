import React, { useState, useEffect, useRef } from "react";
import { BiPlus, BiComment, BiUser, BiFace, BiSend } from "react-icons/bi";
import "./HomePage.css";

function HomePage() {
  const [text, setText] = useState("");
  const [tempText, settempText] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isMockResponse, setIsMockResponse] = useState(false);
  const [showChatGPTButton, setShowChatGPTButton] = useState(true);
  const [toggleBoxes, settoggleBoxes] = useState(true);

  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    settoggleBoxes(true);
    setMessage(null);
    setText("");
    setCurrentTitle(null);
    setIsMockResponse(false);
    setShowChatGPTButton(true);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText("");
    setIsMockResponse(false);
    setShowChatGPTButton(false);
  };

  const submitHandler = (e) => {
    settoggleBoxes(false);
    setText(tempText);
    e.preventDefault();
    if (!tempText) return;

    const mockResponse = {
      choices: [{ message: `Mock response for "${tempText}"` }],
    };

    setMessage(mockResponse.choices[0]);

    scrollToLastItem.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMockResponse(true);
    settempText(" ");
  };

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: text,
        },
        {
          title: currentTitle,
          role: "mock",
          content: message.message,
        },
      ]);
    }
  }, [message, currentTitle, text]);

  const currentChat = previousChats.filter(
    (prevChat) => prevChat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  );

  return (
    <div>
      <div className="container">
        <section className="sidebar">
          <div className="sidebar-header" onClick={createNewChat} role="button">
            <BiPlus size={20} />
            <button>New Chat</button>
          </div>
          <div className="sidebar-history">
            {uniqueTitles.length > 0 && <p>Today</p>}
            <ul>
              {uniqueTitles?.map((uniqueTitle, idx) => (
                <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
                  <BiComment />
                  {uniqueTitle.slice(0, 18)}
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-info">
            <div className="sidebar-info-upgrade">
              <BiUser />
              <p>Upgrade to Plus</p>
            </div>
            <div className="sidebar-info-user">
              <BiFace />
              <p>Abdullah@gmail.com</p>
            </div>
          </div>
        </section>

        <section className="main">
          {showChatGPTButton && !isMockResponse && (
            <div className="chatgptbutton">
              <div className="chatgpt3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="icon-sm transition-colors text-brand-green"
                  width="16"
                  height="16"
                >
                  <path
                    d="M9.586 1.526A.6.6 0 0 0 8.553 1l-6.8 7.6a.6.6 0 0 0 .447 1h5.258l-1.044 4.874A.6.6 0 0 0 7.447 15l6.8-7.6a.6.6 0 0 0-.447-1H8.542l1.044-4.874Z"
                    fill="#19c37d"
                  ></path>
                </svg>
                <p>GPT-3.5</p>
              </div>
              <div className="chatgpt4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="icon-sm transition-colors group-hover/button:text-brand-purple"
                  width="16"
                  height="16"
                >
                  <path
                    d="M12.784 1.442a.8.8 0 0 0-1.569 0l-.191.953a.8.8 0 0 1-.628.628l-.953.19a.8.8 0 0 0 0 1.57l.953.19a.8.8 0 0 1 .628.629l.19.953a.8.8 0 0 0 1.57 0l.19-.953a.8.8 0 0 1 .629-.628l.953-.19a.8.8 0 0 0 0-1.57l-.953-.19a.8.8 0 0 1-.628-.629l-.19-.953h-.002ZM5.559 4.546a.8.8 0 0 0-1.519 0l-.546 1.64a.8.8 0 0 1-.507.507l-1.64.546a.8.8 0 0 0 0 1.519l1.64.547a.8.8 0 0 1 .507.505l.546 1.641a.8.8 0 0 0 1.519 0l.546-1.64a.8.8 0 0 1 .506-.507l1.641-.546a.8.8 0 0 0 0-1.519l-1.64-.546a.8.8 0 0 1-.507-.506L5.56 4.546Zm5.6 6.4a.8.8 0 0 0-1.519 0l-.147.44a.8.8 0 0 1-.505.507l-.441.146a.8.8 0 0 0 0 1.519l.44.146a.8.8 0 0 1 .507.506l.146.441a.8.8 0 0 0 1.519 0l.147-.44a.8.8 0 0 1 .506-.507l.44-.146a.8.8 0 0 0 0-1.519l-.44-.147a.8.8 0 0 1-.507-.505l-.146-.441Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>GPT-4</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  class="icon-sm ml-0.5 transition-colors sm:ml-0 group-hover/options:text-gray-500 !text-gray-500 -ml-2 group-hover/button:text-brand-purple"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          {!currentTitle && <h1 className="HEADING">CHATGPT</h1>}

          <div className="main-header">
            <ul>
              {currentChat?.map((chatMsg, idx) => (
                <li key={idx} ref={scrollToLastItem}>
                  <p>{chatMsg.content}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="main-bottom">
            {toggleBoxes && (
              <div>
                <div className="Boxes">
                  <div className="boxe1">
                    <h5 className="h1">Hello</h5>
                    <h5 className="p"> How are you how may I help you</h5>
                  </div>
                  <div className="boxe1">
                    <h5 className="h1">Trip for america</h5>
                    <h5 className="p">yes we will go to the trip</h5>
                  </div>
                </div>
                <div className="Boxes">
                  <div className="boxe1">
                    <h5 className="h1">What's your favorite animal?</h5>
                    <h5 className="p">My favourite animal is Polar Bear</h5>
                  </div>
                  <div className="boxe1">
                    <h5 className="h1">What's your favorite memory of us?</h5>
                    <h5 className="p">Every memeory is favourite</h5>
                  </div>
                </div>
              </div>
            )}

            <form className="form-container" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Send a message."
                spellCheck="false"
                value={tempText}
                onChange={(e) => settempText(e.target.value)}
              />

              <button type="submit">
                <BiSend size={20} />
              </button>
            </form>
            <p>
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts. Created by ABDULLAH
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
export default HomePage;
