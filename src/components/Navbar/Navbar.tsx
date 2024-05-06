import logo from '../../logo.webp';

const Navbar = () => {
    return (
        <nav className='flex justify-center'>
            <img className='w-80 cursor-pointer' src={logo} alt='main-logo' />
        </nav>
    )
}

export default Navbar