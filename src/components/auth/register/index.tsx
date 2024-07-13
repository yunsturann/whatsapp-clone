// ** React Imports
import { ChangeEvent, FormEvent, useState } from "react";

// ** Utils
import { onInputUserName } from "../../../lib/utils";

// Configs
import { auth, db } from "../../../config/firebase";
import uploadStorage from "../../../lib/firebase/uploadStorage";

// ** Third Party Imports
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

interface RegisterProps {
  setIsOnLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAvatar: {
  file: File | null;
  url: string;
} = {
  file: null,
  url: "",
};

const Register = (props: RegisterProps) => {
  const { setIsOnLogin } = props;

  const [avatar, setAvatar] = useState(initialAvatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (!e.target.files[0].type.includes("image"))
      return toast.error("File is not an image");

    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, email, password, confirmPassword } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      // validate unique username
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return toast.error("Username already exists");
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );

      let imgUrl = "";

      if (avatar.file) {
        imgUrl = await uploadStorage(avatar.file, "avatars");
      }

      // setDocs are indepentent of each other so can be done in parallel
      await Promise.all([
        await setDoc(doc(db, "users", response.user.uid), {
          id: response.user.uid,
          username,
          email,
          avatar: imgUrl,
          blocked: [],
        }),
        await setDoc(doc(db, "chatlist", response.user.uid), {
          chats: [],
        }),
      ]);

      toast.success("User registered successfully");

      // Reset form and avatar
      (e.target as HTMLFormElement).reset();

      setAvatar(initialAvatar);

      setIsOnLogin(true);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        {/* avatar */}
        <label htmlFor="avatar_file" className="upload_avatar">
          <img src={avatar.url || "/images/avatar.png"} alt="avatar" />
          Upload an avatar
        </label>
        <input
          type="file"
          id="avatar_file"
          style={{ display: "none" }}
          onChange={handleAvatar}
          accept="image/*"
        />

        {/* username */}
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onInput={onInputUserName}
        />

        {/* email */}
        <input type="email" placeholder="Email" name="email" required />

        {/* password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        {/* confirm */}
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          required
        />

        {/* Submit */}
        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
