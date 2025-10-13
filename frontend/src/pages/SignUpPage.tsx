import useAuthStore from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImmagePattern";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  User,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error("Il nome è obbligatorio");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("L'email è obbligatoria");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("L'email non è valida ");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("La password è obbligatoria");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      signup(formData);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Crea un account</h1>
              <p className="text-base-content/60">Tranquillo, è gratis !</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">
                  Nome completo
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 z-10 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="Mario Rossi"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="te@esempio.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium mb-1">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={"input input-bordered w-full pl-10"}
                  placeholder="*********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 z-10  duration-200 linear transform group-hover:scale-120" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 z-10  duration-200 ease-in transform group-hover:scale-120" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Loading...
                </>
              ) : (
                "Crea l'account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Hai già un account?{" "}
              <Link to="/login" className="link link-primary">
                Accedi
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern title="Unisciti alla community!" />
    </div>
  );
};
