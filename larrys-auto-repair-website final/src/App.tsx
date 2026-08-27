import { FormEvent, MouseEvent, ReactNode, useEffect, useState } from "react";

const PHONE = "(208) 852-0186";
const PHONE_HREF = "tel:+12088520186";
const EMAIL = "larrysauto2017@gmail.com";
const EMAIL_HREF = "mailto:larrysauto2017@gmail.com";
const ADDRESS_LINE1 = "375 W Oneida St";
const ADDRESS_LINE2 = "Preston, ID 83263";
const HOURS = "Mon-Fri | 8:00 AM - 5:00 PM";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Larry%27s+Auto+Repair+%26+Glass+375+W+Oneida+St+Preston+ID+83263";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Larry%27s%20Auto%20Repair%20%26%20Glass%20375%20W%20Oneida%20St%20Preston%20ID%2083263&output=embed";

type Path = "/" | "/services" | "/contact";
type IconName =
  | "wrench"
  | "glass"
  | "oil"
  | "scan"
  | "brakes"
  | "battery"
  | "tire"
  | "ac"
  | "cool"
  | "check"
  | "phone"
  | "pin"
  | "clock"
  | "mail"
  | "arrow"
  | "shield"
  | "clipboard";

type NavigateHandler = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

const iconPaths: Record<IconName, ReactNode> = {
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4a2.1 2.1 0 0 1-3 3Z" />,
  glass: (
    <>
      <path d="M5 18 7 6h10l2 12H5Z" />
      <path d="m10 6 2 4-2 2 3 3-1 3" />
    </>
  ),
  oil: (
    <>
      <path d="m5 8 4-3h6l4 4v7H7l-2-3V8Z" />
      <path d="M15 5V3m-7 9H3m10 0h3" />
    </>
  ),
  scan: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3m0 10v3M4 12h3m10 0h3" />
    </>
  ),
  brakes: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3m0 10v3M4 12h3m10 0h3" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="18" height="10" rx="1.5" />
      <path d="M7 8V6m10 2V6M8 13h2m-1-1v2m5-1h2" />
    </>
  ),
  tire: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v5.5m0 7V21M3 12h5.5m7 0H21" />
    </>
  ),
  ac: <path d="M12 2v20m-5-3 5-3 5 3M7 5l5 3 5-3M2 12h20m-3-5-3 5 3 5M5 7l3 5-3 5" />,
  cool: <path d="M12 2v20m-5-3 5-3 5 3M7 5l5 3 5-3M2 12h20m-3-5-3 5 3 5M5 7l3 5-3 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12h6m-6 4h4" />
    </>
  ),
};

const nav: { href: Path; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const leadServices = ["Auto repair", "Windshield / auto glass", "Brakes", "Oil change", "Check engine light", "Something else"];

type ServiceItem = {
  icon: IconName;
  title: string;
  text: string;
  image?: string;
};

const featuredServices: ServiceItem[] = [
  {
    icon: "wrench",
    title: "Auto Repair",
    text: "Engine, brakes, suspension and more.",
    image:
      "https://images.pexels.com/photos/8478233/pexels-photo-8478233.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "glass",
    title: "Auto Glass",
    text: "Chip repair and windshield replacement.",
    image:
      "https://images.pexels.com/photos/8478224/pexels-photo-8478224.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "oil",
    title: "Oil & Maintenance",
    text: "Keep it running strong.",
    image:
      "https://images.pexels.com/photos/4895412/pexels-photo-4895412.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "scan",
    title: "Check Engine Light",
    text: "We find the problem fast.",
    image:
      "https://images.pexels.com/photos/4116172/pexels-photo-4116172.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
];

const repairServices: ServiceItem[] = [
  {
    icon: "wrench",
    title: "General Auto Repair",
    text: "From strange noises to breakdowns, we diagnose and fix cars, trucks and SUVs.",
    image:
      "https://images.pexels.com/photos/8478233/pexels-photo-8478233.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "scan",
    title: "Diagnostics & Check Engine Light",
    text: "Modern scan tools to pinpoint the real problem, with no guessing.",
    image:
      "https://images.pexels.com/photos/4116172/pexels-photo-4116172.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "brakes",
    title: "Brakes",
    text: "Pads, rotors and full brake service so you can stop with confidence.",
    image:
      "https://images.pexels.com/photos/8986130/pexels-photo-8986130.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "oil",
    title: "Oil Changes & Maintenance",
    text: "Routine service that keeps your vehicle running longer.",
    image:
      "https://images.pexels.com/photos/4895412/pexels-photo-4895412.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "cool",
    title: "Heating & A/C",
    text: "Stay comfortable through Idaho winters and summers.",
    image:
      "https://images.pexels.com/photos/8478247/pexels-photo-8478247.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "battery",
    title: "Batteries & Electrical",
    text: "Testing, replacement and electrical troubleshooting.",
    image:
      "https://images.pexels.com/photos/4116207/pexels-photo-4116207.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "tire",
    title: "Tires & Suspension",
    text: "Tire service plus suspension and steering repairs.",
    image:
      "https://images.pexels.com/photos/4116170/pexels-photo-4116170.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
  {
    icon: "clipboard",
    title: "Pre-Trip Inspections",
    text: "Peace of mind before that long road trip.",
    image:
      "https://images.pexels.com/photos/8986132/pexels-photo-8986132.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=360&h=210",
  },
];

const glassServices: ServiceItem[] = [
  { icon: "glass", title: "Windshield Chip & Crack Repair", text: "Fast repairs that stop small chips from spreading." },
  { icon: "shield", title: "Windshield Replacement", text: "Full replacement when damage is beyond repair." },
  { icon: "check", title: "Door & Side Glass", text: "Replacement for damaged side and back glass." },
];

const steps = [
  { n: "1", title: "Schedule your service", text: "Call or request a free quote online." },
  { n: "2", title: "Expert repairs", text: "We diagnose the problem and fix it right." },
  { n: "3", title: "Back on the road", text: "Pick up your vehicle and drive with confidence." },
];

function normalizePath(pathname: string): Path {
  if (pathname === "/services") return "/services";
  if (pathname === "/contact") return "/contact";
  return "/";
}

function Icon({ name, className = "icon" }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const id = light ? "light" : "dark";

  return (
    <svg
      className={className}
      viewBox="0 0 900 290"
      role="img"
      aria-label="Larry's Auto Repair and Glass"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`chrome-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d3748" />
          <stop offset="25%" stopColor="#4a5568" />
          <stop offset="50%" stopColor="#718096" />
          <stop offset="75%" stopColor="#4a5568" />
          <stop offset="100%" stopColor="#1a202c" />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <linearGradient id={`car-${id}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={light ? "#2f6fd8" : "#12307f"} />
          <stop offset="45%" stopColor={light ? "#4f92f2" : "#1e5bc6"} />
          <stop offset="100%" stopColor={light ? "#2a63c8" : "#16418f"} />
        </linearGradient>
      </defs>

      <path
        d="M42 150 L26 97 C92 84 152 78 206 70 C241 64 253 34 306 25 C351 17 470 15 521 26 C563 35 589 60 641 70 C721 82 807 88 859 94 L875 150"
        fill="none"
        stroke={`url(#car-${id})`}
        strokeWidth="19"
        strokeLinejoin="miter"
        strokeMiterlimit="8"
      />
      <text
        x="92"
        y="212"
        textLength="722"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="142"
        fill={`url(#chrome-${id})`}
        filter={`url(#shadow-${id})`}
      >
        LARRY&apos;S
      </text>
      <text
        x="814"
        y="256"
        textAnchor="end"
        textLength="404"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="31"
        letterSpacing="2"
        fill={light ? "#9dc1f7" : "#1a4fa8"}
      >
        AUTO REPAIR AND GLASS
      </text>
    </svg>
  );
}

function SmartLink({
  href,
  navigate,
  children,
  className,
  onNavigate,
}: {
  href: string;
  navigate: NavigateHandler;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        navigate(event, href);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

function SiteHeader({ path, navigate }: { path: Path; navigate: NavigateHandler }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <SmartLink className="logo-link" href="/" navigate={navigate}>
          <Logo />
        </SmartLink>

        <nav className="main-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <SmartLink key={item.href} href={item.href} navigate={navigate} className={path === item.href ? "active" : ""}>
              {item.label}
            </SmartLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={PHONE_HREF}>
            <Icon name="phone" />
            <span>{PHONE}</span>
          </a>
          <SmartLink className="btn primary sm quote-btn" href="/contact#quote" navigate={navigate}>
            Get a Free Quote
          </SmartLink>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {nav.map((item) => (
            <SmartLink
              key={item.href}
              href={item.href}
              navigate={navigate}
              className={path === item.href ? "active" : ""}
              onNavigate={() => setOpen(false)}
            >
              {item.label}
            </SmartLink>
          ))}
          <a href={PHONE_HREF} onClick={() => setOpen(false)}>
            Call {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<{ name: string; phone: string; service: string } | null>(null);
  const [reference, setReference] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      name?: string;
      phone?: string;
      service?: string;
    };

    setStatus("sending");
    setMessage("");

    window.setTimeout(() => {
      try {
        const existing = JSON.parse(window.localStorage.getItem("larrys-leads") || "[]") as unknown[];
        window.localStorage.setItem("larrys-leads", JSON.stringify([...existing, { ...data, createdAt: new Date().toISOString() }]));
        setSent({
          name: (data.name ?? "").trim(),
          phone: (data.phone ?? "").trim(),
          service: (data.service ?? "").trim(),
        });
        setReference(`LR-${Date.now().toString().slice(-6)}`);
        setStatus("success");
        form.reset();
      } catch {
        setStatus("error");
        setMessage(`Something went wrong. Please call ${PHONE}.`);
      }
    }, 800);
  }

  function startOver() {
    setStatus("idle");
    setMessage("");
    setSent(null);
  }

  if (status === "success" && sent) {
    const firstName = sent.name.split(/\s+/)[0];

    return (
      <div className="quote-card quote-success" role="status" aria-live="polite">
        <div className="success-badge" aria-hidden="true">
          <svg viewBox="0 0 52 52">
            <circle className="success-ring" cx="26" cy="26" r="23" />
            <path className="success-check" d="m15 27 7.5 7.5L37 19" />
          </svg>
        </div>

        <p className="success-tag">Request received</p>
        <h2>{firstName ? `Thanks, ${firstName}!` : "Thanks!"}</h2>
        <p className="success-lead">
          Your quote request is in. We&apos;ll call you back shortly with the next step.
        </p>

        <ul className="recap">
          <li>
            <span>Service</span>
            <strong>{sent.service || "General inquiry"}</strong>
          </li>
          <li>
            <span>Call back</span>
            <strong>{formatPhone(sent.phone)}</strong>
          </li>
          <li>
            <span>Reference</span>
            <strong>{reference}</strong>
          </li>
        </ul>

        <p className="success-note">
          Need us sooner? Call <a href={PHONE_HREF}>{PHONE}</a>
        </p>

        <button className="success-again" type="button" onClick={startOver}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-card" onSubmit={submit}>
      <h2>Get a Free Quote</h2>
      <p className="quote-sub">Takes 30 seconds.</p>

      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" placeholder="Your name" required minLength={2} />
      </label>
      <label>
        <span>Phone</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="2085550123"
          required
          pattern="[0-9]{10}"
          minLength={10}
          maxLength={10}
        />
      </label>
      <label>
        <span>What do you need?</span>
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {leadServices.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <button className="quote-submit" disabled={status === "sending"} type="submit">
        {status === "sending" ? (
          <>
            <span className="spinner" aria-hidden="true" /> Sending...
          </>
        ) : (
          "Get My Free Quote"
        )}
      </button>

      <p className="quote-alt">
        Or call <a href={PHONE_HREF}>{PHONE}</a>
      </p>

      {message && (
        <div className={`quote-status ${status}`} role="alert">
          {message}
        </div>
      )}
    </form>
  );
}

function ServiceGrid({ items, columns = "four" }: { items: ServiceItem[]; columns?: "three" | "four" }) {
  return (
    <div className={`svc-grid ${columns}`}>
      {items.map((service, index) => (
        <article
          className={`svc-card ${service.image ? "detail" : ""}`}
          key={service.title}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          {service.image && <img className="svc-photo" src={service.image} alt={`${service.title} service`} loading="lazy" />}
          <span className="svc-icon">
            <Icon name={service.icon} />
          </span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
        </article>
      ))}
    </div>
  );
}

function HomePage({ navigate }: { navigate: NavigateHandler }) {
  return (
    <main className="route-page home-page">
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <Icon name="pin" /> Preston, Idaho
            </span>
            <h1>Larry&apos;s Auto Repair &amp; Glass</h1>
            <p className="hero-sub">Trusted auto repair and glass service. Done right the first time.</p>
            <div className="hero-cta">
              <a className="btn white lg" href={PHONE_HREF}>
                <Icon name="phone" /> Call {PHONE}
              </a>
            </div>
            <ul className="chips">
              <li>
                <Icon name="check" /> Free quotes
              </li>
              <li>
                <Icon name="check" /> Fast turnaround
              </li>
              <li>
                <Icon name="check" /> 5-star rated
              </li>
            </ul>
          </div>

          <div id="quote" className="quote-anchor hero-form">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="shell">
          <h2 className="section-head">What We Do</h2>
          <ServiceGrid items={featuredServices} />
          <div className="center-cta">
            <SmartLink className="btn outline lg" href="/services" navigate={navigate}>
              See all services <Icon name="arrow" />
            </SmartLink>
          </div>
        </div>
      </section>

      <section className="section how">
        <div className="shell">
          <h2 className="section-head">How It Works</h2>
          <div className="steps">
            {steps.map((step, index) => (
              <article className="step" key={step.n} style={{ animationDelay: `${index * 90}ms` }}>
                <span className="step-num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="review">
        <div className="shell review-inner">
          <div className="stars" role="img" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((star) => (
              <svg key={star} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="m12 2 2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9L12 2Z" />
              </svg>
            ))}
          </div>
          <blockquote>&ldquo;Very quick turnaround, and does a great job!&rdquo;</blockquote>
          <cite>Colton C. - Preston</cite>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band-inner">
          <div>
            <h2>Ready when you are.</h2>
            <p>Get a free quote or call us today.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn white lg" href={PHONE_HREF}>
              <Icon name="phone" /> {PHONE}
            </a>
            <SmartLink className="btn primary lg" href="/contact#quote" navigate={navigate}>
              Get a Free Quote
            </SmartLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServicesPage({ navigate }: { navigate: NavigateHandler }) {
  return (
    <main className="route-page">
      <section className="page-hero">
        <div className="page-hero-bg services-photo" />
        <div className="shell">
          <span className="hero-eyebrow">
            <Icon name="wrench" /> Our Services
          </span>
          <h1>Everything Your Vehicle Needs</h1>
          <p>One local shop for auto repair and auto glass. Straight answers and fair prices.</p>
          <div className="page-hero-cta">
            <a className="btn white lg" href={PHONE_HREF}>
              <Icon name="phone" /> Call {PHONE}
            </a>
            <SmartLink className="btn primary lg" href="#quote" navigate={navigate}>
              Get a Free Quote
            </SmartLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="section-head">Auto Repair</h2>
          <ServiceGrid items={repairServices} />
        </div>
      </section>

      <section className="section glass-band">
        <div className="shell">
          <h2 className="section-head">Auto Glass</h2>
          <ServiceGrid items={glassServices} columns="three" />
          <p className="glass-note">
            Not sure if it can be repaired or needs replacement? <a href={PHONE_HREF}>Call us</a> and we&apos;ll help.
          </p>
        </div>
      </section>

      <section className="section quote-section" id="quote">
        <div className="shell quote-section-grid">
          <div className="quote-section-copy">
            <h2>Get a Free Quote</h2>
            <p>Tell us what you need. We&apos;ll call you right back with the next step.</p>
            <ul className="chips dark">
              <li>
                <Icon name="check" /> No obligation
              </li>
              <li>
                <Icon name="check" /> Fast response
              </li>
              <li>
                <Icon name="check" /> Local and trusted
              </li>
            </ul>
            <a className="btn primary lg" href={PHONE_HREF}>
              <Icon name="phone" /> Or call {PHONE}
            </a>
          </div>
          <div className="quote-anchor">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="route-page">
      <section className="page-hero short">
        <div className="page-hero-bg contact-photo" />
        <div className="shell">
          <span className="hero-eyebrow">
            <Icon name="pin" /> Preston, Idaho
          </span>
          <h1>Get In Touch</h1>
          <p>Request a free quote below, or call us - whatever is easiest for you.</p>
        </div>
      </section>

      <section className="section contact-section" id="quote">
        <div className="shell contact-layout">
          <div className="contact-info-col">
            <a className="contact-item" href={PHONE_HREF}>
              <span>
                <Icon name="phone" />
              </span>
              <small>Call us</small>
              <strong>{PHONE}</strong>
              <em>Tap to call</em>
            </a>
            <a className="contact-item" href={EMAIL_HREF}>
              <span>
                <Icon name="mail" />
              </span>
              <small>Email</small>
              <strong>{EMAIL}</strong>
              <em>Send a message</em>
            </a>
            <a className="contact-item" href={MAPS_HREF} target="_blank" rel="noreferrer">
              <span>
                <Icon name="pin" />
              </span>
              <small>Visit the shop</small>
              <strong>
                {ADDRESS_LINE1}
                <br />
                {ADDRESS_LINE2}
              </strong>
              <em>Get directions</em>
            </a>
            <div className="contact-item">
              <span>
                <Icon name="clock" />
              </span>
              <small>Hours</small>
              <strong>{HOURS}</strong>
              <em>Closed weekends</em>
            </div>
          </div>

          <div className="quote-anchor contact-form-col">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="map-section" aria-label="Map to Larry's Auto Repair and Glass">
        <iframe
          title="Map to Larry's Auto Repair & Glass"
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}

function SiteFooter({ navigate }: { navigate: NavigateHandler }) {
  return (
    <>
      <footer>
        <div className="shell foot-grid">
          <div className="foot-brand">
            <Logo light className="foot-logo" />
            <p>Honest auto repair and auto glass for Preston, Idaho and the surrounding area.</p>
          </div>

          <div className="foot-col">
            <h3>Menu</h3>
            <SmartLink href="/" navigate={navigate}>
              Home
            </SmartLink>
            <SmartLink href="/services" navigate={navigate}>
              Services
            </SmartLink>
            <SmartLink href="/contact" navigate={navigate}>
              Contact
            </SmartLink>
            <SmartLink href="/contact#quote" navigate={navigate}>
              Get a Free Quote
            </SmartLink>
          </div>

          <div className="foot-col">
            <h3>Contact</h3>
            <a href={PHONE_HREF}>
              <Icon name="phone" /> {PHONE}
            </a>
            <a href={EMAIL_HREF}>
              <Icon name="mail" /> {EMAIL}
            </a>
            <a href={MAPS_HREF} target="_blank" rel="noreferrer">
              <Icon name="pin" /> {ADDRESS_LINE1}, {ADDRESS_LINE2}
            </a>
            <span className="foot-hours">
              <Icon name="clock" /> {HOURS}
            </span>
          </div>
        </div>
        <div className="shell foot-bottom">
          Copyright {new Date().getFullYear()} Larry&apos;s Auto Repair &amp; Glass | Preston, Idaho
        </div>
      </footer>

      <div className="mobile-bar">
        <a href={PHONE_HREF}>
          <Icon name="phone" /> Call
        </a>
        <SmartLink href="/contact#quote" navigate={navigate}>
          Get a Free Quote
        </SmartLink>
      </div>
    </>
  );
}

function titleForPath(path: Path) {
  if (path === "/services") return "Services | Larry's Auto Repair & Glass - Preston, ID";
  if (path === "/contact") return "Contact | Larry's Auto Repair & Glass - Preston, ID";
  return "Larry's Auto Repair & Glass - Preston, Idaho";
}

export default function App() {
  const [path, setPath] = useState<Path>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    document.title = titleForPath(path);
  }, [path]);

  const navigate: NavigateHandler = (event, href) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    window.history.pushState({}, "", `${url.pathname}${url.hash}`);
    setPath(normalizePath(url.pathname));

    window.setTimeout(() => {
      if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="site-shell">
      <SiteHeader path={path} navigate={navigate} />
      {path === "/services" ? <ServicesPage navigate={navigate} /> : path === "/contact" ? <ContactPage /> : <HomePage navigate={navigate} />}
      <SiteFooter navigate={navigate} />
    </div>
  );
}
