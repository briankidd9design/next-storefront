import { Sidebar } from "@/app/(auth)/sidebar";
import { auth } from "@clerk/nextjs/server";

// In this context, React is globally available
type Props = {
  // it will either be a component or an element being displayed
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  auth().protect();
  return (
    // display flex, min-height to screen height or 100vh and flex-direction:column
    // <div className="flex min-h-screen flex-col">
    // the svh accounts for the address bar on mobile devices

    <div className="flex min-h-svh">
      {/* <h1>auth layout</h1> */}
      {/* max-lg: hidden: when the resolution is less than 1024 the sidebar should disappear */}
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
        <Sidebar />
      </div>
      {/* padding left */}
      {/* only add the padding when a sidebar is present. So in this case when the screen resolution is less than 1024px, there will be no left padding.  */}
      <main className="lg:pl-64 flex w-full pb-2 lg:pr-4 lg:pt-2">
        <div className="bg-white grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 ">
          {children}
        </div>
      </main>
    </div>
  );
}
