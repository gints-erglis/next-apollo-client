import React, { useState } from 'react';
import gql from 'graphql-tag'
import Register from "./register";
import { useRouter } from '../../utils/useRouter'

function Profile() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(5);
  const router = useRouter();
  return (
    <div>
      <p>{router.query.id}</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count * 2)}>
        Click me
      </button>
    </div>
  );
}


export default Profile;