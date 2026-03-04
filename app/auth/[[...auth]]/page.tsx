// Server Component — exports metadata, delegates rendering to client component
import { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Account — Lanark Fine Tiles & Stone",
  description:
    "Sign in, create an account, verify your email, or reset your password.",
};

interface AuthPageProps {
  searchParams?: { view?: string };
}

export default function AuthPage({ searchParams }: AuthPageProps) {
  return <AuthClient initialView={searchParams?.view} />;
}