import React, {useState, useEffect} from 'react';
import { Button, Modal, makeStyles, Input } from '@material-ui/core';
import './App.css';
import Post from './post';


const BASE_URL = 'http://localhost:8000/'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing[2, 4, 3]
  }
}))

function App() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [modalStyle, setModalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authToken , setAuthToken] = useState(null)
  const [authTokenType, setAuthTokenType] = useState(null)
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')

  function initializeAuthState() {
    const storedAuthToken = window.localStorage.getItem('authToken');
    const storedAuthTokenType = window.localStorage.getItem('authTokenType');
    const storedUsername = window.localStorage.getItem('username');
    const storedUserId = window.localStorage.getItem('userId');
  
    if (storedAuthToken && storedAuthTokenType && storedUsername && storedUserId) {
      setAuthToken(storedAuthToken);
      setAuthTokenType(storedAuthTokenType);
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
  }

  useEffect(() => {
    initializeAuthState();
  }, []);
  

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

  const signIn = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + 'login', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data);
        setAuthToken(data.access_token)
        setAuthTokenType(data.token_type)
        setUserId(data.user_id)
        setUsername(data.username)
      })
      .catch(error => {
        console.log(error);
          alert(error)
      })

    setOpenSignIn(false);
  }

  const signOut = (event) => {
    setAuthToken(null)
    setAuthTokenType(null)
    setUserId('')
    setUsername('')
  }

  const signUp = (event) => {
    
  }


  return (
    <div className='app'>

      <Modal
        open={openSignIn}
        onClose = {() => setOpenSignIn(false)}>

          <div style={modalStyle} className={classes.paper}>
            <form className='app_signin'>
              <center>
                <img className='app_headerImage'
                  src="https://camo.githubusercontent.com/9cf795df7da35d57df8c6f17883d3c3a4cbe9611716ad62f149d08ec3de2fa59/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647277623139637a6f2f696d6167652f75706c6f61642f76313539313437363937352f4e65775f50726f6a6563745f315f796b3234626a2e706e67"
                  alt='Instaclone'/>
              </center>
              <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button
              type='submit'
              onClick={signIn}>Login</Button>
            </form>
          </div>

        </Modal>

        <Modal
        open={openSignUp}
        onClose = {() => setOpenSignUp(false)}>

          <div style={modalStyle} className={classes.paper}>
            <form className='app_signin'>
              <center>
                <img className='app_headerImage'
                  src="https://camo.githubusercontent.com/9cf795df7da35d57df8c6f17883d3c3a4cbe9611716ad62f149d08ec3de2fa59/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647277623139637a6f2f696d6167652f75706c6f61642f76313539313437363937352f4e65775f50726f6a6563745f315f796b3234626a2e706e67"
                  alt='Instaclone'/>
              </center>
              <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button
              type='submit'
              onClick={signUp}>Sign up</Button>
            </form>
          </div>

        </Modal>

      <div className='app_header'>
        <img className='app_headerImage'
          src="https://camo.githubusercontent.com/9cf795df7da35d57df8c6f17883d3c3a4cbe9611716ad62f149d08ec3de2fa59/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647277623139637a6f2f696d6167652f75706c6f61642f76313539313437363937352f4e65775f50726f6a6563745f315f796b3234626a2e706e67"
          alt='Instaclone'/>

        {authToken ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpenSignUp(true)}>Signup</Button>
          </div>
          )
        }
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
