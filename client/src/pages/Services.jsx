import { Helmet } from "react-helmet-async";
import { Suspense } from "react";
import {
    FaGlobe,
    FaShoppingCart,
    FaUserShield,
    FaServer,
    FaMobileAlt,
    FaRocket,
    FaUser,
    FaRobot,
    FaShieldAlt,
    FaCodeBranch,
    FaMobile,
    FaGlobeAmericas,
    FaTachometerAlt,
    FaSync,
    FaCheck,
    FaClock,
    FaTrophy,
    FaHeadset
} from "react-icons/fa";

import ServiceCard from "../components/ServiceCard";
import ScrollReveal from "../components/ScrollReveal";
import Canvas3DWrapper from "../components/3D/Canvas3D";
import { Background3D } from "../components/3D/Background3D";

// Main Services
const mainServices = [
    {
        title: "Business Websites",
        icon: <FaGlobe className="text-3xl" />,
        description: "Professional websites for brands and companies."
    },
    {
        title: "eCommerce Websites",
        icon: <FaShoppingCart className="text-3xl" />,
        description: "Feature-rich online stores that sell and scale."
    },
    {
        title: "Admin Dashboards",
        icon: <FaServer className="text-3xl" />,
        description: "Powerful dashboards to manage your data and operations."
    },
    {
        title: "Authentication Systems",
        icon: <FaUserShield className="text-3xl" />,
        description: "Secure login, registration and role-based access."
    },
    {
        title: "Real-time Apps",
        icon: <FaMobileAlt className="text-3xl" />,
        description: "Live chat, notifications, tracking and more in real-time."
    },
    {
        title: "SaaS MVP Development",
        icon: <FaRocket className="text-3xl" />,
        description: "Turn your idea into a scalable MVP and launch faster."
    }
];

// Testing Services
const testingServices = [
    {
        title: "Manual Testing",
        icon: <FaUser />,
        description: "Human-driven testing to identify real-world usability issues."
    },
    {
        title: "Security Testing",
        icon: <FaShieldAlt />,
        description: "Protecting applications against vulnerabilities."
    },
    {
        title: "Automation Testing",
        icon: <FaRobot />,
        description: "Automated test scripts for faster and reliable validation."
    },
    {
        title: "API Testing",
        icon: <FaCodeBranch />,
        description: "Validating backend services and integrations."
    },
    {
        title: "Functional Testing",
        icon: <FaCheck />,
        description: "Verifying all features work according to requirements."
    },
    {
        title: "UI/UX Testing",
        icon: <FaUser />,
        description: "Ensuring a smooth intuitive user experience."
    },
    {
        title: "Responsive Testing",
        icon: <FaMobile />,
        description: "Testing across mobile, tablet, and desktop devices."
    },
    {
        title: "Accessibility Testing",
        icon: <FaGlobeAmericas />,
        description: "Making websites accessible to all users."
    },
    {
        title: "Cross-Browser Testing",
        icon: <FaGlobeAmericas />,
        description: "Ensuring compatibility across all major browsers."
    },
    {
        title: "Performance Testing",
        icon: <FaTachometerAlt />,
        description: "Optimizing speed, scalability and responsiveness."
    }
];

// Why Work With Us
const whyChooseUs = [
    {
        title: "Clean & Efficient Code",
        icon: <FaCodeBranch className="text-2xl" />,
        description: "Maintainable, scalable code following best practices"
    },
    {
        title: "Clear Communication",
        icon: <FaHeadset className="text-2xl" />,
        description: "Regular updates and transparent collaboration"
    },
    {
        title: "On-Time Delivery",
        icon: <FaClock className="text-2xl" />,
        description: "We respect deadlines and deliver on schedule"
    },
    {
        title: "100% Client Satisfaction",
        icon: <FaTrophy className="text-2xl" />,
        description: "Your success is our priority"
    }
];

export default function Services() {
    return (
        <>
            <Helmet>
                <title>Services | Bhavana Technology</title>
                <meta name="description" content="Web development, testing, and software solutions." />
            </Helmet>

            {/* Hero with 3D Background */}
            <section className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <Canvas3DWrapper>
                        <Background3D />
                    </Canvas3DWrapper>
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Services</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto">
                        We build, test, and perfect your digital solutions
                    </p>
                </div>
            </section>

            {/* Main Services Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
                            What We Build
                        </h2>
                        <p className="text-center text-blue-200 mb-16 text-lg">
                            Comprehensive development solutions tailored to your business needs
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainServices.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 0.08}>
                                <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 p-8 rounded-lg hover:border-blue-400/60 transition-all group cursor-pointer">
                                    <div className="text-blue-400 mb-4 group-hover:text-yellow-400 transition-colors">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-slate-300">{service.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testing Services Section */}
            <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
                            Web Testing Services
                        </h2>
                        <p className="text-center text-blue-200 mb-16 text-lg">
                            10+ specialized testing services to ensure quality and reliability
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {testingServices.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 0.05}>
                                <div className="bg-slate-700/50 border border-blue-400/40 p-6 rounded-lg hover:bg-slate-700 transition-all flex gap-4">
                                    <div className="text-blue-400 text-2xl min-w-fit">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                                        <p className="text-slate-300 text-sm">{service.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
                            Why Work With Us?
                        </h2>
                        <p className="text-center text-blue-200 mb-16 text-lg">
                            Choose excellence in every project
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="text-yellow-400 mb-4 flex justify-center">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Build Something Great?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Let's discuss your project and create the perfect solution
                    </p>
                    <a href="/contact" className="inline-block bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                        Get Started Today
                    </a>
                </div>
            </section>
        </>
    );
}
