// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import { US, ID } from 'country-flag-icons/react/3x2'
import { useDispatch } from 'react-redux'
import { setLanguage } from '../../../../redux/general'
import { useTranslation } from 'react-i18next'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const [flag, setFlag] = useState("id");
  const { i18n } = useTranslation()
  const dispatch = useDispatch();
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  const handleLang = (value) => {
    dispatch(setLanguage(value));
    i18n.changeLanguage(value)
    setFlag(value)
  }

  const LangToggler = () => {
    if (flag == "id")
      return <ID title="Indonesia" className="sm-margin-left sm-border-solid" onClick={() => handleLang("en")} />
    else if (flag == "en")
      return <US title="United States" className="sm-margin-left sm-border-solid" onClick={() => handleLang("id")} />
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
              <Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className='d-none d-lg-block icon-top-toggle-plc'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
            <LangToggler />
          </NavLink>
        </NavItem>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
