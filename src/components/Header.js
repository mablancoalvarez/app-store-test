import { ReactComponent as Logo } from '../img/logo.svg';
import Breadcrumb from './Breadcrumb';
import { ShoppingBag } from "@phosphor-icons/react";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Header = () => {
    const { data } = useContext(DataContext);
    console.log("data", data)
    const totalCount = data && data.reduce((acc, currentVal) => acc + currentVal.count, 0);

    return (
        <header>
            <Logo />
            <Breadcrumb />
            <div className="cart">
                <span className="count">{totalCount}</span>
                <ShoppingBag size={24} weight="light" />
            </div>
        </header>
    );
};

export default Header;

