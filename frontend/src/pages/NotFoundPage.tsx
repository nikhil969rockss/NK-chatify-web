import { ArrowLeft, Home, Search } from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATOR - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 rounded-full opacity-20 blur-[50px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 rounded-full opacity-20 blur-[50px]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">
        {/* 404 HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              {/* ANIMATED BACKGROUND */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-2xl blur-xl" />

              {/* MAIN 404 TEXT */}
              <div className="relative px-8 py-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                <p className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  404
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-400 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-slate-500">Let's get you back on track</p>
        </div>

        {/* SEARCH SUGGESTION */}
        <div className="mb-8 p-4 border border-slate-700/50 bg-slate-800/50 rounded-lg backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Search className="size-5 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">
                Try these instead:
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Return to the homepage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-slate-100 transition-all duration-200 font-medium group"
          >
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-200 font-medium group shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
          >
            <Home className="size-5 group-hover:scale-110 transition-transform" />
            Home
          </button>
        </div>

        {/* DECORATIVE ELEMENTS */}
        <div className="mt-12 space-y-4">
          {/* TOP ACCENT LINE */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* FOOTER MESSAGE */}
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              Error Code: 404
            </p>
          </div>

          {/* BOTTOM ACCENT LINE */}
          <div className="h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </div>
      </div>

      {/* FLOATING PARTICLES (DECORATIVE) */}
      <div className="absolute top-20 left-10 size-2 bg-cyan-400/30 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-40 right-20 size-3 bg-pink-400/20 rounded-full blur-sm animate-pulse animation-delay-1000" />
      <div className="absolute bottom-32 left-1/4 size-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse animation-delay-500" />
    </div>
  );
};

export default NotFoundPage;
