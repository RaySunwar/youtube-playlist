import React, { useState, useEffect } from 'react';

import { AiFillYoutube } from "react-icons/ai";

import styles from "./App.module.css";

const YOUTUBE_PLAYLIST_ITEMS_API =  "https://www.googleapis.com/youtube/v3/playlistItems";

let inputRef = React.createRef();

const App = () => {
  const [data, setData] = useState([]);
  const [plButtonClick, setPlbuttonClick] = useState();

  const handleClick = () => {
    setPlbuttonClick(inputRef.current.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${plButtonClick}&maxResults=20&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
      const res = await result.json();
      console.log("Res: ", res);

      setData(res.items);
    };

    if(plButtonClick) fetchData();
  },[plButtonClick]);

  return(
    <div className={styles.container} >
          <div className={styles.container} >
      <h1><a href="http://localhost:3000/"> YouTube <AiFillYoutube /> Playlist</a></h1>
      <form className={styles.ytubeform}>
        <input ref={inputRef} className={styles.ytubeSearch} type="text"  placeholder="Paste youtube channel id here..." ></input>
        <button onClick={handleClick} className={styles.sbutton} type="button">Submit</button>
      </form>

      <div>
        <ListItem response = {data} />
      </div>
    </div>
    </div>
  );
};

const ListItem = (props) => {
  const response = props.response;
  const listItems = (
    <ul className={styles.grid}>
      {response && response.map((item) => {
        console.log("Item", item);
          const { id, snippet } = item;
          const { title, thumbnails = {}, resourceId } = snippet;
          const { medium = {} } = thumbnails;
          
          return(
            <li key={id} className={styles.card}>
              <h3>
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`} target="_blank" without={IDBCursorWithValue.toString()} rel="noopener noreferrer">
                  <p><img width={medium.width} height={medium.height} src={medium.url} alt="" /></p>
                  {title}
                </a>
              </h3>
            </li>
          )
        })
      };
    </ul>
  );

  return(
    <div>{listItems}</div>
  );
};

export default App;