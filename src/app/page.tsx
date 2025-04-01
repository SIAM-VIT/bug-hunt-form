"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Star = {
  top: string;
  left: string;
  size: string;
  animationDuration: string;
};

export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isDesktop = !isMobile;

  useEffect(() => {
    const generateStars = () => {
      return [...Array(25)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 1}px`,
        animationDuration: `${Math.random() * 15 + 30}s`,
      }));
    };
    setStars(generateStars());
  }, []);
  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="-z-50 absolute bg-black rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            x: [0, 50, -50, 50, -50, 0],
            y: [0, -50, 50, -50, 50, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-start text-center">
        <div className="flex flex-row items-center justify-between px-4 sm:px-10 w-full sm:h-[20vh] h-[10vh]">
          {isDesktop && (
            <>
              <Image
                src="/siam-black.png"
                alt="siam logo"
                width={300}
                height={300}
              />
              <h1 className="text-6xl">Bug Hunt 2.0</h1>
            </>
          )}
          {isMobile && (
            <>
              <Image
                src="/siam-black.png"
                alt="siam logo"
                width={140}
                height={140}
              />
              <h1 className="text-2xl">Bug Hunt 2.0</h1>
            </>
          )}
        </div>
        <div className="w-fit h-auto">
          <h1 className="sm:text-[7.5rem] text-[2.7rem] sm:-mt-16 -mt-6">
            Question Form
          </h1>
        </div>
        <div className="min-w-screen min-h-screen mt-2 flex flex-col items-center justify-center">
          <h3 className="sm:text-3xl mb-3 text-xl">
            Kindly submit your questions in this form{" "}
          </h3>
          <div className="z-50 sm:w-[710px] w-[335px] sm:h-[960px] h-[1300px] bg-white mb-7 rounded-xl">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSd5WtyYchHV57YLg2Rq3pkHTXRYtbWuGt60_lxWUdIHkvpbSA/viewform?embedded=true"
              className="sm:w-[710px] sm:h-[960px] w-[335px] h-[1300px]"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}
