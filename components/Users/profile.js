import React, { createContext, useEffect, useState, useContext } from 'react';
import gql from 'graphql-tag'
import { Form, Input, Drawer, Button } from 'antd'
import { useRouter } from '../../utils/useRouter'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'

const ProfileContext = React.createContext({
  drawerOpened: false,
  changeOpened: (opened) => {},

});
const ProfileProvider = ProfileContext.Provider;
const ProfileConsumer = ProfileContext.Consumer;

const GET_USER = gql`
  query User($id: ID!){
  getUser(id: $id){
    name
    email
    profile {
      firstName
      lastName
    }
  }
}
`
const UPDATE_USER = gql`
  mutation User($id: ID!, $name: String, $firstName: String, $lastName: String){
  updateUser (
    id: $id
    name: $name
    firstName: $firstName
    lastName: $lastName
  ){
    id
    name
  }
}
`

// Profile form
const ProfileForm = () => {
  const router = useRouter();
  const editProfile = useMutation(UPDATE_USER);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      id: router.query.id
    },
    suspend: false,
  });

  if (loading) {
    return <p>loading...</p>
  } else {
    const [name, setName] = useState(data.getUser.name);
    const [firstName, setFirstName] = useState(data.getUser.profile.firstName);
    const [lastName, setLastName] = useState(data.getUser.profile.lastName);
    return (
      <Form>
        <Form.Item>
          <Input
            id="name"
            name="name"
            value={name}
            placeholder="Username"
            onChange={e => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="First name"
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Last name"
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" onClick={() => {
          editProfile({
            variables: {
              id: router.query.id,
              name: name,
              firstName: firstName,
              lastName: lastName
            }
          }).then(
            result => {
              console.log(result)
            },
            error => {
              // error callback
            }
          );
          console.log(editProfile)
        }}>Save</Button>
      </Form>
    )
  }
}

// Profile drawer
const ProfileDrawer = () => {
  const drawer = useContext(ProfileContext)
  return (
    <Drawer
      title="Edit profile"
      placement="right"
      closable={false}
      onClose= {() => drawer.changeOpened(false)}
      visible={ drawer.drawerOpened }
    >
      <ProfileForm />
    </Drawer>
  )
}

// Profile panel
const ProfilePanel = () => {
  const [refreshed, setRefreshed] = useState(1);
  const context = useContext(ProfileContext)
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      id: router.query.id
    },
  });

  useEffect( () => {
    refetch()
  }, [refreshed] )

  if (loading) {
    return <p>loading...</p>
  } else {
    return (
      <>
        <h2>{ data.getUser.name}</h2>
        <Button type="primary" onClick={() => context.changeOpened(true)}>Edit</Button>
        <Button type="primary" onClick={() => setRefreshed(refreshed + 1)}>Refresh</Button>
      </>
    )
  }
}

// Compound component
const Profile = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const changeOpened = (opened) => {
    setDrawerOpened(opened);
  };
  return (
    <ProfileProvider
      value={{
        drawerOpened: drawerOpened,
        changeOpened: changeOpened
      }}
    >
      <ProfilePanel />
      <ProfileDrawer />
    </ProfileProvider>
  )
}

export default Profile;