import GameStats from "@/components/game.stats";
import { FC, PropsWithChildren } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
    return  (<>
      <GameStats />
      <main className='pt-8'>
        {children}
      </main>
    </>)
  
}
export default Content