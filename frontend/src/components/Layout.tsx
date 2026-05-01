import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATOR- GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] " />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 rounded-full opacity-20 blur-[50px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 rounded-full opacity-20 blur-[50px]" />

      <ToastContainer autoClose={2000} theme="dark" position="top-right" />
      {children}
    </div>
  );
};

export default Layout;
