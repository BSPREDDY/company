import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Sidebar - Fixed positioning */}
            <Sidebar />

            {/* Main Content Area - Proper offset for sidebar */}
            <main className="flex-1 overflow-auto md:ml-64 w-full">
                <div className="min-h-screen w-full pt-16 md:pt-0 px-4 md:px-8 py-6 md:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
