import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

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
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (password === confirmPassword) {
      try {
        await createUser(email, password, name);
        console.log(name);
        navigate('/account');
      } catch (e) {
        setError(e.message);
        console.log(error);
      }
    } else console.log('password dont match');
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className='py-2 font-medium'>Email Address</label>
          <input
            onChange={e => setEmail(e.target.value)}
            className='border p-3'
            type='email'
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className='py-2 font-medium'>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            className='border p-3'
            type='password'
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className='py-2 font-medium'>Confirm Password</label>
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            className='border p-3'
            type='password'
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className='py-2 font-medium'>name</label>
          <input
            onChange={e => setName(e.target.value)}
            className='border p-3'
            type='text'
          />
        </div>
        <button
          className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'
          type='sumbit'
          style={{ alignSelf: 'start' }}>
          Sign Up
        </button>
        <button onClick={onClickButton} style={{ alignSelf: 'start' }}>
          Sign Up with google
        </button>
      </form>
    </div>
  );
};

export default Signup;
