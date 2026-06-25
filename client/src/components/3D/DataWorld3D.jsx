import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Data Sphere
const FloatingDataSphere = () => {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.002;

            meshRef.current.position.y =
                Math.sin(clock.elapsedTime) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -8]} scale={3}>
            <sphereGeometry args={[1, 24, 24]} />
            <MeshDistortMaterial
                color="#0099ff"
                emissive="#0066ff"
                emissiveIntensity={0.4}
                distort={0.3}
                speed={2}
            />
        </mesh>
    );
};

// Orbiting Particles
const OrbittingParticles = () => {
    const groupRef = useRef();
    const particlesRef = useRef([]);

    if (particlesRef.current.length === 0) {
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 8 + Math.random() * 3;
            particlesRef.current.push({
                angle,
                radius,
                height: Math.random() * 6 - 3,
                speed: Math.random() * 0.005 + 0.002,
            });
        }
    }

    useFrame(() => {
        if (groupRef.current) {
            particlesRef.current.forEach((p) => {
                p.angle += p.speed;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {particlesRef.current.map((p, idx) => (
                <mesh
                    key={idx}
                    position={[
                        Math.cos(p.angle) * p.radius,
                        p.height,
                        Math.sin(p.angle) * p.radius,
                    ]}
                    scale={0.05}
                >
                    <octahedronGeometry args={[1]} />
                    <meshBasicMaterial color="#ffd700" transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
};

// Grid Background
const Grid = () => {
    const gridRef = useRef();

    useFrame(() => {
        if (gridRef.current) {
            gridRef.current.position.z += 0.01;
            if (gridRef.current.position.z > 0) {
                gridRef.current.position.z = -100;
            }
        }
    });

    return (
        <group ref={gridRef}>
            {Array.from({ length: 20 }).map((_, i) => (
                <lineSegments key={`h-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                -30,
                                -30 + i * 3,
                                0,
                                30,
                                -30 + i * 3,
                                0,
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#0066ff" transparent opacity={0.2} />
                </lineSegments>
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
                <lineSegments key={`v-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                -30 + i * 3,
                                -30,
                                0,
                                -30 + i * 3,
                                30,
                                0,
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#0066ff" transparent opacity={0.2} />
                </lineSegments>
            ))}
        </group>
    );
};

// Ambient Lights
const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.4} color="#0066ff" />
            <pointLight position={[20, 20, 10]} intensity={1} color="#00d4ff" />
            <pointLight position={[-20, -20, -10]} intensity={0.6} color="#ffd700" />
        </>
    );
};

// Main Canvas Component
export const DataWorld3D = ({ className = '' }) => {
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
                <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={75} />
                <Lights />
                <Grid />
                <FloatingDataSphere />
                <OrbittingParticles />
            </Canvas>
        </div>
    );
};
