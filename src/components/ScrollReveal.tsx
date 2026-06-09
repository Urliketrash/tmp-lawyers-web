'use client';

import { motion } from 'framer-motion';
import React from 'react';

type ScrollRevealProps = {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  className?: string;
};

const variants = {
  'fade-up': {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  },
  'fade-down': {
    initial: { opacity: 0, y: -30 },
    whileInView: { opacity: 1, y: 0 },
  },
  'fade-left': {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
  },
  'fade-right': {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
  },
  'zoom-in': {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
  },
  'zoom-out': {
    initial: { opacity: 0, scale: 1.05 },
    whileInView: { opacity: 1, scale: 1 },
  },
};

/**
 * ScrollReveal component leverages Framer Motion to create smooth scroll animations.
 * Provides drop-in replacement for AOS animations (fade-up, zoom-in, etc.)
 */
export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const chosenVariant = variants[variant] || variants['fade-up'];

  return (
    <motion.div
      initial={chosenVariant.initial}
      whileInView={chosenVariant.whileInView}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
