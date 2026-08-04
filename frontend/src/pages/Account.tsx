import { Link } from 'react-router-dom'

function Account() {
  return (
    <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" to="/shop">Shop</Link>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="#">Collections</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="#">About</a>
          </nav>
          <div className="flex items-center space-x-6">
            <button><span className="material-symbols-outlined">search</span></button>
            <Link to="/account"><span className="material-symbols-outlined">person</span></Link>
            <Link to="/cart" className="relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </Link>
          </div>
        </div>
      </header>

      <nav className="flex items-center space-x-4 font-label-caps text-label-caps text-on-surface-variant mb-12">
        <Link className="hover:text-primary" to="/">Home</Link>
        <span className="text-[10px] opacity-40">/</span>
        <span className="text-primary">Your Account</span>
      </nav>

      <div className="text-center py-20">
        <h1 className="font-headline-md text-headline-sm mb-4">Account</h1>
        <p className="font-body-md text-on-surface-variant">Account page under construction</p>
      </div>
    </div>
  )
}

export default Account
