// ** React Imports
import { FormEvent, useState } from "react";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Firebase Imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as {
      email: string;
      password: string;
    };

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Logged in successfully");

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        {/* email */}
        <input type="email" placeholder="Email" name="email" required />

        {/* password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        {/* Submit */}
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
