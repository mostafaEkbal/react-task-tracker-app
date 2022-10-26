/* eslint-disable jsx-quotes */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
// eslint-disable-next-line linebreak-style
import { UserAuth } from '../contexts/AuthContext';

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { authUser } = UserAuth();
  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const onClickButton = async e => {
    e.preventDefault();
    setError('');
    try {
      await signInWithGoogle();
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
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
        <p className='py-2'>
          Don&apos;t have an account yet?
          <Link to='/signup' className='underline'>
            Sign up.
          </Link>
        </p>
      </div>
      <form className='signin-form' onSubmit={handleSumbit}>
        <button className='signin-btn' onClick={onClickButton}>
          <span>Sign In with google</span>
          <FcGoogle size='20' />
        </button>
        <p style={{ alignSelf: 'center' }}>Or</p>
        <hr />
        <div>
          <div>
            <label className='py-2 font-medium'>Email Address</label>
            <input
              onChange={e => setEmail(e.target.value)}
              className='border p-3'
              type='email'
            />
          </div>
          <div className=''>
            <label htmlFor='password' className='py-2 font-medium'>
              {' '}
            </label>
            <input
              onChange={e => setPassword(e.target.value)}
              className='border p-3'
              type='password'
            />
          </div>
        </div>
        <button type='submit' className='signin-btn'>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
