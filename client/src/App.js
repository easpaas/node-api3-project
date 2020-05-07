import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/users')
      .then(response => {
        console.log(response.data)
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="App">
      <h1>Posts from Lord of The Rings Characters</h1>
      <div className="post-container">
        {
          users.map(user => {
            return (
              <div key={user.id} className="post">
                <h2>{`User: ${user.name}`}</h2>
                <p>{`User Identification: ${user.id}`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
