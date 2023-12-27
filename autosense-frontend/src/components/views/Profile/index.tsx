import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppActions, RootState } from 'store';
import { Button, ButtonGroup, FormContainer, Input, InputGroup } from 'components/common';
import { IUser } from 'types';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<Partial<IUser>>({});

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  useEffect(() => {
    setUserData(() => ({...user}));
  }, [user])

  const changeAccount = () => {
    dispatch(AppActions.user.updateUser(userData));
  }

  const logout = () => {
    dispatch(AppActions.user.logoutUser());
  }

  const deleteAccount = () => {
    dispatch(AppActions.user.deleteUser());
  }

  return (
    <FormContainer>
      <h1 className='font-sans tracking-wider m-0 divide-x'>Profile</h1>
      <InputGroup>
        <label>First Name</label>
        <Input 
          hide = 'true'
          type='text'
          name="firstName"
          placeholder='First Name' 
          value={userData.firstName || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>Last Name</label>
        <Input 
          hide = 'true'
          type='text' 
          name="lastName" 
          placeholder='Last Name'
          value={userData.lastName || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>Phone Number</label>
        <Input 
          hide = 'true'
          type='text' 
          name="phoneNumber"
          placeholder='Phone Number' 
          value={userData.phoneNumber || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>Address</label>
        <Input 
          hide = 'true'
          type='text' 
          name="address"
          placeholder='Address' 
          value={userData.address || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <ButtonGroup>
        <Button primary='true' className='mt-2rem' type='button' onClick={changeAccount}>save</Button>
        <Button warning='true' className='mt-2rem' type='button' onClick={logout}>logout</Button>
        <Button danger='true' className='mt-2rem' type='button' onClick={deleteAccount}>delete account</Button>
      </ButtonGroup>
    </FormContainer>
  )
}