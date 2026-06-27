import { Helmet } from "react-helmet-async";
import ScrollReveal from "../components/ScrollReveal";
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

                    {/* Core Values */}
                    <div className="mt-16">
                        <ScrollReveal>
                            <h2 className="text-4xl font-bold mb-12 text-white text-center">
                                Our Core Values
                            </h2>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Quality First",
                                    description: "We maintain the highest standards in every line of code and every test case."
                                },
                                {
                                    title: "Customer Success",
                                    description: "Your success is our priority. We build solutions that drive real business results."
                                },
                                {
                                    title: "Innovation",
                                    description: "We stay ahead of technology trends to deliver cutting-edge solutions."
                                }
                            ].map((value, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.1}>
                                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 p-8 rounded-lg hover:border-blue-400/60 transition-all">
                                        <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                                        <p className="text-slate-300">{value.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
