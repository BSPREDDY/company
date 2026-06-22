import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-64 overflow-auto">
                <div className="pt-16 md:pt-0 p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
