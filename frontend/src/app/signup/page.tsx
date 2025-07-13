import React from "react";
import { SignupForm } from "../../components/signup-form";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
};
export default SignupPage;
