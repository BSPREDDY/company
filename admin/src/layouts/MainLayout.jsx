import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Sidebar - 30% width */}
            <div className="w-[20%] border-r border-blue-500/20 overflow-y-auto">
                <Sidebar />
            </div>

            {/* Main Content Area - 70% width */}
            <main className="w-[80%] overflow-auto ml-2">
                <div className="min-h-screen w-full px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
