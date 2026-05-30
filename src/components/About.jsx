import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-8 bg-surface-low border-b border-outline-variant/20 relative overflow-hidden"
    >
      {/* Decorative Gold Light leak element */}
      <div className="absolute -left-20 top-20 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Storytelling Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6 order-2 lg:order-1"
        >
          <div className="space-y-2">
            <span className="font-label text-xs text-secondary font-bold uppercase tracking-[0.25em]">
              Our Royal Heritage
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-semibold leading-tight">
              A Legacy of <br />
              The Bagara Kitchen
            </h2>
          </div>

          <div className="space-y-6 text-on-surface-variant font-body text-base md:text-lg leading-relaxed font-light">
            <p>
              Born from the royal legacy and historic kitchens of Hyderabad, <strong className="text-white font-medium">The Bagara Kitchen</strong> represents a passionate revival of ancestral recipes passed down through generations. Our legendary Bagara Rice is not just a dish; it’s a fragrant, slow-cooked journey through the ancient spice markets of the Old City.
            </p>
            <p>
              We purposefully pair these rich, aromatic traditional delicacies with modern crisp craft brews, creating a sophisticated tension between the heat of the Deccan spices and the refreshing luxury of a contemporary bar.
            </p>
            <p className="border-l-2 border-secondary pl-4 italic text-sm text-secondary/90">
              "We serve history, slow-cooked to perfection, allowing the stories of The Bagara kitchens to come alive in modern Hyderabad."
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-6 items-center">
            <a
              href="#menu"
              className="bg-transparent border border-secondary text-secondary hover:bg-secondary/10 px-8 py-3.5 rounded-lg font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 duration-300"
            >
              Explore Our Signature Dishes
            </a>
          </div>
        </motion.div>

        {/* Visual Gallery Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 relative aspect-square lg:aspect-video rounded-2xl overflow-hidden border border-outline-variant/40 group shadow-2xl shadow-black/80"
        >
          {/* Authentic Luxury Interior Image from Stitch screens */}
          <img
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 brightness-[0.8]"
            alt="The Bagara Kitchen and Bar luxurious interior in Kompally."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASEr4V-9RAuxW3jJovvxiBvY-2WxW5JKSptYewcV4Tn9vaieTG4wSMGAnJqs96qzo7dH3uSXOIsN3Kid1AWjVceyJwRvqLDY0fH1mxoyuF8eKAZ8wWZIjj1flQuWjNcW3j06KuYIwzbl1AL9u_40gSHydAVRhfvgiNRzS-t1wNrnU1-xI5AOmwhYkU4MpQGu1-ZFNf5I1RAEUASGs0tOqk367B4MwxQ4y9QvEer3FqrMgjlmkin-8bDG4jbXS1mG-9K--R8GmVL5c"
          />

          {/* Subtle Warm Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Small floating info badge */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Elegant Dining</p>
              <p className="text-on-surface-variant text-xs font-light">Kompally, Hyderabad</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
