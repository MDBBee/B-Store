"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import promoImage from "@/public/images/promo1.jpg";
import { AnimatePresence, motion } from "motion/react";

// Static target date (replace with desired date)
const TARGET_DATE = new Date("2026-04-14T08:12:00");

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    // Calculate initial time on client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  if (!time) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Deal Has Ended</h3>
          <p>
            This deal is no longer available. Check out our latest promotions!
          </p>

          <div className="text-center">
            <Button asChild>
              <Link href="/search">View Products</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={promoImage}
            alt="promotion"
            className="w-72 h-52 object-cover"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          <StatBox
            key="days"
            label={`${time.days < 2 ? "Day" : "Days"}`}
            value={time.days}
          />
          <StatBox
            key="hours"
            label={`${time.hours < 2 ? "Hour" : "Hours"}`}
            value={time.hours}
          />
          <StatBox
            key="minutes"
            label={`${time.minutes < 2 ? "Minute" : "Minutes"}`}
            value={time.minutes}
          />
          <StatBox
            key="seconds"
            label={`${time.seconds < 2 ? "Second" : "Seconds"}`}
            value={time.seconds}
          />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/product/blotz-2.0">View Product</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <Link
          href="/product/blotz-2.0"
          className="group w-72 h-52 border-2 rounded-md overflow-hidden"
        >
          <Image
            src={promoImage}
            alt="promotion"
            className="size-full rounded-xl  p-2 object-cover group-hover:scale-125 group-hover:-rotate-90 duration-300 "
          />
        </Link>
      </div>
    </section>
  );
};

const formatValue = (value: number) => value.toString().padStart(2, "0");

const AnimatedDigit = ({ digit }: { digit: string }) => (
  <span className="relative inline-block w-[1ch] h-[1em] overflow-hidden tabular-nums align-baseline">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={digit}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.7 }}
        className="absolute inset-0 inline-flex items-center justify-center"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
);

const StatBox = ({ label, value }: { label: string; value: number }) => {
  const digits = formatValue(value).split("");

  return (
    <motion.li className="p-4 w-full text-center">
      <p className="text-3xl font-bold flex justify-center gap-1 tabular-nums leading-none">
        {digits.map((digit, index) => (
          <AnimatedDigit key={index} digit={digit} />
        ))}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={label}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: "spring" }}
        >
          {label}
        </motion.p>
      </AnimatePresence>
    </motion.li>
  );
};

export default DealCountdown;
