import { FC } from "react"

const GameStats:FC = () => {
    return (
        <div className="fixed w-screen p-4 flex flex-row z-10">
          <div className="w-[24%] flex flex-row gap-1">
            <img className="w-8 h-8" src="/stats/coin.png" alt="coin" />
            <div className="flex flex-col items-start justify-evenly stats-item pl-1">
              <div className="stats-value">721K</div>
              <div className="stats-type uppercase">coin</div>
            </div>
          </div>
          <div className="stats-spacer mx-1 my-2 opacity-60"></div>
          <div className="w-[31%] flex flex-row gap-2 items-center">
            <img className="w-8 h-8" src="/stats/usdt.png" alt="coin" />
            <div className="flex flex-col items-start justify-evenly stats-item pl-1">
              <div className="stats-value">10.03</div>
              <div className="stats-type uppercase">usdt</div>
            </div>
            <img className="w-5 h-5" src="/stats/wallet.png" alt="plus usdt" />
          </div>
          <div className="stats-spacer mx-1 my-2 opacity-60"></div>
          <div className="w-[31%] flex flex-row gap-2 items-center">
            <img className="w-8 h-8" src="/stats/farm.png" alt="coin" />
            <div className="flex flex-col items-start justify-evenly stats-item pl-1">
              <div className="stats-value">1000</div>
              <div className="stats-type uppercase">open</div>
            </div>
            <img className="w-5 h-5" src="/stats/plus.png" alt="plus coin" />
          </div>
          <img className="w-8 h-8" src="/stats/menu.png" alt="plus coin" />
        </div>        
    )
}

export default GameStats