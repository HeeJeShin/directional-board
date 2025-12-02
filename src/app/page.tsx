import Image from "next/image";
import {Box} from "@mui/material";
import {LoginForm} from "@/components/organisms/LoginForm";

export default function Home() {
  return (
      <Box className="min-h-screen flex items-center justify-center p-4">
          <LoginForm />
        </Box>
  );
}
