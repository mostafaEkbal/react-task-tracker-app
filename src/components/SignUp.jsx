import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const onClickButton = async e => {
    e.preventDefault();
    setError('');
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (e) {
      setError(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (password === confirmPassword) {
      try {
        await createUser(email, password, name);
        navigate('/signin');
      } catch (e) {
        setError(e);
      }
    } else setError({ code: 'auth/password-dont-match' });
  };

  const checkError = errorCode => {
    let errorMessage = '';
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid Email';
        break;
      case 'auth/password-dont-match':
        errorMessage = "Password doesn't match, Try Again";
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak, should be at least 6 characters';
    }
    if (errorCode) {
      return <div className='signin-error'>{errorMessage}</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form className='signin-form' onSubmit={handleSubmit}>
        <button className='signin-btn signin-btn--white' onClick={onClickButton}>
          <span>Sign Up with Google</span>
          <FcGoogle size='20'></FcGoogle>
        </button>
      <p style={{ alignSelf: 'center' }}>Or</p>
        <hr />
        <div className=''>
          {checkError(error.code)}
          <div>
            <label className='py-2 font-medium'>Email Address</label>
            <input
              onChange={e => setEmail(e.target.value)}
              className='border p-3'
              type='email'
            />
          </div>
          <div>
            <label className='py-2 font-medium'>Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              className='border p-3'
              type='password'
            />
          </div>
          <div>
            <label className='py-2 font-medium'>Confirm Password</label>
            <input
              onChange={e => setConfirmPassword(e.target.value)}
              className='border p-3'
              type='password'
            />
          </div>
          <div>
            <label className='py-2 font-medium'>name</label>
            <input
              onChange={e => setName(e.target.value)}
              className='border p-3'
              type='text'
            />
          </div>
        </div>
        <button
          className='signin-btn'
          type='sumbit'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
