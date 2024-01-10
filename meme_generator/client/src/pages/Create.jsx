import Navigator from '../navigation/Navigator';
import "./style_create.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import arrow from './next.png';
import black_template from '../template_img/black_template.jpg'
import white_template from '../template_img/white_template.jpg'
import yellow_man from '../template_img/yellow_man.jpg'

export default function Create() {
    const [templateSrc, setTemplateSrc] = useState('');
    // templateNum is for switching the template
    const [templateNum, setTemplateNum] = useState('');
    // paths saved all paths of templates in database
    const [paths, setPaths] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setPaths([black_template, white_template, yellow_man]);
        setTemplateNum(0);
    },[]);

    useEffect(() => {
        setTemplateSrc(paths[templateNum]);
    },[templateNum]);

    async function handleTemplate(ev) {
        ev.preventDefault();
        const fileInput = document.getElementById('templateInput');
        if (fileInput.files.length === 0) {
            console.log(`no files chosen`);
            return;
        }
        const path = URL.createObjectURL(fileInput.files[0]);
        setPaths((prevPaths) => [...prevPaths, path]);
        setTemplateNum(paths.length);
    }

    const handleImageError = () => {
        console.log('Image failed to load');
      };

    // switch to next template
    const handleNext = () => {
        if ((templateNum+1) === paths.length) {
            setTemplateNum(0);
        } else {
            setTemplateNum(templateNum+1);
        }
    }

    async function handleCreate(ev) {
        ev.preventDefault();
        const meme_path = templateSrc;
        const history = meme_path;
        const response = await fetch('http://localhost:4000/create', {
            method: 'POST',
            body: JSON.stringify({meme_path}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.ok) {
            console.log('successfully create meme');
        }

        fetch('http://localhost:4000/profile', {
        credentials: 'include', 
        }).then(response => {
            response.json().then(user_info => {
            const email = user_info.email;
            if(email !== null) {
                fetch('http://localhost:4000/history', {
                    method: 'POST',
                    body: JSON.stringify({email, history}),
                    headers: {'Content-Type':'application/json'},
                    }).then(res => {if(res.ok) {console.log('add history path to user')}});
            }
            });
        });

        navigate('/');
    }

    return (
        <> 
            <Navigator />
            <div>
                <input type='file' accept="image/*" id='templateInput'></input>
                <button className='upload_button' onClick={handleTemplate}>upload template</button>
            </div>
            <div className='create_div'>
                <img className='templatePic' alt="template for creating new meme" src={templateSrc} onError={handleImageError} />
                <img className='arrow' alt="arrow to switch template" src={arrow} onClick={handleNext}/>
            </div>
            <div className='button_div'>
                <button className='create_button' onClick={handleCreate}>create new Meme</button>
            </div>
        </>
    );
}