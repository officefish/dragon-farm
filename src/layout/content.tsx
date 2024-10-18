import GameStats from "@/components/game.stats";
import { FC, PropsWithChildren } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
    return  (<>
      <div className="fixed w-screen h-screen maincraft-bg">
        <div className="w-full h-full bg-gradient"></div>
      </div>
      <main className='absolute'>
        <GameStats />
        {children}
      </main>
    </>)
  
}
export default Content