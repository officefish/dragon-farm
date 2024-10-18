import { FC, PropsWithChildren } from "react";

const Footer: FC <PropsWithChildren> = ({ children }) => {
    return <footer className="
    w-full 
    absolute bottom-0">{children}</footer>
}
export default Footer