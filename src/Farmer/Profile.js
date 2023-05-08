import React, { useState } from "react";
import Style from "./style/Style.css";
const Profile = () => {
  const list = [
    {
      name: "photos",
      src: [
        "https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2021/5/SB/YW/AS/88400203/california-pistachios-500x500.jpg",
      ],
    },
    {
      name: "galleries",
      src: [
        "https://uploads-ssl.webflow.com/60a6bf8ff99a7114bef9523f/6279200cdc6241255e512f54_Articles%20Images%20Resizer%20(10).jpg",
        "https://uploads-ssl.webflow.com/60a6bf8ff99a7114bef9523f/6279200cdc6241255e512f54_Articles%20Images%20Resizer%20(10).jpg",
        "https://uploads-ssl.webflow.com/60a6bf8ff99a7114bef9523f/6279200cdc6241255e512f54_Articles%20Images%20Resizer%20(10).jpg",
        "https://uploads-ssl.webflow.com/60a6bf8ff99a7114bef9523f/6279200cdc6241255e512f54_Articles%20Images%20Resizer%20(10).jpg",
      ],
    },
    {
      name: "groups",
      src: [
        "https://cdn.foodaciously.com/static/stories/0e3c6ded-c9e4-4f27-8126-bd4cec7cf143/pistachios-2d654c376c5ac1b8c070dbc575327795-640-q60.jpg",
        "https://cdn.foodaciously.com/static/stories/0e3c6ded-c9e4-4f27-8126-bd4cec7cf143/pistachios-2d654c376c5ac1b8c070dbc575327795-640-q60.jpg",
        "https://cdn.foodaciously.com/static/stories/0e3c6ded-c9e4-4f27-8126-bd4cec7cf143/pistachios-2d654c376c5ac1b8c070dbc575327795-640-q60.jpg",
      ],
    },
    {
      name: "about",
      src: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8g4Y6QykYqWybC70MsbbSe2aBpARl-HteTQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8g4Y6QykYqWybC70MsbbSe2aBpARl-HteTQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8g4Y6QykYqWybC70MsbbSe2aBpARl-HteTQ&usqp=CAU",
      ],
    },
  ];
  const [correntName, setCorrentName] = useState("photos");
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Responsive Profile Page</title>
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      />
      {/* CSS */}
      <link rel="stylesheet" href="css/style.css" />
      <div className="header__wrapper">
        <header />
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src="https://saadli-wissem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdev-ed-wave.8ef6157c.jpg&w=1920&q=75"
                alt="Anna Smith"
              />
              <span />
            </div>
            <h2>Anna Smith</h2>
            <p>UX/UI Designer</p>
            <p>anna@example.com</p>
            <ul className="about">
              <li>
                <span>4,073</span>Followers
              </li>
              <li>
                <span>322</span>Following
              </li>
              <li>
                <span>200,543</span>Attraction
              </li>
            </ul>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum,
                nisl ligula egestas nulla.
              </p>
              <ul>
                <li>
                  <i className="fab fa-twitter" />
                </li>
                <i className="fab fa-pinterest" />
                <i className="fab fa-facebook" />
                <i className="fab fa-dribbble" />
              </ul>
            </div>
          </div>
          <div className="right__col">
            <nav>
              <ul>
                <li>
                  <a href="/">photos</a>
                </li>
                <li>
                  <a href="/">galleries</a>
                </li>
                <li>
                  <a href="/">groups</a>
                </li>
                <li>
                  <a href="/">about</a>
                </li>
              </ul>
              <button>Follow</button>
            </nav>
            <div className="photos">
              {list.map((item) => {
                if (item.name === "photos") {
                    for (let i=0;i<item.src.length;i++){
                        return <img src={item.src[i]} alt="Photo" />;
                    }
                }
                if (item.name === "galleries") {
                    for (let i=0;i<item.src.length;i++){
                        return <img src={item.src[i]} alt="Photo" />;
                    }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
