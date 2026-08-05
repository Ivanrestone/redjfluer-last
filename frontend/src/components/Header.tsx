import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface HeaderProps {
  transparent?: boolean
}

function Header({ transparent = false }: HeaderProps) {
  const { getCartCount } = useCart()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        transparent 
          ? 'bg-transparent' 
          : 'bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30'
      }`}
    >
      <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
        <nav className="hidden md:flex items-center space-x-12">
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${
              isActive('/') 
                ? 'text-primary border-b border-primary pb-1' 
                : 'text-on-surface-variant hover:text-primary'
            }`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${
              isActive('/shop') 
                ? 'text-primary border-b border-primary pb-1' 
                : 'text-on-surface-variant hover:text-primary'
            }`} 
            to="/shop"
          >
            Shop
          </Link>
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${
              isActive('/about') 
                ? 'text-primary border-b border-primary pb-1' 
                : 'text-on-surface-variant hover:text-primary'
            }`} 
            to="/about"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-6">
          <button className="hover:opacity-70 transition-opacity duration-300"><span className="material-symbols-outlined">search</span></button>
          <Link to="/account" className="hover:opacity-70 transition-opacity duration-300"><span className="material-symbols-outlined">person</span></Link>
          <button className="hover:opacity-70 transition-opacity duration-300 hidden md:block"><span className="material-symbols-outlined">favorite</span></button>
          <Link to="/cart" className="hover:opacity-70 transition-opacity duration-300 relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
