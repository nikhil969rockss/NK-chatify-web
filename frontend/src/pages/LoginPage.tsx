import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/AnimatedBorderContainer";
import {
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Link } from "react-router";

const LoginPage = () => {
  const { isLoggingIn, loginUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px] ">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT-SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-">
                  <MessageCircleIcon className="size-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back 👋
                  </h2>
                  <p className="text-slate-400">
                    Login to access to your account
                  </p>
                </div>

                {/* FORM  */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label htmlFor="email" className="auth-input-label">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        name="email"
                        id="email"
                        type="email"
                        required
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jondoe@example.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label htmlFor="password" className="auth-input-label">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="input !pr-10"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      {!showPassword ? (
                        <EyeIcon
                          onClick={() => setShowPassword(!showPassword)}
                          className="size-5 absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
                        />
                      ) : (
                        <EyeOffIcon
                          onClick={() => setShowPassword(!showPassword)}
                          className="size-5 absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
                        />
                      )}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="animate-spin size-5" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/*  */}
                <div className="mt-6 text-center">
                  <Link to={"/signup"} className="auth-link">
                    Don't have an account? Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION-RIGHT-SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/images/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect anytimg, anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;
