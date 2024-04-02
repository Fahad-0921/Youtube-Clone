import React, { useEffect, useState } from 'react';
import './Feed.css';
import {Link} from 'react-router-dom';
import { API_KEY } from '../../data';


const Feed = ({category}) => {

    const [data, setdata] = useState([]);

const fetchData = async () =>{
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
    await fetch(videoList_url).then(response => response.json()).then(data => setdata(data.items))
} 

useEffect(() =>{

fetchData();

},[category])

  return (
    <div className='feed'>


{data.map((items, index) =>{

return(
        <Link key={index} to={`video/${items.snippet.categoryId}/${items.id}`} className='card'>
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <h2>{items.snippet.title}</h2>
            <h3>{items.snippet.channelTitle}</h3>
            <p>2000000 views &bull; {items.snippet.publishedAt}</p>
        </Link>
);
} )}

      
    </div>
  ) 
}

export default Feed
