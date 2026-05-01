import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/AnimatedBorderContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Link } from "react-router";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signupUser, isSigningUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signupUser(formData);
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
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new Account</p>
                </div>

                {/* FORM  */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULLNAME */}
                  <div>
                    <label htmlFor="fullName" className="auth-input-label">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        name="fullName"
                        id="fullName"
                        type="text"
                        required
                        className="input"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="animate-spin size-5" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/*  */}
                <div className="mt-6 text-center">
                  <Link to={"/login"} className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION-RIGHT-SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/images/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
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

export default SignupPage;
