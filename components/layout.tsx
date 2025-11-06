// import Footer from "./landingPage/Footer";
// import NavBar from "./landingPage/NavBar";

import Layout from "./landingPage/layout";


// export default function Layout({ children } : { children: React.ReactNode}){
//     return (
//         <div>
//             <NavBar/>
//             <main> {children} </main>
//             <Footer/>
//         </div>

//     );
// }

interface AppLayoutProps {
  children: React.ReactNode;
  page?: "landing" | "client" | "admin"; // optionnel si tu veux gérer plusieurs layouts plus tard
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, page = "landing" }) => {
  switch (page) {
    case "landing":
      return <Layout>{children}</Layout>;
    default:
      return <div>{children}</div>;
  }
};

export default AppLayout;