import { Helmet } from "react-helmet-async";
import ScrollReveal from "../components/ScrollReveal";
import MissionVision from "../components/MissionVision";
import "../../src/index.css";


export default function About() {
    return (
        <>
            <Helmet>
                <title>
                    About | Bhavana Technology
                </title>

                <meta
                    name="description"
                    content="Learn more about Bhavana Technology's premium web development and testing solutions."
                />
            </Helmet>

            {/* Hero Section with Gradient Background */}
            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Bhavana technology and software solutions</span>
                    </h1>
                </div>
            </section>

            {/* Main Content */}
            <section className=" py-24 px-6">
                <div className="max-w-7xl mx-auto">

                    <ScrollReveal>
                        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 p-12 rounded-lg">
                            <h2 className="text-4xl font-bold mb-6 text-white">
                                Who We Are
                            </h2>

                            <p className="text-lg text-blue-100 leading-relaxed mb-6">
                                Bhavana Technology delivers premium web development, automation testing,
                                manual testing, SaaS MVP solutions, authentication systems,
                                and enterprise dashboards.
                            </p>

                            <p className="text-lg text-blue-100 leading-relaxed">
                                We focus on quality, scalability, security, and performance
                                to help your business grow and succeed in the digital landscape.
                            </p>
                        </div>
                    </ScrollReveal>

                    <MissionVision />

                </div>
            </section>
        </>
    );
}
