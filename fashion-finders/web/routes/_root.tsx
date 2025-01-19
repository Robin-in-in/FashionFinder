import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Links, LiveReload, Outlet, useOutletContext } from "@remix-run/react";
import { Toaster } from "@/components/ui/toaster";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session } = context;

  // Redirect already logged-in users to the app experience
  if (session?.get("user")) {
    return redirect("/signed-in");
  }

  return json({});
};

export default function Root() {
  const context = useOutletContext();

  return (
    <main
      className="w-screen h-screen grid place-items-center"
      style={{
        backgroundColor: "#fff9c4",
        fontFamily: '"Book Antiqua", "Palatino Linotype", Palatino, serif',
      }}
    >
      {/* Render child routes */}
      <Outlet context={context} />

      {/* Global toast notifications */}
      <Toaster />

      {/* Development live reload */}
      <LiveReload />
    </main>
  );
}
