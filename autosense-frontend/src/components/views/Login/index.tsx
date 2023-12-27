import React, { ChangeEvent, useEffect, useState } from 'react';

import { Button, ButtonGroup, ErrorList, FormContainer, Input, InputGroup } from 'components';
import { IUser } from 'types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

interface IUserData extends IUser {
  confirmPassword: string,
}

export const Login: React.FC = () => {
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
  
  const loginUserData = () => {
    dispatch(AppActions.user.login(userData));
  }

  return (
    <FormContainer>
      <h1>Login</h1>
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
        <label>Password</label>
        <Input 
          type='password' 
          name="password" 
          placeholder='Password'
          value={userData.password || ''} 
          onChange={handleUserChange} 
        />
      </InputGroup>
      <ButtonGroup>
        <Button primary='true' type='button' onClick={loginUserData}>Login</Button>
      </ButtonGroup>
      <div>
        go to <Link to='/register'>register</Link>
      </div>
    </FormContainer>
  )
}