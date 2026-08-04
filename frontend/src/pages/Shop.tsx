import { Link } from 'react-router-dom'

function Shop() {
  return (
    <div className="bg-surface text-on-surface font-body-md pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md tracking-tighter text-primary" to="/">REDJFLUER</Link>
          <nav className="hidden md:flex items-center space-x-12">
            <Link className="font-label-caps text-label-caps text-primary border-b border-primary pb-1" to="/shop">Shop</Link>
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
        <span className="text-primary">Shop All Botanicals</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-40 space-y-12">
            <section>
              <h3 className="font-label-caps text-label-caps text-primary mb-6">Categories</h3>
              <ul className="space-y-4">
                <li><button className="font-body-md text-on-surface-variant hover:text-primary">All Collections</button></li>
                <li><button className="font-body-md text-primary font-semibold">Bouquets</button></li>
                <li><button className="font-body-md text-on-surface-variant hover:text-primary">Flower Boxes</button></li>
                <li><button className="font-body-md text-on-surface-variant hover:text-primary">Plants in Vases</button></li>
              </ul>
            </section>
          </div>
        </aside>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
            <p className="font-body-md text-on-surface-variant"><span className="font-semibold text-primary">24</span> arrangements found</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="text-center py-20">Product grid - Shop page under construction</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
