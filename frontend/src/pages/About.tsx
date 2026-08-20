import { useEffect } from 'react'
import Header from '../components/Header'

function About() {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in-up').forEach(element => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}


      {/* Philosophy Section */}
      <section className="py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 md:col-start-2 fade-in-up">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-px w-12 bg-primary"></div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">The Philosophy</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Sourcing the Extraordinary.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              At RedJFluer, we approach floristry as a fine art. Our philosophy is rooted in the belief that every stem possesses a unique architectural quality. We curate our collections not by volume, but by profound aesthetic merit.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sustainability is integral to our vision. We partner exclusively with boutique growers who employ regenerative farming practices, ensuring that our pursuit of beauty never compromises the earth that sustains it. The finest seasonal blooms, selected with intention, arranged with restraint.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8 mt-12 md:mt-0 relative fade-in-up" style={{ transitionDelay: '200ms' }}>
            <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container-high p-4 relative">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" 
                alt="Luxury floral arrangement" 
                src="/Bouquets/deb272fbafa3125b0b39c2d754c73666.jpg"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l border-b border-primary z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16 fade-in-up">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">The Process</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">From Farm to Foyer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
            {/* Large Image Block */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden fade-in-up">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Luxury bouquet arrangement" 
                src="/BoxWithFlowers/b952e52e0b311cc78c31f346b1f8249b.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-primary mb-2">01. Cultivation</h3>
                  <p className="font-body-md text-body-md text-on-primary/80">Ethically grown, meticulously chosen.</p>
                </div>
              </div>
            </div>
            {/* Text Block */}
            <div className="md:col-span-1 md:row-span-1 bg-surface flex flex-col justify-center p-8 border border-outline-variant/20 fade-in-up" style={{ transitionDelay: '100ms' }}>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">02. Design</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Each arrangement is sketched and conceptualized, focusing on negative space and striking asymmetry.</p>
            </div>
            {/* Small Image Block */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden fade-in-up" style={{ transitionDelay: '200ms' }}>
              <img 
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
                alt="Flower box arrangement" 
                src="/BoxWithFlowers/27612b8d2ee543549d3be8fb7258c0f6.jpg"
              />
            </div>
            {/* Small Image Block */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden fade-in-up" style={{ transitionDelay: '300ms' }}>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Plant in vase arrangement" 
                src="/VaseWithPlant/7663e4943b0e5d2b02627c489d64f9af.jpg"
              />
            </div>
            {/* Text Block */}
            <div className="md:col-span-1 md:row-span-1 bg-primary text-on-primary flex flex-col justify-center p-8 fade-in-up" style={{ transitionDelay: '400ms' }}>
              <h3 className="font-headline-sm text-headline-sm text-on-primary mb-4">03. Delivery</h3>
              <p className="font-body-md text-body-md text-on-primary/80">Presented in bespoke, climate-controlled packaging to ensure pristine arrival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-gutter">
          <div className="w-full md:w-5/12 order-2 md:order-1 fade-in-up">
            <div className="aspect-square w-full relative">
              <div className="absolute inset-4 border border-primary z-10 pointer-events-none"></div>
              <img 
                className="w-full h-full object-cover p-2" 
                alt="Founder portrait" 
                src="founder2.jpg"
              />
            </div>
          </div>
          <div className="w-full md:w-6/12 order-1 md:order-2 mb-12 md:mb-0 fade-in-up" style={{ transitionDelay: '200ms' }}>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Ricky</h2>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-8 uppercase tracking-widest">Founder &amp; Creative Director</p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              "Flowers are not merely decorative; they are atmospheric. They possess the power to alter the emotional resonance of a room."
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              With a background in contemporary sculpture, Eleanor transitioned to floristry seeking a more ephemeral medium. he founded RedJFluer to bridge the gap between traditional floral design and modern art installations, creating pieces that command attention through quiet sophistication.
            </p>
            <a className="inline-flex items-center space-x-2 border-b border-primary pb-1 group hover:border-transparent transition-colors duration-300" href="#">
              <span className="font-label-caps text-label-caps text-primary uppercase">Read Interview</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_right_alt</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-primary-container border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-6 md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="font-headline-sm text-headline-sm text-primary dark:text-on-primary">REDJFLUER</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Elevating the language of flowers through artisanal curation and mindful design.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors" href="https://redjfluer.com" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors" href="mailto:rrickzzz07@gmail.com">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
          {/* Links Column 1 */}
          <div>
            <h4 className="font-label-caps text-label-caps mb-8 text-primary">COLLECTIONS</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="/shop">Shop All</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Signature Series</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">The Wedding Edit</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Limited Releases</a></li>
            </ul>
          </div>
          {/* Links Column 2 */}
          <div>
            <h4 className="font-label-caps text-label-caps mb-8 text-primary">ABOUT</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="/admin">Admin Dashboard</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          {/* Links Column 3 */}
          <div>
            <h4 className="font-label-caps text-label-caps mb-8 text-primary">SUPPORT</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Shipping &amp; Returns</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="px-6 md:px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-caps text-[10px] text-on-surface-variant">© 2026 RedJFluer</p>
          <div className="flex gap-8">
            <span className="font-label-caps text-[10px] text-on-surface-variant">VISA</span>
            <span className="font-label-caps text-[10px] text-on-surface-variant">MASTERCARD</span>
            <span className="font-label-caps text-[10px] text-on-surface-variant">AMEX</span>
            <span className="font-label-caps text-[10px] text-on-surface-variant">APPLE PAY</span>
          </div>
        </div>
      </footer>

      <style>{`
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default About
