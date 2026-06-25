import Hero from "../components/Hero";
import MissionVision from "../components/MissionVision";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <>
            <Helmet>

                <title>
                    Bhavana Technology - Innovative Digital Solutions
                </title>

                <meta
                    name="description"
                    content="Bhavana Technology delivers cutting-edge web development, testing, automation testing, and SaaS MVP development solutions for businesses of all sizes."
                />

            </Helmet>

            <Hero />
            <MissionVision />
        </>
    );
}
