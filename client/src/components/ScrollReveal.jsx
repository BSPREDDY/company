import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
    children,
    delay = 0,
}) {
    const ref = useRef();

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            {
                y: 40,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 95%",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [delay]);

    return <div ref={ref}>{children}</div>;
}
