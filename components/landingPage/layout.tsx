import Body from "./Body";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children } : { children: React.ReactNode}){
    return (
        <div>
            <NavBar/>
            {/* <main> {children} </main> */}
            <main>
                <Body/>
            </main>
            <Footer/>
        </div>

    );
}