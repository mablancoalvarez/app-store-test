import { ReactComponent as Logo } from '../img/logo.svg';
import Breadcrumb from './Breadcrumb';


const Header = () => {
    return (
        <header>
            <Logo />
            <Breadcrumb />
        </header>
    );
};

export default Header;

