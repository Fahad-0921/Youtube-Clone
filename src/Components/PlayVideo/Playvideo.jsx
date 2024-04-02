import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import { useParams } from "react-router-dom";


const Playvideo = () => {

  const { videoId } = useParams();

  const [dataApi, setdataApi] = useState(null);
  const [channeldata, setchanneldata] = useState(null);
  const [commentdata, setcommentdata] = useState([]);


  // fetching video data----
  const fetchvideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setdataApi(data.items[0]));
  };


 // fetching channel data----
  const fetchotherData = async () => {
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${dataApi.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url)
      .then((res) => res.json())
      .then((data) => setchanneldata(data.items[0]));

       // fetching comment data----
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setcommentdata(data.items));
    };


  useEffect(() => {
    fetchvideoData();
  }, [ videoId ]);


  useEffect(() =>{
    fetchotherData();
  },[dataApi])



  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h3>{dataApi ? dataApi.snippet.title : "Title here!"}</h3>
      <div className="play-video-info">
        <p>
          {dataApi ? value_converter(dataApi.statistics.viewCount): "200k"}
          views &bull; 2 days agoo
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {dataApi ? value_converter(dataApi.statistics.likeCount) : "200"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channeldata ? channeldata.snippet.thumbnails.default.url: ""} alt="" />
        <div>
          <p>{dataApi ? dataApi.snippet.channelTitle: "" }</p>
          <span>{channeldata ? value_converter(channeldata.statistics.subscriberCount): "1M"} Subscriber</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
         {dataApi ? dataApi.snippet.description.slice(0, 600): "Description here!"}
        </p>
        <hr />
        <h4> {dataApi ? value_converter(dataApi.statistics.commentCount) : "200"}  Comments</h4>

        {commentdata.map((item, index)=>{
  
        return(

        <div key={index} className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} />
          <div>
            <h3>
              {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
            </h3>
            <p>
             {item.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>

        )

        })}


      </div>
    </div>
  );
};

export default Playvideo;
