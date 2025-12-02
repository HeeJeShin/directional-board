import Image from "next/image";
import {Box} from "@mui/material";
import {LoginForm} from "@/components/organisms/LoginForm";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-start pt-32 min-h-screen">
            <LoginForm />
      </main>
  );
}
