import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import LottieHero from "./LottieHero";
import Canvas3DWrapper from "./3D/Canvas3D";
import { Background3D } from "./3D/Background3D";

export default function Hero() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/contact");
    };

    return (
        <>
            {/* 3D Background Layer */}
            <div className="fixed inset-0 -z-10 h-screen overflow-hidden">
                <Canvas3DWrapper>
                    <Background3D className="h-full w-full" />
                </Canvas3DWrapper>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/80"></div>
            </div>

            <section
                className="
      relative
      z-10
      min-h-screen
      grid
      lg:grid-cols-2
      items-center
      max-w-7xl
      mx-auto
      px-6
      "
            >

                <div>

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 80
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 1
                        }}
                        className="
          text-5xl
          md:text-7xl
          font-black
          gradient-text
          text-white
          "
                    >
                        WE BUILD.
                        <br />
                        WE TEST.
                        <br />
                        WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">DELIVER.</span>
                    </motion.h1>

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.2
                        }}
                        className="
          mt-8
          text-blue-200
          text-lg
          md:text-xl
          max-w-md
          "
                    >
                        Premium Web Development &
                        Testing Solutions
                    </motion.p>

                    <motion.button
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.4
                        }}
                        onClick={handleGetStarted}
                        className="
          mt-10
          px-8
          py-4
          rounded-lg
          bg-gradient-to-r from-yellow-400 to-yellow-500
          text-slate-900
          font-semibold
          hover:from-yellow-300 hover:to-yellow-400
          transition-all
          cursor-pointer
          shadow-xl
          "
                    >
                        Get Started
                    </motion.button>

                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.3
                    }}
                >
                    <LottieHero />
                </motion.div>

            </section>
        </>
    );
}
