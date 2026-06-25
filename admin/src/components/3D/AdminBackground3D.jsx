// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { IcosahedronGeometry } from 'three';

// function AnimatedBackground() {
//     const meshRef = useRef();

//     const edgeGeometry = useMemo(() => {
//         return new IcosahedronGeometry(3, 2);
//     }, []);

//     useFrame(({ mouse, clock }) => {
//         if (meshRef.current) {
//             meshRef.current.rotation.x = mouse.y * 0.5;
//             meshRef.current.rotation.y =
//                 mouse.x * 0.5 + clock.elapsedTime * 0.2;
//         }
//     });

//     return (
//         <>
//             {/* Lights */}
//             <ambientLight intensity={0.5} />
//             <pointLight
//                 position={[10, 10, 10]}
//                 intensity={1}
//                 color="#0099ff"
//             />
//             <pointLight
//                 position={[-10, -10, 10]}
//                 intensity={0.8}
//                 color="#ffd700"
//             />

//             {/* Main rotating sphere */}
//             <mesh ref={meshRef} scale={8}>
//                 <icosahedronGeometry args={[1, 4]} />
//                 <meshPhongMaterial
//                     color="#1e293b"
//                     wireframe
//                     opacity={0.15}
//                     transparent
//                 />
//             </mesh>

//             {/* Floating element 1 */}
//             <mesh position={[3, 2, -5]} scale={0.5}>
//                 <octahedronGeometry args={[1]} />
//                 <meshStandardMaterial
//                     color="#0099ff"
//                     emissive="#0066ff"
//                     emissiveIntensity={0.5}
//                 />
//             </mesh>

//             {/* Floating element 2 */}
//             <mesh position={[-3, -2, -5]} scale={0.6}>
//                 <tetrahedronGeometry args={[1]} />
//                 <meshStandardMaterial
//                     color="#ffd700"
//                     emissive="#ffed4e"
//                     emissiveIntensity={0.4}
//                 />
//             </mesh>

//             {/* Grid / Wireframe effect */}
//             <lineSegments>
//                 <edgesGeometry args={[edgeGeometry]} />
//                 <lineBasicMaterial
//                     color="#0099ff"
//                     transparent
//                     opacity={0.2}
//                 />
//             </lineSegments>
//         </>
//     );
// }

// export default function AdminBackground3D() {
//     return (
//         <div
//             style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 0,
//             }}
//         >
//             <Canvas
//                 camera={{ position: [0, 0, 5], fov: 75 }}
//                 dpr={[1, 2]}
//                 gl={{
//                     alpha: true,
//                     antialias: true,
//                 }}
//             >
//                 <AnimatedBackground />
//             </Canvas>
//         </div>
//     );
// }

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedBackground() {
    const groupRef = useRef(null);
    const floatingGemsRef = useRef([]);
    const dataStreamsRef = useRef([]);

    useFrame(({ clock, mouse }) => {
        const elapsed = clock.elapsedTime;

        if (groupRef.current) {
            // Smooth camera-like rotation based on mouse
            groupRef.current.rotation.y = mouse.x * 0.3 + elapsed * 0.05;
            groupRef.current.rotation.x = mouse.y * 0.2;
        }

        // Animate floating gems
        floatingGemsRef.current.forEach((gem, i) => {
            if (gem) {
                gem.position.y = Math.sin(elapsed + i) * 2;
                gem.position.x = Math.cos(elapsed * 0.5 + i * 0.5) * 3;
                gem.position.z = Math.sin(elapsed * 0.3 + i * 1.5) * 2;
                gem.rotation.x += 0.005;
                gem.rotation.y += 0.008;
                gem.scale.x = 1 + Math.sin(elapsed + i * 2) * 0.3;
            }
        });

        // Animate data streams (lines)
        dataStreamsRef.current.forEach((line, i) => {
            if (line) {
                line.rotation.z = elapsed * (0.3 + i * 0.1);
                line.scale.x = 1 + Math.sin(elapsed + i) * 0.2;
            }
        });
    });

    return (
        <>
            {/* Ambient light - soft overall lighting */}
            <ambientLight intensity={0.4} color="#001a33" />

            {/* Primary blue light - represents data flow */}
            <pointLight position={[8, 6, 8]} intensity={1.2} color="#0099ff" distance={100} />

            {/* Gold accent light - warm glow */}
            <pointLight position={[-8, -4, 10]} intensity={0.9} color="#ffed4e" distance={80} />

            {/* Secondary blue light */}
            <pointLight position={[-10, 8, -5]} intensity={0.7} color="#00ccff" distance={70} />

            {/* Core group container for all animated elements */}
            <group ref={groupRef}>
                {/* Central massive wireframe sphere - Data World */}
                <mesh scale={12} position={[0, 0, -8]} rotation={[0, 0, 0.3]}>
                    <icosahedronGeometry args={[1, 5]} />
                    <meshPhongMaterial
                        color="#0d1f2d"
                        wireframe={true}
                        wireframeLinewidth={0.3}
                        opacity={0.08}
                        transparent={true}
                        emissive="#003366"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Concentric glowing rings */}
                <mesh position={[0, 0, -5]} scale={[8, 8, 1]}>
                    <torusGeometry args={[3, 0.1, 16, 100]} />
                    <meshStandardMaterial
                        color="#0099ff"
                        emissive="#0066ff"
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                <mesh position={[0, 0, -4]} scale={[6, 6, 1]} rotation={[0.5, 0.3, 0.2]}>
                    <torusGeometry args={[2.5, 0.08, 16, 100]} />
                    <meshStandardMaterial
                        color="#00ccff"
                        emissive="#00aaff"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.4}
                    />
                </mesh>

                {/* Floating tech-inspired gems */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <mesh key={`gem-${i}`} ref={(el) => (floatingGemsRef.current[i] = el)} scale={0.4 + i * 0.1}>
                        <dodecahedronGeometry />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? '#0099ff' : '#ffed4e'}
                            emissive={i % 2 === 0 ? '#0066ff' : '#ffb700'}
                            emissiveIntensity={0.6}
                            wireframe={i % 3 === 0}
                            metalness={0.7}
                            roughness={0.3}
                        />
                    </mesh>
                ))}

                {/* Data stream lines */}
                {[0, 1, 2, 3].map((i) => (
                    <mesh key={`stream-${i}`} ref={(el) => (dataStreamsRef.current[i] = el)} rotation={[i * 0.5, i * 0.3, i * 0.4]}>
                        <torusGeometry args={[4, 0.05, 8, 100]} />
                        <lineBasicMaterial color={i % 2 === 0 ? '#0099ff' : '#00ccff'} opacity={0.4} transparent />
                    </mesh>
                ))}

                {/* Subtle grid background */}
                <mesh position={[0, -2, -10]} scale={[15, 15, 1]}>
                    <planeGeometry args={[1, 1, 20, 20]} />
                    <meshStandardMaterial
                        color="#001a2e"
                        wireframe={true}
                        emissive="#003366"
                        emissiveIntensity={0.1}
                        transparent
                        opacity={0.15}
                    />
                </mesh>

                {/* Glow/halo effect with multiple layers */}
                <mesh scale={[3, 3, 3]}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial
                        color="#0099ff"
                        emissive="#0099ff"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.05}
                    />
                </mesh>

                {/* Golden accent geometry */}
                <mesh position={[0, 4, -2]} scale={0.8}>
                    <octahedronGeometry args={[1, 3]} />
                    <meshStandardMaterial
                        color="#ffed4e"
                        emissive="#ffb700"
                        emissiveIntensity={0.4}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Additional blue accent */}
                <mesh position={[0, -4, -2]} scale={0.7}>
                    <icosahedronGeometry args={[1, 2]} />
                    <meshStandardMaterial
                        color="#0099ff"
                        emissive="#0066ff"
                        emissiveIntensity={0.5}
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
            </group>

            {/* Additional subtle background glow */}
            <mesh position={[0, 0, -15]} scale={20}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#001a33"
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </>
    );
}

export function AdminBackground3D() {
    return (
        <Canvas
            camera={{
                position: [0, 0, 8],
                fov: 60,
                near: 0.1,
                far: 1000,
            }}
            style={{ height: '100%', width: '100%' }}
            gl={{
                alpha: true,
                antialias: true,
                pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
                powerPreference: 'high-performance',
                failIfMajorPerformanceCaveat: false,
                stencil: false,
                precision: 'mediump',
            }}
        >
            <AnimatedBackground />
        </Canvas>
    );
}
