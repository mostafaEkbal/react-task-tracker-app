import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';

const SignIn = () => {
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
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  const handleSumbit = async e => {
    e.preventDefault();
    setError('');

    try {
      await authUser(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
        <p className='py-2'>
          Don't have an account yet?{' '}
          {
            <Link to='/signup' className='underline'>
              Sign up.
            </Link>
          }
        </p>
      </div>
      <form className='signin-form' onSubmit={handleSumbit}>
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
            <label className='py-2 font-medium'>Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              className='border p-3'
              type='password'
            />
          </div>
        </div>
        <button className='signin-btn'>Sign In</button>
        <button className='signin-btn' onClick={onClickButton}>
          Sign In with google
        </button>
      </form>
    </div>
  );
};

export default SignIn;
