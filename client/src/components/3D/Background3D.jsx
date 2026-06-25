import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Pulsing Bhavana Logo
const PulsingLogo = () => {
    const meshRef = useRef();
    const pulseRef = useRef(0);

    useFrame(() => {
        if (meshRef.current) {
            pulseRef.current += 0.01;
            meshRef.current.scale.x = 1 + Math.sin(pulseRef.current) * 0.2;
            meshRef.current.scale.y = 1 + Math.sin(pulseRef.current) * 0.2;
            meshRef.current.scale.z = 1 + Math.cos(pulseRef.current * 0.8) * 0.15;
            meshRef.current.rotation.z += 0.003;
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 2, -5]}>
            <boxGeometry args={[2, 2, 0.5]} />
            <meshPhongMaterial
                color="#0066ff"
                emissive="#0099ff"
                emissiveIntensity={0.6}
                shininess={120}
            />
        </mesh>
    );
};

// Tech Icon Orbits
const TechIcon = ({ position, color, speed }) => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += speed;
            meshRef.current.rotation.y += speed * 0.7;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[0.3]} />
            <meshPhongMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                wireframe={false}
            />
        </mesh>
    );
};

// Orbiting Tech Icons
const OrbittingIcons = () => {
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.0003;
        }
    });

    const icons = [
        { angle: 0, color: '#ff6b35' }, // HTML orange
        { angle: Math.PI / 3, color: '#0099ff' }, // CSS blue
        { angle: (Math.PI * 2) / 3, color: '#ffd700' }, // JS yellow
        { angle: Math.PI, color: '#00d4ff' }, // React cyan
        { angle: (Math.PI * 4) / 3, color: '#61dafb' }, // Node green
        { angle: (Math.PI * 5) / 3, color: '#ffffff' }, // Next white
    ];

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {icons.map((icon, idx) => (
                <TechIcon
                    key={idx}
                    position={[
                        Math.cos(icon.angle) * 6,
                        Math.sin(icon.angle) * 6,
                        -2,
                    ]}
                    color={icon.color}
                    speed={0.01}
                />
            ))}
        </group>
    );
};

// Enhanced Particle System (Optimized)
const ParticleSystem = () => {
    const particlesRef = useRef(null);
    const particles = useMemo(() => {
        const temp = [];
        // Reduced from 150 to 80 particles for better performance
        for (let i = 0; i < 80; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 40,
                y: Math.random() * 30 - 10,
                z: (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 0.015,
                vy: Math.random() * 0.04 + 0.008,
                vz: (Math.random() - 0.5) * 0.015,
                size: Math.random() * 0.03 + 0.008,
                life: Math.random(),
                color: Math.random() > 0.5 ? '#0099ff' : '#00d4ff',
            });
        }
        return temp;
    }, []);

    useFrame(() => {
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;
            p.life -= 0.001;

            if (p.life < 0 || p.y > 20) {
                p.x = (Math.random() - 0.5) * 40;
                p.y = -10;
                p.z = (Math.random() - 0.5) * 30;
                p.life = 1;
            }
        });
    });

    return (
        <group ref={particlesRef}>
            {particles.map((p, idx) => (
                <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.size}>
                    <sphereGeometry args={[1, 8, 8]} />
                    <meshBasicMaterial
                        color={p.color}
                        transparent
                        opacity={0.6 * p.life}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Ambient Lights and Effects
const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.3} color="#0066ff" />
            <pointLight position={[10, 10, 5]} intensity={1.5} color="#0099ff" />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ffd700" />
            <pointLight position={[0, 0, 10]} intensity={0.5} color="#00d4ff" />
        </>
    );
};

// Parallax Background Layers
const ParallaxLayers = () => {
    const groupRef = useRef();

    useFrame(({ mouse }) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = mouse.y * 0.1;
            groupRef.current.rotation.y = mouse.x * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Far background layer */}
            <mesh position={[0, 0, -20]} scale={[30, 30, 1]}>
                <planeGeometry args={[1, 1, 10, 10]} />
                <meshStandardMaterial
                    color="#0d1b2a"
                    wireframe
                    opacity={0.1}
                    transparent
                />
            </mesh>

            {/* Mid background layer */}
            <mesh position={[0, 0, -10]} scale={[25, 25, 1]} rotation={[0, 0.5, 0]}>
                <planeGeometry args={[1, 1, 10, 10]} />
                <meshStandardMaterial
                    color="#0d1b2a"
                    wireframe
                    opacity={0.15}
                    transparent
                />
            </mesh>
        </group>
    );
};

// Main Canvas Component
export const Background3D = ({ className = '' }) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Canvas
                frameloop="demand"
                dpr={[1, 1.5]}
                gl={{
                    antialias: false,
                    powerPreference: "low-power",
                    alpha: true
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
                <Lights />
                <ParallaxLayers />
                <PulsingLogo />
                <OrbittingIcons />
                <ParticleSystem />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    );
};
