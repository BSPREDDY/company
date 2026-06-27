import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Deep Navy Blue Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2e4a] to-[#0f1d2d]" />

            {/* Top-Left: Floating Code Brackets */}
            <motion.div
                animate={{
                    y: [0, -60, 0],
                    x: [0, 30, -30, 0],
                    rotate: [0, 8, -8, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                }}
                className="absolute top-[5%] left-[5%] text-8xl font-black text-cyan-400 opacity-15"
            >
                {'</>'}
            </motion.div>

            {/* Top-Right: Floating Curly Braces */}
            <motion.div
                animate={{
                    y: [0, 70, 0],
                    x: [0, -40, 40, 0],
                    rotate: [0, -10, 10, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[10%] right-[8%] text-9xl font-black text-blue-400 opacity-12"
            >
                {'{'}
            </motion.div>

            {/* Middle-Left: Floating Square Brackets */}
            <motion.div
                animate={{
                    y: [0, -70, 20, 0],
                    x: [0, 50, -50, 0],
                    rotate: [0, 12, -12, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute top-[30%] left-[2%] text-8xl font-black text-teal-400 opacity-14"
            >
                {'['}
            </motion.div>

            {/* Middle-Center: Floating HTML Tag */}
            <motion.div
                animate={{
                    y: [0, 80, -20, 0],
                    x: [0, -50, 50, 0],
                    rotate: [0, -15, 15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 16,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute top-[25%] right-[15%] text-7xl font-black text-emerald-400 opacity-12"
            >
                {'<>'}
            </motion.div>

            {/* Center-Right: Floating Function Declaration */}
            <motion.div
                animate={{
                    y: [0, -50, 30, 0],
                    x: [0, 60, -60, 0],
                    rotate: [0, 8, -8, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 11,
                    ease: "easeInOut",
                    delay: 2.5
                }}
                className="absolute top-[50%] right-[5%] text-lg font-mono text-violet-400 opacity-10 tracking-wider"
            >
                {'function() {}'}
            </motion.div>

            {/* Center-Left: Floating Variable Declaration */}
            <motion.div
                animate={{
                    y: [0, 60, -40, 0],
                    x: [0, -40, 40, 0],
                    rotate: [0, -12, 12, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 13,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute top-[55%] left-[8%] text-base font-mono text-pink-400 opacity-9 tracking-wider"
            >
                {'const x = 42'}
            </motion.div>

            {/* Bottom-Left: Floating Equals Sign */}
            <motion.div
                animate={{
                    y: [0, -40, 40, 0],
                    x: [0, 70, -70, 0],
                    rotate: [0, 20, -20, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 9,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-[15%] left-[10%] text-9xl font-black text-amber-300 opacity-8"
            >
                {'='}
            </motion.div>

            {/* Bottom-Right: Floating Semicolon */}
            <motion.div
                animate={{
                    y: [0, 50, -50, 0],
                    x: [0, -30, 30, 0],
                    rotate: [0, -20, 20, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[20%] right-[8%] text-8xl font-bold text-orange-400 opacity-10"
            >
                {';'}
            </motion.div>

            {/* Lower-Center: Floating Arrow Function */}
            <motion.div
                animate={{
                    y: [0, -60, 20, 0],
                    x: [0, 45, -45, 0],
                    rotate: [0, 10, -10, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 11,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[5%] left-[40%] text-base font-mono text-indigo-400 opacity-8 tracking-wider"
            >
                {'=>'}
            </motion.div>

            {/* Lower-Left: Floating Parentheses */}
            <motion.div
                animate={{
                    y: [0, -80, 40, 0],
                    x: [0, -60, 60, 0],
                    rotate: [0, -15, 15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute bottom-[25%] left-[3%] text-9xl font-black text-rose-400 opacity-9"
            >
                {'()'}
            </motion.div>

            {/* Top-Center: Floating Plus Sign */}
            <motion.div
                animate={{
                    y: [0, 70, -30, 0],
                    x: [0, 80, -80, 0],
                    rotate: [0, 25, -25, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute top-[8%] left-[50%] text-8xl font-black text-sky-400 opacity-11"
            >
                {'+'}
            </motion.div>

            {/* Upper-Right: Floating Asterisk */}
            <motion.div
                animate={{
                    y: [0, -50, 25, 0],
                    x: [0, -50, 50, 0],
                    rotate: [0, 30, -30, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut",
                    delay: 2.5
                }}
                className="absolute top-[35%] right-[3%] text-8xl font-black text-lime-400 opacity-10"
            >
                {'*'}
            </motion.div>

            {/* Middle-Bottom: Floating Percent */}
            <motion.div
                animate={{
                    y: [0, 60, -40, 0],
                    x: [0, 70, -70, 0],
                    rotate: [0, -25, 25, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 11,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[35%] left-[45%] text-lg font-mono text-fuchsia-400 opacity-9 tracking-wider"
            >
                {'% %'}
            </motion.div>

            {/* Top-Bottom Center: Floating Hash */}
            <motion.div
                animate={{
                    y: [0, -40, 35, 0],
                    x: [0, 55, -55, 0],
                    rotate: [0, 20, -20, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 13,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute top-[72%] right-[25%] text-7xl font-black text-yellow-400 opacity-11"
            >
                {'#'}
            </motion.div>

            {/* Lower-Right: Floating Import */}
            <motion.div
                animate={{
                    y: [0, 50, -50, 0],
                    x: [0, -45, 45, 0],
                    rotate: [0, -10, 10, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[8%] right-[25%] text-sm font-mono text-cyan-300 opacity-8 tracking-wider"
            >
                {'import'}
            </motion.div>

            {/* Middle-Center: Floating Class */}
            <motion.div
                animate={{
                    y: [0, -60, 30, 0],
                    x: [0, 65, -65, 0],
                    rotate: [0, 15, -15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute top-[45%] left-[3%] text-base font-mono text-blue-300 opacity-7 tracking-wider"
            >
                {'class'}
            </motion.div>

            {/* Center: Large Floating Code Tag */}
            <motion.div
                animate={{
                    y: [0, -80, 30, 0],
                    x: [0, -40, 40, 0],
                    rotate: [0, 18, -18, 0],
                    scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-cyan-300 opacity-15"
            >
                {'</>'}
            </motion.div>

            {/* Center-Upper: Floating Pipe Symbol */}
            <motion.div
                animate={{
                    y: [0, 60, -40, 0],
                    x: [0, 50, -50, 0],
                    rotate: [0, -25, 25, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute top-[35%] left-1/2 transform -translate-x-1/2 text-8xl font-black text-blue-300 opacity-12"
            >
                {'|'}
            </motion.div>

            {/* Center-Lower: Floating Dot */}
            <motion.div
                animate={{
                    y: [0, -50, 50, 0],
                    x: [0, -60, 60, 0],
                    rotate: [0, 360, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 16,
                    ease: "linear"
                }}
                className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-7xl font-black text-green-300 opacity-14"
            >
                {'•'}
            </motion.div>

            {/* Center-Left: Floating Curly Code Block */}
            <motion.div
                animate={{
                    y: [0, 50, -50, 0],
                    x: [0, 70, -70, 0],
                    rotate: [0, 20, -20, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 13,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute top-1/2 left-[30%] text-lg font-mono text-purple-300 opacity-9 tracking-wider"
            >
                {'{ }'}
            </motion.div>

            {/* Center-Right: Floating Ampersand */}
            <motion.div
                animate={{
                    y: [0, -60, 40, 0],
                    x: [0, -50, 50, 0],
                    rotate: [0, -30, 30, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-1/2 right-[30%] text-8xl font-black text-pink-300 opacity-11"
            >
                {'&'}
            </motion.div>

            {/* Center-Floating Colon */}
            <motion.div
                animate={{
                    y: [0, 70, -30, 0],
                    x: [0, 40, -40, 0],
                    rotate: [0, -15, 15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 2.5
                }}
                className="absolute top-[48%] left-1/2 transform -translate-x-1/2 text-8xl font-black text-yellow-300 opacity-10"
            >
                {':'}
            </motion.div>

            {/* Center-Floating Pipe-Ampersand */}
            <motion.div
                animate={{
                    y: [0, -70, 50, 0],
                    x: [0, 60, -60, 0],
                    rotate: [0, 25, -25, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 17,
                    ease: "easeInOut",
                    delay: 0.5
                }}
                className="absolute top-[52%] left-1/2 transform -translate-x-1/2 text-lg font-mono text-cyan-400 opacity-8 tracking-widest"
            >
                {'||}'}
            </motion.div>

            {/* Connected Network Lines */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
                className="absolute inset-0"
            >
                <svg viewBox="0 0 1000 800" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    {/* Diagonal lines representing data flow */}
                    <line x1="0" y1="0" x2="1000" y2="800" stroke="url(#networkGradient)" strokeWidth="2" />
                    <line x1="1000" y1="0" x2="0" y2="800" stroke="url(#networkGradient)" strokeWidth="2" />
                    <line x1="500" y1="0" x2="500" y2="800" stroke="url(#networkGradient)" strokeWidth="1.5" opacity="0.6" />
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="url(#networkGradient)" strokeWidth="1.5" opacity="0.6" />
                </svg>
            </motion.div>

            {/* Soft Gradient Accent 1 - Teal (Bottom-Left) */}
            <motion.div
                animate={{
                    x: [0, 120, -60, 0],
                    y: [0, -100, 50, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-teal-500 opacity-10 rounded-full blur-[150px]"
            />

            {/* Soft Gradient Accent 2 - Navy (Top-Right) */}
            <motion.div
                animate={{
                    x: [0, -150, 80, 0],
                    y: [0, 120, -60, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 28,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-600 opacity-10 rounded-full blur-[150px]"
            />

            {/* Soft Gradient Accent 3 - Charcoal (Center) */}
            <motion.div
                animate={{
                    x: [0, 100, -70, 0],
                    y: [0, 70, -100, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-cyan-600 opacity-8 rounded-full blur-[140px] transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Soft Gradient Accent 4 - Purple (Bottom-Right) */}
            <motion.div
                animate={{
                    x: [0, -100, 60, 0],
                    y: [0, -80, 80, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 26,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-purple-600 opacity-9 rounded-full blur-[150px]"
            />

            {/* Soft Gradient Accent 5 - Emerald (Top-Left) */}
            <motion.div
                animate={{
                    x: [0, 80, -80, 0],
                    y: [0, 100, -50, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 27,
                    ease: "easeInOut",
                    delay: 2.5
                }}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-600 opacity-8 rounded-full blur-[140px]"
            />

            {/* Animated Grid Pattern - Subtle */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.08, 0.03]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(
                        0deg,
                        transparent 24%,
                        rgba(14, 165, 233, 0.05) 25%,
                        rgba(14, 165, 233, 0.05) 26%,
                        transparent 27%,
                        transparent 74%,
                        rgba(14, 165, 233, 0.05) 75%,
                        rgba(14, 165, 233, 0.05) 76%,
                        transparent 77%,
                        transparent
                    ),
                    linear-gradient(
                        90deg,
                        transparent 24%,
                        rgba(6, 182, 212, 0.05) 25%,
                        rgba(6, 182, 212, 0.05) 26%,
                        transparent 27%,
                        transparent 74%,
                        rgba(6, 182, 212, 0.05) 75%,
                        rgba(6, 182, 212, 0.05) 76%,
                        transparent 77%,
                        transparent
                    )`,
                    backgroundSize: '50px 50px'
                }}
            />
        </div>
    );
}
