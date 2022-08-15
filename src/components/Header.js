import Button from './Button';

const Header = ( {title} ) => {
  const onClick = (e) => {
    console.log('click');
  }

  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color='blue' text='Add' onClick={onClick} />
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header