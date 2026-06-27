import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="relative min-h-screen  items-center justify-center overflow-hidden pt-5 pb-20">
            {/* Subtle background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Logo/Badge */}
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="inline-block bg-blue-500/20 border border-blue-500/50 rounded-full px-6 py-2">
                        <span className="text-blue-300 text-sm font-semibold">Welcome to Bhavana technology and software solutions</span>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    Build Extraordinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Digital Solutions</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                    Premium web development, testing, automation, and SaaS MVP development solutions tailored for your success.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                >
                    <Link
                        to="/contact"
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 inline-block"
                    >
                        Get Started Today
                    </Link>
                    <Link
                        to="/services"
                        className="border-2 border-blue-400 text-blue-300 hover:bg-blue-400/10 font-semibold py-4 px-8 rounded-lg transition-all inline-block"
                    >
                        Explore Services
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-3 gap-6 md:gap-12 text-center"
                >
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">1</p>
                        <p className="text-slate-400 mt-2">Projects Completed</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">100%</p>
                        <p className="text-slate-400 mt-2">Client Satisfaction</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-blue-400">2+</p>
                        <p className="text-slate-400 mt-2">Years of Experience</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="text-blue-400 text-center">
                    <p className="text-sm mb-2">Scroll to explore</p>
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}