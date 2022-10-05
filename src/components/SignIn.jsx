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
      navigate('/account');
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
      <form onSubmit={handleSumbit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input
            onChange={e => setEmail(e.target.value)}
            className='border p-3'
            type='email'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            className='border p-3'
            type='password'
          />
        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign In
        </button>
        <button onClick={onClickButton}>Sign In with google</button>
      </form>
    </div>
  );
};

export default SignIn;
