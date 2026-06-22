import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import Canvas3DWrapper from "../components/3D/Canvas3D";
import { Background3D } from "../components/3D/Background3D";

export default function Contact() {
    return (
        <>
            <Helmet>
                <title>
                    Contact | Bhavana Technology
                </title>
                <meta name="description" content="Get in touch with Bhavana Technology for your web development and testing needs." />
            </Helmet>

            {/* 3D Background Layer */}
            <div className="fixed inset-0 -z-10 h-screen overflow-hidden">
                <Canvas3DWrapper>
                    <Background3D className="h-full w-full" />
                </Canvas3DWrapper>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/90"></div>
            </div>

            <section
                className="
        relative
        z-10
        max-w-4xl
        mx-auto
        py-24
        px-6
        min-h-screen
        flex
        flex-col
        justify-center
        "
            >

                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Connect</span>
                    </h1>
                    <p className="text-lg text-blue-200">
                        Have a project in mind? Let's discuss how we can help bring your vision to life.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 p-8 md:p-12 rounded-lg backdrop-blur-sm">
                    <ContactForm />
                </div>

            </section>
        </>
    );
}
