import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-surface-lowest text-on-surface-variant/80 border-t border-outline-variant/20 py-12 px-6 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Content columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Column 1: Brand pitch */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0" />
              <div className="flex flex-col text-left justify-center">
                <span className="text-primary font-headline font-bold text-lg md:text-xl tracking-wider leading-none uppercase">
                  THE BAGARA KITCHEN
                </span>
                <span className="text-secondary font-body text-[9px] md:text-[10px] tracking-[0.18em] font-semibold mt-1.5 leading-none uppercase">
                  RESTAURANT • BAR • BANQUET
                </span>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-sm">
              Honoring timeless slow-cooked culinary traditions while harmonizing bold Deccan flavors with premium craft beer pairings, all within a sophisticated and atmospheric dining experience.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-4 space-y-3 md:pl-12">
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider">Quick Navigation</h5>
            <ul className="text-sm space-y-2 font-light">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-primary transition-colors">About Heritage</a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-primary transition-colors">Signature Menu</a>
              </li>
              <li>
                <a href="#banquet" onClick={(e) => handleLinkClick(e, '#banquet')} className="hover:text-primary transition-colors">Banquet booking</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row: Copyright and licensing */}
        <div className="pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-light">
          <span>&copy; {currentYear} The Bagara Kitchen and Bar. All rights reserved.</span>

          {/* Developed By Rudvay Tech branding */}
          <a
            href="https://rudvay.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-on-surface-variant/80 hover:text-white transition-all duration-300 group"
          >
            <span>Developed By</span>
            <span className="font-bold text-[#e2e2e2] group-hover:text-primary transition-colors">Rudvay tech</span>
            <img
              src="/rudvay_logo.jpg"
              alt="Rudvay Tech Logo"
              className="w-6 h-6 object-contain group-hover:scale-110 transition-all duration-300"
              style={{ mixBlendMode: 'screen' }}
            />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
