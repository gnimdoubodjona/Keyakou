import Layout from "@/components/layout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // 'Layout' (components/layout.tsx) contient NavBar / Footer pour le site public
  return <Layout>{children}</Layout>;
}