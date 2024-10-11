"use client"

import React, { useRef, useEffect} from 'react'
import styles from './page.module.scss'
import Image from 'next/image'
import { useTransform, useScroll, motion, MotionValue } from 'framer-motion'
import useDimension from '@/useDimension';
import Lenis from '@studio-freight/lenis'

const images: string[] = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

interface ColumnProps {
  images: string[];
  y: MotionValue<number>; // Changed to MotionValue<number>
}

export default function Home() {
  const { height } = useDimension();
  const gallery = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
 
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      // Use height from useDimension here if needed
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={`${styles.spacer} font-semibold text-7xl text-center justify-center p-[18%] bg-black text-white`}> Image Slider</div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={`${styles.spacer} font-semibold text-7xl text-center justify-center p-[18%] bg-black text-white`}> By: Praveen Lodhi</div>
    </main>
  );
}

const Column: React.FC<ColumnProps> = ({ images, y }) => {
  return (
    <motion.div
      className={styles.column}
      style={{ y }}
    >
      {
        images.map((src, i) => {
          return (
            <div key={i} className={styles.imageContainer}>
              <Image
                src={`/images/${src}`}
                alt='image'
                fill
              />
            </div>
          )
        })
      }
    </motion.div>
  )
}
