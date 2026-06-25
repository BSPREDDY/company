import Hero from "../components/Hero";
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';
import { FaCode, FaFlask, FaRocket, FaUsers } from 'react-icons/fa';
export default function Home() {
    const services = [
        {
            icon: FaCode,
            title: 'Web Development',
            desc: 'Modern, scalable web applications built with latest technologies'
        },
        {
            icon: FaFlask,
            title: 'Testing & QA',
            desc: 'Comprehensive testing and quality assurance for robust applications'
        },
        {
            icon: FaRocket,
            title: 'SaaS Development',
            desc: 'Complete SaaS MVP development from concept to launch'
        },
        {
            icon: FaUsers,
            title: 'Team Augmentation',
            desc: 'Dedicated development teams for your projects'
        },
    ];

    return (
        <>
            <Helmet>
                <title>Bhavana Technology - Web Development & Testing</title>
                <meta
                    name="description"
                    content="Premium Web Development, Testing, Automation Testing, SaaS MVP Development."
                />
            </Helmet>

            <Hero />

            {/* Services Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
                        <p className="text-xl text-slate-400">Comprehensive solutions tailored to your needs</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-8 hover:border-blue-400/50 transition-all"
                                >
                                    <Icon className="text-4xl text-blue-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-slate-400">{service.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto px-6 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Project?</h2>
                    <p className="text-xl text-blue-50 mb-8">Let's work together to bring your vision to life</p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg hover:bg-blue-50 transition-all hover:shadow-lg"
                    >
                        Start Your Project Today
                    </a>
                </motion.div>
            </section>
        </>
    );
}
