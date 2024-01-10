import { useEffect, useState } from "react";

export default function History() {
    const [paths, setPaths] = useState([]);
    useEffect(() => {
        const response = fetch('http://localhost:4000/history', {credentials: 'include'}).then(response => {
            response.json().then(res => {
                setPaths(res);
                console.log(res);
            });
        });
        if(response.ok) {
            console.log("successfully get history paths from server");
        }
    },[]);

    function ImageList({ imagePaths }) {
        if (!imagePaths) {
            return <></>
        } else {
            return (
                <div>
                  {imagePaths.map((path, index) => (
                    <img key={index} src={path} alt={`Image ${index}`} className='history_memes'/>
                  ))}
                </div>
              );
        }
      }

    return (
        <div> <ImageList imagePaths={paths} /> </div>
    );
}