import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            <Sidebar />

            {/* Main Content Area - Flexible */}
            <main className="flex-1 overflow-auto">
                <div className="min-h-screen w-full">
                    <div className="px-4 py-20 md:px-8 md:py-8 lg:px-12 lg:py-10 h-full">
                        <div className="w-full h-full">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
