"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type GalleryItem = {
  id: string;
  src: string;
  category: string;
  title: string;
};

const studioName = "Infinity Moments Photography";
const inquiryEndpoint = "https://formsubmit.co/ajax/niketparashar98@gmail.com";
const phoneLabel = "6387029751";
const whatsappUrl = "https://wa.me/916387029751";
const instagramUrl = "https://www.instagram.com/banda_films___/";

const heroImages = [
  "/images/indian-wedding-hero.png",
  "https://images.unsplash.com/photo-1594372999906-5f7f4f3e56eb?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2400&q=90",
];

const services = [
  [
    "01",
    "Wedding Photography",
    "Every ritual, emotion and family moment preserved with an editorial eye.",
    "Custom quote",
  ],
  [
    "02",
    "Wedding Videography",
    "A polished visual record of your complete wedding celebration.",
    "Custom quote",
  ],
  [
    "03",
    "Pre Wedding Shoot",
    "A cinematic love story before the celebrations begin.",
    "From INR 18,000",
  ],
  [
    "04",
    "Birthday Photography",
    "Beautiful coverage for milestones, laughter and all the joyful details.",
    "From INR 10,000",
  ],
  [
    "05",
    "Haldi Photography",
    "Vibrant, colour-rich imagery for your happiest pre-wedding ritual.",
    "From INR 12,000",
  ],
  [
    "06",
    "Mehndi Photography",
    "Artful detail, candid emotions and every beautiful henna design.",
    "From INR 12,000",
  ],
  [
    "07",
    "Engagement Shoot",
    "Timeless portraits for the beginning of your forever.",
    "From INR 15,000",
  ],
  [
    "08",
    "Baby Shoot",
    "Gentle, playful portraits your family will treasure for years.",
    "From INR 8,000",
  ],
  [
    "09",
    "Maternity Shoot",
    "An elegant celebration of anticipation, love and new life.",
    "From INR 12,000",
  ],
  [
    "10",
    "Drone Photography",
    "A breathtaking aerial perspective for grand wedding moments.",
    "On request",
  ],
  [
    "11",
    "Cinematic Wedding Film",
    "A story-led film with the warmth and energy of your day.",
    "Custom quote",
  ],
  [
    "12",
    "Premium Album Design",
    "A handcrafted heirloom album curated with your favourite frames.",
    "From INR 9,000",
  ],
];

const packages = [
  {
    name: "Basic",
    label: "Beautifully essential",
    price: "\u20B935,500",
    featured: false,
    features: [
      "Traditional Photography",
      "Traditional Videography",
      "40 Pages Album",
      "Full Montage Video",
      "1 Photo Frame (12x18)",
      "Drone Video",
    ],
  },
  {
    name: "Standard",
    label: "Made for every moment",
    price: "\u20B959,999",
    featured: false,
    features: [
      "Traditional Photography",
      "Candid Photography",
      "Traditional Videography",
      "Pre Wedding Shoot",
      "60 Pages Album",
      "Full Montage Video",
      "1 Photo Frame (12x18)",
      "Printed Calendar",
      "Drone Video",
    ],
  },
  {
    name: "Premium",
    label: "The complete celebration",
    price: "\u20B989,999",
    featured: true,
    features: [
      "Traditional Photography",
      "Candid Photography",
      "Traditional Videography",
      "Cinematic Video",
      "Pre Wedding Shoot",
      "60 Pages Premium Album",
      "Wedding Highlights",
      "Instagram Reels",
      "Full Montage Video",
      "2 Photo Frames",
      "Printed Calendar",
      "Drone Video",
    ],
  },
];

const reviews = [
  [
    "Aditi & Rohan",
    "Infinity Moments captured every ritual with such warmth. From our haldi to the reception, the images feel exactly like our family and our celebration.",
  ],
  [
    "Ishita Mehra",
    "The team made our baby shower feel effortless and special. Every picture is beautifully edited, natural and full of joy.",
  ],
  [
    "Kavya & Arjun",
    "Our wedding film is something we will watch forever. The emotion, music and tiny moments were captured so perfectly.",
  ],
];

const faqs = [
  [
    "How early should we book our wedding date?",
    "For peak wedding dates, we recommend reserving your celebration 6 to 12 months in advance. Smaller functions can often be accommodated with shorter notice.",
  ],
  [
    "Do you cover multi-day Indian weddings?",
    "Yes. From roka and mehndi to haldi, sangeet, pheras and reception, we can create a tailored multi-day coverage plan.",
  ],
  [
    "Will you travel for destination weddings?",
    "Absolutely. We love destination celebrations across India and beyond. Travel is transparently tailored in your proposal.",
  ],
  [
    "How soon will our photos and films be ready?",
    "You will receive a few preview images within 72 hours. Final delivery follows the timeline in your selected collection.",
  ],
  [
    "Can we customise a package?",
    "Always. Start with a collection that resonates and we will tailor the number of events, team size and heirloom details around you.",
  ],
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#booking" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Eye({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={centered ? "eyebrow justify-center" : "eyebrow"}>
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-5xl font-medium leading-[.92] tracking-[-.035em] text-cream sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-6 text-sm leading-7 text-white/60 sm:text-[15px]">
          {copy}
        </p>
      )}
    </div>
  );
}

function GoldButton({
  children,
  href = "#booking",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-3 bg-gold px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[.16em] text-ink transition hover:bg-[#f1d28c] ${className}`}
    >
      {children}
      <Arrow className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Counter({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div
      ref={ref}
      className="border-l border-gold/45 px-5 first:border-l-0 sm:px-8"
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl font-medium text-gold sm:text-5xl"
      >
        {number}
      </motion.p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/50 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      5200,
    );
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((items: GalleryItem[]) => setGalleryItems(items))
      .catch(() => setGalleryItems([]));
  }, []);

  const filteredGallery =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);
  const visibleGallery = filteredGallery.slice(0, visibleCount);
  const activeIndex = lightbox
    ? filteredGallery.findIndex((item) => item.id === lightbox.id)
    : -1;
  const showAdjacent = (direction: number) => {
    if (!lightbox || !filteredGallery.length) return;
    setLightbox(
      filteredGallery[
        (activeIndex + direction + filteredGallery.length) %
          filteredGallery.length
      ],
    );
  };

  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") showAdjacent(-1);
      if (event.key === "ArrowRight") showAdjacent(1);
    };
    window.addEventListener("keydown", navigate);
    return () => window.removeEventListener("keydown", navigate);
  });
  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    setFormState("sending");
    try {
      const response = await fetch(inquiryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...entries,
          _subject: `New ${studioName} booking inquiry`,
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("Inquiry could not be sent");
      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <main>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          >
            <div className="text-center">
              <p className="font-display text-4xl italic text-gold">∞</p>
              <div className="mt-4 h-px w-24 overflow-hidden bg-white/15">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                  className="h-full bg-gold"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-6 sm:py-7 lg:px-12">
        <a
          href="#home"
          className="relative z-40 flex items-center gap-2 text-cream"
        >
          <img
            src="/images/infinity-moments-logo.jpeg"
            alt="Infinity Moments Photography logo"
            className="h-10 w-12 object-cover object-[50%_19%] sm:h-12 sm:w-14"
          />
          <span className="max-w-[130px] font-display text-lg leading-[.85] tracking-[.05em] sm:max-w-none sm:text-2xl">
            Infinity
            <br className="sm:hidden" /> Moments
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[.15em] text-white/75 transition hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <GoldButton className="px-5 py-3">Book now</GoldButton>
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-40 grid h-10 w-10 place-items-center border border-white/20 lg:hidden"
          aria-label="Toggle navigation"
        >
          <span className="block space-y-1.5">
            {[0, 1].map((line) => (
              <span
                key={line}
                className={`block h-px w-5 bg-cream transition ${menuOpen && line === 0 ? "translate-y-[3.5px] rotate-45" : ""} ${menuOpen && line === 1 ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            ))}
          </span>
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-0 z-30 border-b border-gold/20 bg-ink px-6 pb-8 pt-24 lg:hidden"
            >
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    onClick={() => setMenuOpen(false)}
                    key={item.label}
                    href={item.href}
                    className="font-display text-3xl text-cream"
                  >
                    {item.label}
                  </a>
                ))}
                <GoldButton className="mt-2 w-fit">Book now</GoldButton>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section
        id="home"
        className="noise relative flex min-h-[790px] items-end overflow-hidden px-5 pb-20 pt-36 sm:min-h-screen sm:px-6 sm:pb-28 lg:px-12"
      >
        <AnimatePresence mode="sync">
          {heroImages.map(
            (image, i) =>
              i === heroIndex && (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, scale: 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.2 },
                    scale: { duration: 7, ease: "linear" },
                  }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(4,4,5,.82) 0%, rgba(4,4,5,.36) 55%, rgba(4,4,5,.7) 100%), linear-gradient(0deg, rgba(4,4,5,.92) 0%, transparent 55%), url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ),
          )}
        </AnimatePresence>
        <div className="relative z-10 mx-auto w-full max-w-[1344px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ delay: 0.45 }}
            className="eyebrow"
          >
            Infinity Moments Photography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-7 max-w-5xl font-display text-[clamp(3.8rem,8.6vw,8.5rem)] font-medium leading-[.8] tracking-[-.055em] text-cream"
          >
            Capturing Every Moment, Creating{" "}
            <em className="font-normal text-gold">Timeless</em> Memories
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10"
          >
            <p className="max-w-2xl text-xs leading-6 tracking-[.08em] text-white/75 sm:text-sm">
              WEDDING &bull; PRE-WEDDING &bull; BIRTHDAY &bull; HALDI &bull;
              MEHNDI &bull; ENGAGEMENT &bull; MATERNITY &bull; BABY SHOOT &bull;
              EVENTS
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <GoldButton className="w-full sm:w-auto">Book now</GoldButton>
              <a
                href="#portfolio"
                className="inline-flex w-full items-center justify-center gap-3 border border-white/35 px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[.16em] text-cream transition hover:border-gold hover:text-gold sm:w-auto"
              >
                View gallery <Arrow className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-9 right-6 z-10 hidden rotate-90 items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/55 lg:flex lg:right-12">
          Scroll to discover <span className="h-px w-10 bg-gold/70" />
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden bg-charcoal px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-[1344px] gap-14 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="absolute -left-4 -top-4 h-[82%] w-[82%] border border-gold/60 sm:-left-5 sm:-top-5" />
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85"
              alt="Indian bride in traditional wedding attire"
              className="relative h-[470px] w-full object-cover sm:h-[520px]"
            />
            <div className="glass absolute -bottom-7 -right-2 max-w-[225px] p-5 sm:-right-10">
              <p className="font-display text-4xl text-gold">12+</p>
              <p className="mt-1 text-[10px] font-bold uppercase leading-5 tracking-[.16em] text-white/70">
                Years of preserving Indian celebrations
              </p>
            </div>
          </motion.div>
          <div>
            <SectionHeading
              eyebrow="About Infinity Moments"
              title={
                <>
                  Every celebration deserves to be remembered{" "}
                  <em className="text-gold">beautifully.</em>
                </>
              }
              copy="Infinity Moments Photography is a passionate team of photographers and filmmakers dedicated to preserving life's most meaningful celebrations with timeless elegance."
            />
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/55">
              From intimate engagements to grand Indian weddings, we blend
              thoughtful direction with candid storytelling. Our approach keeps
              the focus on your people, your rituals and the fleeting details
              that make every event truly yours.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-gold/25 pt-7 sm:grid-cols-3">
              {[
                ["01", "Thoughtful direction"],
                ["02", "Cinematic craft"],
                ["03", "Family first"],
              ].map(([number, label]) => (
                <div key={number}>
                  <span className="font-display text-xl text-gold">
                    {number}
                  </span>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[.09em] text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#booking"
              className="mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-gold hover:text-cream"
            >
              Plan your story <Arrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-ink px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1344px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our craft"
              title={
                <>
                  Every ritual, <em className="text-gold">beautifully</em>{" "}
                  remembered.
                </>
              }
              copy="Coverage that feels effortless on the day and meaningful for a lifetime."
            />
            <a
              href="#booking"
              className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-gold md:inline-flex"
            >
              Plan your coverage <Arrow className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map(([number, title, copy, price], i) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (i % 4) * 0.05 }}
                key={title}
                className="group bg-ink p-7 transition duration-300 hover:bg-white/[.05]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center border border-gold/45 font-display text-lg text-gold transition duration-300 group-hover:bg-gold group-hover:text-ink">
                    {number}
                  </span>
                  <span className="text-[11px] text-gold">{price}</span>
                </div>
                <h3 className="mt-9 font-display text-3xl leading-none text-cream">
                  {title}
                </h3>
                <p className="mt-4 min-h-[60px] text-xs leading-5 text-white/50">
                  {copy}
                </p>
                <a
                  href="#booking"
                  className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/70 transition hover:text-gold"
                >
                  Learn more <Arrow className="h-3.5 w-3.5" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101011] px-5 py-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1344px]">
          <SectionHeading
            centered
            eyebrow="Why choose us"
            title={
              <>
                Crafted with heart, delivered with{" "}
                <em className="text-gold">precision.</em>
              </>
            }
            copy="The Infinity Moments experience is built around calm guidance, genuine storytelling and dependable craft."
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Professional Team",
              "Premium Editing",
              "Drone Coverage",
              "Fast Delivery",
              "Affordable Packages",
              "4K Cinematic Videos",
              "Creative Storytelling",
            ].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                key={item}
                className="glass flex min-h-28 items-end p-5"
              >
                <span className="font-display text-2xl text-gold">
                  0{index + 1}
                </span>
                <p className="ml-3 text-xs font-bold uppercase tracking-[.1em] text-cream">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="bg-[#111113] px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1344px]">
          <SectionHeading
            centered
            eyebrow="Selected celebrations"
            title={
              <>
                Made to be <em className="text-gold">felt</em>, not just seen.
              </>
            }
            copy="A glimpse into the colour, ceremony and emotion of the stories we have had the privilege to preserve."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {[
              "All",
              "Wedding",
              "Haldi",
              "Mehndi",
              "Birthday",
              "Engagement",
              "Baby Shoot",
              "Events",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFilter(item);
                  setVisibleCount(6);
                }}
                className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-[.13em] transition ${filter === item ? "border-gold bg-gold text-ink" : "border-white/15 text-white/60 hover:border-gold/70 hover:text-gold"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
            className="mt-10 columns-1 gap-4 md:columns-2 lg:columns-4"
          >
            {visibleGallery.map((item, i) => (
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setLightbox(item)}
                key={item.id}
                style={{ height: i % 3 === 0 ? 410 : i % 3 === 1 ? 310 : 360 }}
                className="image-shine group relative mb-4 block h-[260px] w-full break-inside-avoid overflow-hidden text-left"
              >
                <Image
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  src={item.src}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyMjE5MTAiLz48L3N2Zz4="
                  alt={`${item.category}: ${item.title}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-[2] flex translate-y-2 items-end justify-between p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.16em] text-gold">
                      {item.category}
                    </p>
                    <p className="mt-1 font-display text-xl text-cream">
                      {item.title}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/50">
                    <Eye className="h-4 w-4" />
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
          {visibleCount < filteredGallery.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((count) => count + 6)}
                className="border border-gold px-7 py-3 text-xs font-bold uppercase tracking-[.16em] text-gold transition hover:bg-gold hover:text-ink"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        id="packages"
        className="noise relative overflow-hidden bg-charcoal px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1344px]">
          <SectionHeading
            centered
            eyebrow="Wedding collections"
            title={
              <>
                Choose the story you want to{" "}
                <em className="text-gold">keep.</em>
              </>
            }
            copy="Thoughtful starting points for celebrations of every scale. We will tailor every detail around your rituals and vision."
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                key={pkg.name}
                className={`relative flex flex-col border p-7 sm:p-10 ${pkg.featured ? "border-gold bg-[#1c1c1e] shadow-gold" : "border-white/15 bg-white/[.025]"}`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold px-4 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-ink">
                    Most popular
                  </span>
                )}
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">
                  {pkg.label}
                </p>
                <h3 className="mt-3 font-display text-5xl text-cream">
                  {pkg.name}
                </h3>
                <p className="mt-7 font-display text-3xl text-cream sm:text-4xl">
                  {pkg.price}
                </p>
                <div className="my-8 h-px bg-white/15" />
                <ul className="space-y-4">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-5 text-white/65"
                    >
                      <span className="mt-0.5 text-gold">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <GoldButton
                  className={`mt-10 w-full ${!pkg.featured ? "border border-gold bg-transparent !text-gold hover:!bg-gold hover:!text-ink" : ""}`}
                >
                  Book now
                </GoldButton>
              </motion.article>
            ))}
          </div>
          <p className="mt-7 text-center text-xs text-white/45">
            Looking for a bespoke multi-day collection?{" "}
            <a
              href="#booking"
              className="border-b border-gold pb-0.5 text-gold"
            >
              Let us create it together.
            </a>
          </p>
        </div>
      </section>

      <section
        id="reviews"
        className="bg-ink px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1344px]">
          <SectionHeading
            eyebrow="Words from our clients"
            title={
              <>
                The feeling stays <em className="text-gold">with you.</em>
              </>
            }
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {reviews.map(([name, quote], i) => (
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={name}
                className="border border-gold/15 bg-white/[.025] p-8 sm:p-10"
              >
                <div className="text-sm tracking-[.25em] text-gold">★★★★★</div>
                <blockquote className="mt-8 font-display text-[27px] leading-[1.08] text-cream">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-9 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-display text-gold">
                    {name[0]}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white/85">{name}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[.15em] text-white/40">
                      Verified client
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#171719] px-5 py-24 sm:px-6 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1344px]">
          <SectionHeading
            centered
            eyebrow="Our experience"
            title={
              <>
                From first call to <em className="text-gold">forever.</em>
              </>
            }
            copy="A considered process that lets you stay fully present while we take care of the story."
          />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              "Call us",
              "Meeting",
              "Book dates",
              "Celebrate",
              "Editing",
              "Photo delivery",
            ].map((step, i) => (
              <div
                key={step}
                className="relative border-l border-gold/55 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-5"
              >
                <span className="font-display text-4xl text-gold/75">
                  0{i + 1}
                </span>
                <p className="mt-2 font-display text-2xl text-cream">{step}</p>
                {i < 5 && (
                  <span className="absolute right-[-10px] top-[-10px] hidden h-5 w-5 rotate-45 border-r border-t border-gold/55 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/15 bg-ink px-4 py-12 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] grid-cols-2 gap-y-8 sm:grid-cols-4">
          <Counter number="500+" label="Happy families" />
          <Counter number="1000+" label="Events covered" />
          <Counter number="4.9★" label="Average rating" />
          <Counter number="10+" label="Creative team members" />
        </div>
      </section>

      <section
        id="faq"
        className="bg-charcoal px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1344px] gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Questions, answered"
            title={
              <>
                Everything you would like to{" "}
                <em className="text-gold">know.</em>
              </>
            }
            copy="Still wondering about something? We are only a message away."
          />
          <div className="border-t border-gold/20">
            {faqs.map(([question, answer], i) => (
              <div key={question} className="border-b border-gold/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <span className="font-display text-2xl text-cream sm:text-3xl">
                    {question}
                  </span>
                  <span className="text-xl text-gold">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-7 text-white/60">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="booking"
        className="relative overflow-hidden bg-darkbrown px-5 py-24 sm:px-6 lg:px-12 lg:py-36"
      >
        <div
          className="absolute inset-0 opacity-[.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(216,173,84,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(216,173,84,.4) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1344px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Reserve your dates"
              title={
                <>
                  Your story is waiting to be{" "}
                  <em className="text-gold">told.</em>
                </>
              }
              copy="Share a few details about your celebration and our team will be in touch within one business day with availability and a tailored proposal."
            />
            <div className="mt-10 space-y-5">
              <a
                href="tel:+916387029751"
              
                className="flex items-center gap-4 text-sm text-white/75 transition hover:text-gold"
              >
                <span className="grid h-10 w-10 place-items-center border border-gold/50 font-display text-gold">
                  01
                </span>
                {phoneLabel}
              </a>
              <a
                href="mailto:niketparashar98@gmail.com"
                className="flex items-center gap-4 text-sm text-white/75 transition hover:text-gold"
              >
                <span className="grid h-10 w-10 place-items-center border border-gold/50 text-gold">
                  @
                </span>
                niketparashar98@gmail.com
              </a>
              <a
                href="https://maps.google.com/?q=Rama+Ji+Ki+Imambada+Ke+Pichhe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-sm text-white/75 transition hover:text-gold"
              >
                <span className="grid h-10 w-10 place-items-center border border-gold/50 text-gold">
                  ⌖
                </span>
                Rama Ji Ki Imambada Ke Pichhe khaipaar Banda (U.P)
              </a>
            </div>
            <div className="mt-10 flex gap-3">
              {[{ name: "Instagram", label: "IG", href: instagramUrl }].map(
                (social) => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    key={social.name}
                    aria-label={social.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-[10px] font-bold text-white/70 transition hover:border-gold hover:text-gold"
                  >
                    {social.label}
                  </a>
                ),
              )}
            </div>
          </div>
          <form onSubmit={submitBooking} className="glass p-6 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="booking-label">
                Full name
                <input
                  required
                  name="full_name"
                  autoComplete="name"
                  placeholder="Your name"
                  className="booking-input"
                />
              </label>
              <label className="booking-label">
                Phone number
                <input
                  required
                  name="mobile_number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  className="booking-input"
                />
              </label>
              <label className="booking-label">
                Email address
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  className="booking-input"
                />
              </label>
              <label className="booking-label">
                Event type
                <select
                  required
                  name="event_type"
                  defaultValue=""
                  className="booking-input"
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {[
                    "Wedding",
                    "Haldi",
                    "Mehndi",
                    "Sangeet",
                    "Reception",
                    "Pre-Wedding",
                    "Engagement",
                    "Birthday",
                    "Baby Shoot",
                    "Maternity",
                    "Corporate Event",
                  ].map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="booking-label">
                Event date
                <input
                  required
                  name="event_date"
                  type="date"
                  className="booking-input"
                />
              </label>
              <label className="booking-label">
                Location
                <input
                  required
                  name="event_location"
                  placeholder="City / venue"
                  className="booking-input"
                />
              </label>
              <label className="booking-label sm:col-span-2">
                Message
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your celebration..."
                  className="booking-input resize-none"
                />
              </label>
            </div>
            <button
              disabled={formState === "sending"}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-ink transition hover:bg-[#f1d28c] disabled:cursor-wait disabled:opacity-70"
            >
              {formState === "sending"
                ? "Sending inquiry..."
                : "Submit inquiry"}
              <Arrow className="h-4 w-4" />
            </button>
            {formState === "success" && (
              <p role="status" className="mt-4 text-center text-sm text-gold">
                Thank you for contacting Infinity Moments Photography. We will
                contact you shortly.
              </p>
            )}
            {formState === "error" && (
              <p
                role="alert"
                className="mt-4 text-center text-sm text-[#ffc6bd]"
              >
                We could not send your inquiry right now. Please email
                niketparashar98@gmail.com.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-8 pt-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1344px]">
          <div className="grid gap-10 border-b border-gold/15 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#home" className="inline-flex items-center gap-3">
                <img
                  src="/images/infinity-moments-logo.jpeg"
                  alt="Infinity Moments Photography logo"
                  className="h-16 w-16 object-cover object-[50%_19%]"
                />
                <span className="font-display text-3xl leading-none tracking-[.04em] text-cream">
                  Infinity Moments
                </span>
              </a>
              <p className="mt-4 max-w-[230px] text-xs leading-6 text-white/45">
                Capturing Every Moment, Creating Timeless Memories.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold">
                Quick links
              </p>
              <div className="mt-4 grid gap-2">
                {navItems.slice(0, 4).map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-xs text-white/55 hover:text-gold"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold">
                Celebrations
              </p>
              <div className="mt-4 grid gap-2">
                {[
                  "Weddings",
                  "Haldi & Mehndi",
                  "Pre-weddings",
                  "Films & albums",
                ].map((item) => (
                  <a
                    key={item}
                    href="#services"
                    className="text-xs text-white/55 hover:text-gold"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold">
                Get in touch
              </p>
              <a
                href="tel:+916387029751"
                className="mt-4 block text-xs text-white/55 hover:text-gold"
              >
                {phoneLabel}
              </a>
              <a
                href="mailto:niketparashar98@gmail.com"
                className="mt-2 block text-xs text-white/55 hover:text-gold"
              >
                niketparashar98@gmail.com
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-white/55 hover:text-gold"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-[10px] font-bold uppercase tracking-[.13em] text-white/35 sm:flex-row sm:justify-between">
            <p>Copyright © 2026 {studioName}. All rights reserved.</p>
            <p>Designed for Professional Indian Wedding Photography Studio</p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25D366] text-lg font-bold text-white shadow-lg transition hover:scale-110"
      >
        W
      </a>
      <a
        href="#booking"
        className="fixed bottom-5 right-[5.25rem] z-40 hidden items-center gap-2 bg-gold px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-ink shadow-lg transition hover:bg-[#f1d28c] md:flex"
      >
        Book now <Arrow className="h-3.5 w-3.5" />
      </a>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative h-[78vh] w-full max-w-5xl"
              onTouchStart={(event) =>
                setTouchStart(event.touches[0]?.clientX ?? null)
              }
              onTouchEnd={(event) => {
                const end = event.changedTouches[0]?.clientX ?? 0;
                if (touchStart !== null && Math.abs(end - touchStart) > 45)
                  showAdjacent(end > touchStart ? -1 : 1);
                setTouchStart(null);
              }}
            >
              <Image
                fill
                sizes="100vw"
                src={lightbox.src}
                alt={lightbox.title}
                className="object-contain"
              />
              <button
                onClick={() => showAdjacent(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/40 text-xl text-cream hover:border-gold hover:text-gold"
              >
                ←
              </button>
              <button
                onClick={() => showAdjacent(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-white/40 text-xl text-cream hover:border-gold hover:text-gold"
              >
                →
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -right-1 -top-11 grid h-9 w-9 place-items-center border border-white/40 text-cream hover:border-gold hover:text-gold"
                aria-label="Close image"
              >
                <Cross className="h-5 w-5" />
              </button>
              <div className="mt-4 flex items-center justify-between gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.17em] text-gold">
                    {lightbox.category}
                  </p>
                  <p className="mt-1 font-display text-2xl text-cream">
                    {lightbox.title}
                  </p>
                </div>
                <span className="hidden text-xs text-white/45 sm:block">
                  {studioName}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
