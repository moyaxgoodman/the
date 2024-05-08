import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png'



function NavBarLayout() {
  return (
    <>
      <Navbar bg="success" data-bs-theme="dark" className='sticky-top w-full'>
        <Navbar.Brand href="/" className="fs-10">
        <img src={logo} alt="" style={{ height: '24px', width: '24px' }} />         
          Pocket Donation Bank
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default NavBarLayout;
