import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    titlePage: string;
}

const LayoutMain: React.FC<ContainerProps> = ({ children, titlePage }) => {
    return (
        <>
            {/* <NavBar titlePage={ titlePage } /> */}
                <main> {/* style={{backgroundColor:"#f0f6fb", minHeight: "calc(100vh - 80px)"}} */}
                    {children}
                </main>
            {/* <Footer/> */}
        </>
    );
}

export default LayoutMain;