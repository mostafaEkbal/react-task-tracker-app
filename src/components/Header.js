import Button from './Button';

const Header = ({ title, onAdd, showAdd}) => {

  return (
    <header className="header">
        <h1>{title}</h1>
        <Button 
          color={!showAdd ? 'green' : 'red'}
          text={!showAdd ? 'Add' : 'close'}
          onClick={onAdd}
        />
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header