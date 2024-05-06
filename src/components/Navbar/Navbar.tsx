import logo from '../../logo.webp';
import classes from './navbar.module.css'

const Navbar = () => {
    return (
        <nav className={classes.container}>
            {/* <p className={classes.navHeader}>SPELLS</p> */}
            <img className={classes.logo} src={logo} alt='main-logo' />
            {/* <p className={classes.navHeader}>FAVORITES</p> */}
        </nav>
    )
}

export default Navbar