import { FC, PropsWithChildren } from "react";

const Screen: FC <PropsWithChildren> = ({ children }) => {
    return  <div className="screen">    
        {children}
  </div>
}
export default Screen