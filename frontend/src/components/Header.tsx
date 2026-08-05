import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface HeaderProps {
  transparent?: boolean
}

function Header({ transparent = false }: HeaderProps) {
  const { getCartCount } = useCart()

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
          <Link className="font-label-caps text-label-caps text-primary border-b border-primary pb-1" to="/shop">Shop</Link>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Collections</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">About</a>
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
