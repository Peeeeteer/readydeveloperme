import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useMediaQuery } from "react-responsive";

import { useStore } from "../store/store";

type Props = {
  isOpen: boolean;
  onClickClose: () => void;
};

const ManualPopup: React.FC<Props> = ({ isOpen, onClickClose }) => {
  const theme = useStore((state) => state.theme);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 769px) and (max-width: 1023px)" });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={classNames("fixed top-0 left-0 w-full h-screen z-50", {
            "bg-neutral-30": theme === "light",
            "bg-neutral-100": theme === "dark",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className={classNames(
              "text-2xl text-primary w-11 h-11 flex items-center justify-center bg-neutral-20 rounded-full absolute z-10",
              {
                "top-8 right-8": !isMobile && !isTablet,
                "top-4 right-4": isMobile || isTablet,
              }
            )}
            type="button"
            onClick={onClickClose}
          >
            &#x2715;
          </button>

          <div
            className={classNames(
              "h-screen absolute top-0 overflow-auto",
              {
                "w-1/2 right-0 p-40": !isMobile && !isTablet,
                "w-full left-0 p-6 pt-16": isMobile,
                "w-2/3 right-0 p-8 pt-20": isTablet,
                "bg-neutral-10": theme === "light",
                "bg-[#2A2B2F]": theme === "dark",
              }
            )}
          >
            <h1
              className={classNames("font-bold mb-8", {
                "text-5xl mb-12": !isMobile && !isTablet,
                "text-3xl mb-6": isMobile,
                "text-4xl mb-8": isTablet,
                "text-[#121F3E]": theme === "light",
                "text-white": theme === "dark",
              })}
            >
              Ready Developer Me
              <span className="text-primary">.</span>
            </h1>
            <p
              className={classNames("mb-8", {
                "text-xl mb-10": !isMobile && !isTablet,
                "text-base mb-6": isMobile,
                "text-lg mb-8": isTablet,
                "text-[#121F3E]": theme === "light",
                "text-white": theme === "dark",
              })}
            >
              The easiest way to your Developer Avatar

              <ol >
                <li>1. Customize the appearance </li>
                <li>2. Choose from the 23 avaialble poses.</li>
                <li>3. Click export.</li>
              </ol>
              <br></br>
              Recommended logo size is 2000x2000px.
              <br></br>
              You can use the renders for your website, blog, social media, or anything
              else. It's free to use, and you can use it for both personal and business purposes.

            </p>

            <p
              className={classNames("mb-8", {
                "text-xl mb-10": !isMobile && !isTablet,
                "text-base mb-6": isMobile,
                "text-lg mb-8": isTablet,
                "text-[#121F3E]": theme === "light",
                "text-white": theme === "dark",
              })}
            >
              The renders work great with a  {" "}
              <a className="text-primary hover:underline" href="
              https://3d-portfolio-beryl.vercel.app/" target="_blank">
                Porfolio Template {" "}
              </a>
              I made.
              {<br></br>}
              <a className="text-primary hover:underline" href="
            https://github.com/Peeeeteer/Portfolio-Template" target="_blank">
                Grab the code {" "}
              </a>
              and make your own Portfolio Website in minutes.
            </p>

            <p
              className={classNames("mb-8", {
                "text-xl mb-10": !isMobile && !isTablet,
                "text-base mb-6": isMobile,
                "text-lg mb-8": isTablet,
                "text-[#121F3E]": theme === "light",
                "text-white": theme === "dark",
              })}
            >
              <a className="text-primary hover:underline" href="
              https://github.com/Peeeeteer/readydeveloperme" target="_blank">
                See the source code of Ready Developer {" "}
              </a>

            </p>


            <div className={classNames("flex items-center", {
              "justify-between": !isMobile,
              "flex-col space-y-4": isMobile,
              "justify-between": isTablet,
            })}>
              <p
                className={classNames({
                  "text-xl": !isMobile && !isTablet,
                  "text-base": isMobile,
                  "text-lg": isTablet,
                  "text-[#121F3E]": theme === "light",
                  "text-white": theme === "dark",
                })}
              >
                created by {" "}
                <a className="text-primary hover:underline" href="
              https://github.com/Peeeeteer" target="_blank">
                  Peter{" "}
                </a>
              </p>

              <p
                className={classNames({
                  "text-xl": !isMobile && !isTablet,
                  "text-base": isMobile,
                  "text-lg": isTablet,
                  "text-[#121F3E]": theme === "light",
                  "text-white": theme === "dark",
                })}
              >
                {/* <a className="text-primary hover:underline" href="#">
                  Terms
                </a>{" "}
                &{" "}
                <a className="text-primary hover:underline" href="#">
                  Licensing
                </a> */}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManualPopup;
