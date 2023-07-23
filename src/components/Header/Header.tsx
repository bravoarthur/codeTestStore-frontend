import styles from './Header.module.scss'
import AppbarHeader from "../Partials/Appbar/Appbar";


function Header() {

    return (
        <div className={styles.headerBox}>
            <AppbarHeader/>
        </div>
    );
}

export default Header;