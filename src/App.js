import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import Post from './post';


const BASE_URL = 'http://localhost:8000/'

function App() {

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + 'post/all')
    .then(response => {
      const json = response.json()
      console.log(json);
      if (response.ok) {
        return json
      }
      throw response
    })
    .then(data => {
      const result = data.sort((a, b) => {
        const t_a = a.timestamp.split(/[-T:]/);
        const t_b = b.timestamp.split(/[-T:]/);
        const d_a = new Date(Date.UTC(t_a[0], t_a[1]-1, t_a[2], t_a[3], t_a[4], t_a[5]))
        const d_b = new Date(Date.UTC(t_b[0], t_b[1]-1, t_b[2], t_b[3], t_b[4], t_b[5]))
        return d_b - d_a
      })
      return result
    })
    .then(data => {
      setPosts(data)
    })
    .catch(error => {
      console.log(error);
      alert(error)
    })
  }, [])


  return (
    <div className='app'>
      <div className='app_header'>
        <img className='app_headerImage'
          src="https://camo.githubusercontent.com/9cf795df7da35d57df8c6f17883d3c3a4cbe9611716ad62f149d08ec3de2fa59/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647277623139637a6f2f696d6167652f75706c6f61642f76313539313437363937352f4e65775f50726f6a6563745f315f796b3234626a2e706e67"
          alt='Instaclone'/>

        <div>
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
          <Button onClick={() => setOpenSignUp(true)}>Signup</Button>
        </div>
      </div>
      <div className='app_posts'>
        {
          posts.map(post => (
            <Post
              post={post}
            />
          ))
        }
        </div>
      </div>
  );
}

export default App;
