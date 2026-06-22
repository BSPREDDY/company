import React, { useRef } from 'react';
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
            meshRef.current.scale.x = 1 + Math.sin(pulseRef.current) * 0.15;
            meshRef.current.scale.y = 1 + Math.sin(pulseRef.current) * 0.15;
            meshRef.current.rotation.z += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 2, -5]}>
            <boxGeometry args={[2, 2, 0.5]} />
            <meshPhongMaterial
                color="#0066ff"
                emissive="#0099ff"
                emissiveIntensity={0.4}
                shininess={100}
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

// Digital Rain Effect
const DigitalRain = () => {
    const groupRef = useRef();
    const particles = useRef([]);

    if (particles.current.length === 0) {
        for (let i = 0; i < 50; i++) {
            particles.current.push({
                x: Math.random() * 30 - 15,
                y: Math.random() * 20,
                z: Math.random() * 10 - 15,
                speed: Math.random() * 0.05 + 0.02,
                scale: Math.random() * 0.03 + 0.01,
            });
        }
    }

    useFrame(() => {
        if (groupRef.current) {
            particles.current.forEach((p) => {
                p.y -= p.speed;
                if (p.y < -10) {
                    p.y = 20;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {particles.current.map((p, idx) => (
                <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.scale}>
                    <sphereGeometry args={[1, 8, 8]} />
                    <meshBasicMaterial color="#0099ff" transparent opacity={0.6} />
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

// Main Canvas Component
export const Background3D = ({ className = '' }) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
                <Lights />
                <PulsingLogo />
                <OrbittingIcons />
                <DigitalRain />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};
