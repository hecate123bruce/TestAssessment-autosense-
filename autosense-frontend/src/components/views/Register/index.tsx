import React, { ChangeEvent, useEffect, useState } from 'react';

import { Button, ButtonGroup, ErrorList, FormContainer, Input, InputGroup } from 'components';
import { IUser } from 'types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

interface IUserData extends IUser {
  confirmPassword: string,
}

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const [userData, setUserData] = useState<Partial<IUserData>>({});
  const { errors, isAuthenticated } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (isAuthenticated) {
      nevigate('/profile');
    }
  }, [isAuthenticated])

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const registUserData = () => {
    if (userData.password === userData.confirmPassword) {
      dispatch(AppActions.user.createUser(userData));
      if (errors.length === 0) {
        nevigate('/login');
      }
    } else {
      dispatch(AppActions.user.loginError(['confirm password is not matched']))
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {!!errors.length && 
        <ErrorList>
          {errors.map((error, index) => (<li key={index}>{error}</li>))}  
        </ErrorList>
      }
      <InputGroup>
        <label>Email</label>
        <Input 
          type='email' 
          name="email"
          placeholder='Email' 
          value={userData.email || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>First Name</label>
        <Input 
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
          type='text' 
          name="address"
          placeholder='Address' 
          value={userData.address || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>Password</label>
        <Input 
          type='password' 
          name="password" 
          placeholder='Password'
          value={userData.password || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <InputGroup>
        <label>Confirm Password</label>
        <Input 
          type='password' 
          name="confirmPassword"
          placeholder='Confirm Password' 
          value={userData.confirmPassword || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <ButtonGroup>
        <Button primary='true' type='button' onClick={registUserData}>Register</Button>
      </ButtonGroup>
      <div>
        go to <Link to='/login'>Login</Link>
      </div>
    </FormContainer>
  )
}