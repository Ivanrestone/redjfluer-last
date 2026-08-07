import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Account() {
  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Header />
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <nav className="flex items-center space-x-4 font-label-caps text-label-caps text-on-surface-variant mb-12">
          <Link className="hover:text-primary" to="/">Home</Link>
          <span className="text-[10px] opacity-40">/</span>
          <span className="text-primary">Account</span>
        </nav>

        <div className="max-w-2xl mx-auto text-center py-20">
          <h1 className="font-headline-md text-headline-md text-primary mb-6">Shop as a Guest</h1>
          <p className="font-body-lg text-on-surface-variant mb-8">
            Creating an account is optional. You can checkout as a guest and enjoy the same beautiful floral experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="bg-primary text-on-primary py-4 px-8 font-label-caps uppercase tracking-[0.2em] hover:bg-transparent hover:text-primary border border-primary transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/cart" 
              className="border border-primary text-primary py-4 px-8 font-label-caps uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300"
            >
              View Cart
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Account
