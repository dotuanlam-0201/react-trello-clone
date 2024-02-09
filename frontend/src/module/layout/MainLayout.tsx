import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGetDataFromLocal } from "../../hook/useGetDataFromLocal"
import Header from "./Header"

const MainLayout = ({ children }: { children: ReactNode }) => {
    const token = useGetDataFromLocal('TOKEN')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate({ pathname: '/login' })
        }
    }, [])

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
