import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {RootState} from '../../redux/store'
import './Menu.css'
import {NavLinkItem} from '../../types/interfaces'
import {useEffect, useState} from 'react'

const Menu = () => {

  const quantityItem = useSelector(
    (state: RootState) => state.items.countChanged
  )

  const [menuOpenClose, setMenuOpenClose] = useState(window.innerWidth > 840)
  const [consentToggleMenu, setConsentToggleMenu] = useState(window.innerWidth <= 840)

  const toggleMenu = () => {
    if (consentToggleMenu) {
      setMenuOpenClose(!menuOpenClose)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 840) {
        setMenuOpenClose(false)
        setConsentToggleMenu(true)
      }
      else {setMenuOpenClose(true)
        setConsentToggleMenu(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [consentToggleMenu, menuOpenClose])

  const navLinks: NavLinkItem[] = [
    {path: '.', label: 'Home'},
    {path: '/about', label: 'About'},
    {path: '/items', label: 'Items'},
    {
      path: '/shoppingCart',
      label: `Shopping Cart  ${quantityItem ? quantityItem : ''}`,
    },
    {path: '/registration', label: 'Registration'},
    {path: '/contacts', label: 'Contacts'},
  ]

  const getNavLinkClass = (isActive: boolean): string =>
    isActive ? 'activeLink' : 'Link'

  return (
    <div onClick={toggleMenu} className="menu-container">
      <header>
        <nav>
          <div className="logo-link"></div>
          {menuOpenClose &&
            navLinks.map(({path, label}) => (
              <NavLink
                key={path}
                className={({isActive}) => getNavLinkClass(isActive)}
                to={path}
              >
                {label}
              </NavLink>
            ))}
        </nav>
      </header>
    </div>
  )
}

export default Menu
