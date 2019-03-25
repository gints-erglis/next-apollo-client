import React, { useState } from 'react';
import gql from 'graphql-tag'
import Register from "./register";

function Profile() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(5);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count * 2)}>
        Click me
      </button>
    </div>
  );
}

export default Profile;