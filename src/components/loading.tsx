/* HTML: <div class="loader"></div> */
//import { useLoaderStore } from "@/providers/store"
import { FC, PropsWithChildren } from "react"


const Loading:FC = () => {
    
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
        
    )
}

interface ILoadingProps {
    isLoading: boolean
}

export default Loading

export const WithLoader:FC<PropsWithChildren<ILoadingProps>> = (props) => {
    
    const { isLoading, children } = props

    return isLoading
        ? <div className="w-screen h-screen">
            
           <div className="w-full h-full flex items-center justify-center">
               <div className="loader"></div>
           </div>

        </div>
        : <>{children}</>
}

