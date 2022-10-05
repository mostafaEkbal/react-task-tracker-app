import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, toggleAdd, showAdd }) => {
  const location = useLocation();
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={!showAdd ? 'green' : 'red'}
          text={!showAdd ? 'Add' : 'close'}
          onClick={toggleAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

export default Header;
