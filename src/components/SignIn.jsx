import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';
import { UserAuth } from '../contexts/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const { authUser } = UserAuth();
  const { signInWithGoogle, signInWithFacebook } = UserAuth();
  const navigate = useNavigate();

  const onClickButtonG = async e => {
    e.preventDefault();
    setError('');
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const onClickButtonF = async e => {
    e.preventDefault();
    setError('');
    try {
      await signInWithFacebook();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSumbit = async e => {
    e.preventDefault();
    setError('');

    try {
      await authUser(email, password);
      navigate('/');
    } catch (err) {
      setError(err);
    }
  };

  const checkError = errorCode => {
    let errorMessage = '';
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid Email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Wrong Password, Try Again';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User Not Found';
    }
    if (errorCode) {
      return <div className='signin-error'>{errorMessage}</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
        <p className='py-2'>
          Don&apos;t have an account yet?{' '}
          <Link to='/signup' className='underline'>
            Sign up.
          </Link>
        </p>
      </div>
      <form className='signin-form' onSubmit={handleSumbit}>
        <button
          className='signin-btn signin-btn--white'
          onClick={onClickButtonG}>
          <span>Sign In with Google</span>
          <FcGoogle size='20' />
        </button>
        <button
          className='signin-btn signin-btn--white'
          onClick={onClickButtonF}>
          <span>Sign In with Facebook</span>
          <ImFacebook size='20' />
        </button>
        <p style={{ alignSelf: 'center' }}>Or</p>
        <hr />
        <div>
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
            <label htmlFor='password' className='py-2 font-medium'>
              Password
            </label>
            <input
              onChange={e => setPassword(e.target.value)}
              className='border p-3'
              type='password'
            />
          </div>
        </div>
        <button onClick={handleSumbit} className='signin-btn'>
          <span>Sign In</span>
        </button>
      </form>
    </div>
  );
}

export default SignIn;
