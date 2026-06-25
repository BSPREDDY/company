import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiCheck } from 'react-icons/fi';

const MissionVision = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
        hover: {
            y: -8,
            transition: { duration: 0.2 },
        },
    };

    return (
        <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-16 md:mb-24" variants={itemVariants}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                            Our Mission & Vision
                        </span>
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Driving innovation and excellence through cutting-edge technology solutions
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {/* Mission Card */}
                    <motion.div
                        className="group relative"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 md:p-10 hover:border-blue-500/40 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <FiTarget className="text-2xl text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Mission</h3>
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-6">
                                To empower businesses of all sizes with innovative digital solutions that drive growth, enhance efficiency, and create lasting value in an ever-evolving digital landscape.
                            </p>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                                    <span className="text-slate-400 text-sm">Deliver excellence in every project</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                                    <span className="text-slate-400 text-sm">Foster long-term client partnerships</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                                    <span className="text-slate-400 text-sm">Embrace continuous innovation</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        className="group relative md:col-span-1 lg:col-span-2"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 md:p-10 hover:border-cyan-500/40 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-cyan-500/20 rounded-lg">
                                    <FiEye className="text-2xl text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Vision</h3>
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-8">
                                To be a globally recognized leader in technology solutions and digital transformation, known for delivering scalable, secure, and intelligent applications that set industry standards for excellence and innovation.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                                    <p className="text-blue-300 font-semibold text-sm mb-1">Innovation</p>
                                    <p className="text-slate-400 text-xs">Cutting-edge tech solutions</p>
                                </div>
                                <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                                    <p className="text-cyan-300 font-semibold text-sm mb-1">Quality</p>
                                    <p className="text-slate-400 text-xs">Excellence in execution</p>
                                </div>
                                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                                    <p className="text-purple-300 font-semibold text-sm mb-1">Impact</p>
                                    <p className="text-slate-400 text-xs">Transformative results</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Core Values Section */}
                <motion.div className="mt-20 md:mt-28" variants={itemVariants}>
                    <h3 className="text-3xl font-bold text-white text-center mb-12">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Core Values</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'Integrity',
                                description: 'We operate with transparency and honesty in all our dealings',
                                icon: '🤝',
                            },
                            {
                                title: 'Innovation',
                                description: 'We constantly push boundaries to deliver cutting-edge solutions',
                                icon: '💡',
                            },
                            {
                                title: 'Excellence',
                                description: 'We maintain the highest standards in quality and performance',
                                icon: '⭐',
                            },
                            {
                                title: 'Collaboration',
                                description: 'We believe in teamwork and client partnership for success',
                                icon: '🚀',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.1 },
                                    },
                                }}
                            >
                                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 h-full group-hover:shadow-lg group-hover:shadow-blue-500/10">
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default MissionVision;
