"use client";

import Link from "next/link";
import Image from "next/image";
import bars from "@/icons/bars.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.4,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

export default function Navbar({ setLanguage }: { setLanguage: any }) {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.4,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.12, 1, 0.39, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <>
      <nav className="w-full flex flex-row shadow-md justify-center min-h-20 fixed sm:sticky top-0 z-50 bg-dark">
        <div className="sm:hidden flex text-white justify-start items-center flex-row w-full bg-dark">
          <h4 className="font-light ml-4">
            <Link href="/">
              <span className="text-white">Uni</span>
              <span className="text-test2-orange">Class</span>
            </Link>
          </h4>
        </div>
        <div
          className="sm:hidden flex justify-end items-center flex-row w-full bg-dark pr-4"
          onClick={() => {
            toggleMenu();
            document.body.style.overflowY =
              document.body.style.overflowY == "hidden" ? "auto" : "hidden";
          }}
        >
          <div className="h-full w-fit flex justify-center items-center mr-2">
            <p className="text-white">MENU</p>
          </div>
          <Image
            src={bars}
            alt="dropdown menu"
            width={50}
            height={50}
            priority={true}
            className="w-[50px] h-[50px]"
          />
        </div>
        <div className="flex-1 max-sm:hidden w-full flex min-h-16 bg-inherit sticky top-0 z-50 justify-center mt-[0rem]">
          <div className="flex flex-1 flex-row justify-between items-center max-w-6xl sm:mx-[2rem] md:mx-[5rem]">
            <h3 className="font-light">
              <Link href="/">
                <span className="text-white">Uni</span>
                <span className="text-test2-orange">Class</span>
              </Link>
            </h3>
            <ul className="w-fit flex justify-start items-center text-[18px] tracking-[1.6px] text-black">
              {navLinks.map((page, index) => (
                <li className="sm:w-[4rem] md:w-[6rem] text-center" key={index}>
                  <Link
                    className="hover:text-test-primary ease-in-out duration-300 transition-colors text-white"
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              <form
                action={(e) => {
                  setLanguage("nl");
                }}
              >
                <li key="4" className="text-right w-[3rem]">
                  <button className="hover:text-test-primary text-white">
                    NL
                  </button>
                </li>
              </form>
              <p className="text-white">/</p>
              <form
                action={(e) => {
                  setLanguage("en");
                }}
              >
                <li key="5" className="text-left w-[3rem]">
                  <button className="hover:text-primary text-white">EN</button>
                </li>
              </form>
            </ul>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="sm:hidden fixed left-0 top-0 w-full h-screen bg-dark text-black z-20 p-10 px-14 origin-top"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-start">
                <p
                  className="cursor-pointer text-white text-md"
                  onClick={() => {
                    toggleMenu();
                    document.body.style.overflowY = "auto";
                  }}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center items-center"
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}>
                      <MobileNavLink title={link.title} href={link.href} />
                    </div>
                  );
                })}
                <form
                  action={(e) => {
                    setLanguage("nl");
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-4xl uppercase text-white m-2"
                  >
                    <button
                      onClick={() => {
                        document.body.style.overflowY = "auto";
                        toggleMenu();
                      }}
                    >
                      NL
                    </button>
                  </motion.div>
                </form>
                <form
                  action={(e) => {
                    setLanguage("en");
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-4xl uppercase text-white m-2"
                  >
                    <button
                      onClick={() => {
                        document.body.style.overflowY = "auto";
                        toggleMenu();
                      }}
                    >
                      EN
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  const router = useRouter();

  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-4xl uppercase text-white m-2 hover:cursor-pointer"
    >
      <div
        onClick={() => {
          document.body.style.overflowY = "auto";
          router.push(href);
        }}
      >
        {title}
      </div>
    </motion.div>
  );
};
