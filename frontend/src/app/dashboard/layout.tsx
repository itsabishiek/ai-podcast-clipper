import { redirect } from "next/navigation";
import React from "react";
import NavHeader from "~/components/nav-header";
import { Toaster } from "~/components/ui/sonner";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      email: true,
      credits: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader email={user.email} credits={user.credits} />
      <main className="container mx-auto flex-1 py-6">{children}</main>
      <Toaster />
    </div>
  );
};
export default DashboardLayout;
