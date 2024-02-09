import { ReactNode } from "react"
import Header from "./Header"

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main id="dashboard">
                {children}
            </main>
        </>

    )
}

export default MainLayout
