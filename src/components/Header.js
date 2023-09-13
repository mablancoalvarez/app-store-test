import { ReactComponent as Logo } from '../assets/logo.svg';
import Breadcrumb from './Breadcrumb';
import { ShoppingBag } from '@phosphor-icons/react';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { data } = useContext(DataContext);
  const totalCount = data && data.reduce((acc, currentVal) => acc + currentVal.count, 0);

  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      <Breadcrumb />
      <div className="cart">
        {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        <ShoppingBag className="cart-icon" size={24} weight="light" />
      </div>
    </header>
  );
};

export default Header;
