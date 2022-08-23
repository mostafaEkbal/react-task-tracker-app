import { Route, Routes } from 'react-router-dom'
import Button from './Button';


const Header = ({ title, onAdd, showAdd}) => {

  return (
    <header className="header">
        <h1>{title}</h1>
        <Routes>
          <Route path='/' element={<Button 
          color={!showAdd ? 'green' : 'red'}
          text={!showAdd ? 'Add' : 'close'}
          onClick={onAdd} />
        } />
        </Routes>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header