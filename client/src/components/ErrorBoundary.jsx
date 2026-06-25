import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[v0] Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#0f172a',
                    color: '#e2e8f0',
                    flexDirection: 'column',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#60a5fa' }}>
                        Oops! Something went wrong
                    </h1>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px' }}>
                        We encountered an error while loading the page. Please try refreshing or contact support if the issue persists.
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.reload();
                        }}
                        style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
