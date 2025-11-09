// app/authentication/layout.tsx
export const metadata = {
  title: "Connexion / Inscription - Keyakou",
  description: "Page de connexion et d'inscription",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="">
        {children}
      </div>
    
  );
}
