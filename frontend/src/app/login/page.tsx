import { redirect } from "next/navigation";
import React from "react";
import { LoginForm } from "~/components/login-form";
import { auth } from "~/server/auth";

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
