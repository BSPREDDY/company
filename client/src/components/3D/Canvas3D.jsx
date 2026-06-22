import React, { Suspense } from 'react';

// Fallback component while 3D is loading
const Loading3D = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-400 text-sm">Loading 3D Scene...</p>
        </div>
    </div>
);

// Error boundary for 3D components
class Canvas3DErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[v0] 3D Canvas Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-400 text-sm">3D scene unavailable</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Wrapper for 3D backgrounds
export const Canvas3DWrapper = ({
    children,
    className = '',
    fallback = true,
    timeout = 3000
}) => {
    return (
        <Canvas3DErrorBoundary>
            <Suspense fallback={fallback ? <Loading3D /> : null}>
                <div className={`relative w-full h-full overflow-hidden ${className}`}>
                    {children}
                </div>
            </Suspense>
        </Canvas3DErrorBoundary>
    );
};

export default Canvas3DWrapper;
