import './style_home.css';
import Navigator from '../../navigation/Navigator';
import Search from '../../search/search';
import { useEffect, useState } from 'react';

export default function Home() {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const response = fetch('http://localhost:4000/meme', {}).then(response => {
            response.json().then(res => {
                setPaths(res.responsePaths);
            });
        });
    },[]);

    function ImageList({ imagePaths }) {
        return (
          <div>
            {imagePaths.map((path, index) => (
              <img key={index} src={path} alt={`Image ${index}`} className='memes'/>
            ))}
          </div>
        );
      }

    return(
        <div id="Home">
            <Navigator />
            <Search />
            <div className='div_memes'>
                <ImageList imagePaths={paths} />
            </div>
        </div>
    );
}