import Image from 'next/image';
import Link from 'next/link';

import './Hero.css';

// Change destinations here. `side` puts a link in the left or right group; the groups sit flush with
// the first and last letters of the headline (see Hero.css).
const NAV = [
  { label: 'Home', href: '/', cls: 'l home', side: 'left', current: true },
  { label: 'Shop', href: '#collection', cls: 'l shop', side: 'left' },
  { label: 'Categories', href: '#', cls: 'r cats', side: 'right' },
  { label: 'About', href: '#', cls: 'r about', side: 'right' }
];
const CTA = { label: 'GET STARTED', href: '#collection' };

// Logo + giant headline. Rendered twice (dark ink on the left half, white on the right)
// so the colour flips exactly at the centre split.
function Wordmark({ label }) {
  return (
    <>
      <div className="logo">ANTYTHESIS</div>
      <svg className="title" viewBox="0 0 1381 200" {...(label ? { role: 'img', 'aria-label': label } : {})}>
        <text x="-5.34" y="175" fontSize="205.58" letterSpacing="1.228">
          ANTYTHESIS
        </text>
      </svg>
    </>
  );
}

export default function Hero() {
  return (
    <header className="hero">
      <div className="bg" aria-hidden="true">
        <div className="bg-l" />
        <div className="bg-r" />
      </div>

      <div className="ink ink-dark">
        <Wordmark label="Antythesis" />
      </div>
      <div className="ink ink-light" aria-hidden="true">
        <Wordmark />
      </div>

      <div className="model-wrap">
        <Image
          src="/images/model.webp"
          width={427}
          height={774}
          priority
          sizes="(max-width: 860px) 56vw, 27vw"
          alt="Model in a metallic silver jacket and sunglasses, leaning against a split black and white wall"
        />
      </div>

      <nav className="nav" aria-label="Primary">
        {['left', 'right'].map(side => (
          <div key={side} className="nav-group">
            {NAV.filter(item => item.side === side).map(item => (
              <Link key={item.label} href={item.href} className={item.cls} aria-current={item.current ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <button className="menu" type="button" aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>

      <p className="copy">
        Modern essentials for the ones
        <br />
        who move differently. Timeless pieces,
        <br />
        designed for what’s next.
      </p>
      <Link className="cta" href={CTA.href}>
        {CTA.label}
        <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <path d="M0 5h19M15 1l4 4-4 4" />
        </svg>
      </Link>
    </header>
  );
}