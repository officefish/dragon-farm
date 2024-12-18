import GameStats from "@/components/game.stats";
import { useBuyKeys } from "@/hooks/api/useBuyKeys";
import { useNewWithdrawProposal } from "@/hooks/api/useNewWithdrawProposal";
import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
//import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { apiFetch } from "@/services/api";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
  
    const { 
      keyShopOpen, 
      setKeyShopOpen,
      withdrawOpen,
      setWithdrawOpen
    } = useSiteStore()
    
    const onSimpleBuyKeysSuccess = () => {
      setKeyShopOpen(false)
    }
    const { simpleBuyKeys } = useSimpleBuyKeys(apiFetch, onSimpleBuyKeysSuccess)

    const onBuyKeysSuccess = (invoiceLink: string, numKeys: number) => {
      window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
        if (status === "paid") {
          simpleBuyKeys(numKeys)
        }
      });
    } 

    const { buyKeys } = useBuyKeys(apiFetch, onBuyKeysSuccess) 

    const handleBuyKeys = () => {
      setKeyShopOpen(true)
    }

    const handleWithdraw = () => {
      setWithdrawOpen(true)
    }

    const onShopItemSelect = (value: number) => {    
      buyKeys(value)
    }
    
    return  (<>
      <GameStats onBuyKeys={handleBuyKeys} onWithdraw={handleWithdraw} />
      <main className='pt-8'>
        {children}
        {/* Shop component */}
        {keyShopOpen && (
         <ForStarsShop onShopItemSelect={onShopItemSelect} setKeyShopOpen={setKeyShopOpen} />
        )}
        {withdrawOpen && (
          <Withdraw setWithdrawOpen={setWithdrawOpen} />
        )}
      </main>
    </>)
  
}
export default Content

interface IWithdrawProps {
  setWithdrawOpen: (isOpen: boolean) => void
}

const Withdraw:FC<IWithdrawProps> = (props) => {
  const { setWithdrawOpen } = props

  const { player } = useUserStore()

  const [usdt, setUsdt] = useState(0)

  useEffect(() => {
    setUsdt((player?.usdt || 0) / 100)
  }, [player])

  const {newWithdrawProposal} = useNewWithdrawProposal(apiFetch)

  const handleWithdraw = () => {
    newWithdrawProposal(+proposal)
  }

  const [proposal, setProposal] = useState("")
  
  return (
    <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
        
    <div className="w-full h-full bg-black opacity-70"></div>
    <div className="absolute bottom-0 w-full h-[307px] task-modal">

      <div className="absolute top-0 right-0 btn-no-body pr-4 pt-2" onClick={() => setWithdrawOpen(false)}>
        <img src="/stars-shop/close.png" alt="" />
      </div>

        <div className='shop-dialog-title mt-16 uppercase px-2'>WITHDRAW</div>
        <div className='shop-dialog-description mt-3 px-2'>Withdrawal is available from <span className="text-green-300">10 USDT</span></div>
    
        <div className="w-full mt-4 flex flex-row justify-between items-center px-3">
          <div className="withdraw-label">You have:</div>
          <div className="flex flex-row items-center justify-center">
            <img className="w-8 h-8" src="/stats/usdt.png" alt="" />
            <div className="flex flex-col items-center justify-center">
              <div className="withdraw-amount">{usdt.toFixed(2)}</div>
              <div className="withdraw-currency">USDT</div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <input className="input-primary input input-xl mt-4 w-[90%]" type="text" 
          onChange={(e) => setProposal(e.target.value) }
          value={proposal}
          />
        </div>

        {/* {usdt < 100 
          ? (
          <div className="w-full flex items-center justify-center mt-4">
            <div className="function-btn disabled opacity-60 w-full">WITHDRAW</div>
          </div>)
          : (
            <div className="w-full flex items-center justify-center mt-4" >
              <div className="btn-no-body function-btn w-full">WITHDRAW</div>
            </div>)
        } */}

          <div className="w-full flex items-center justify-center mt-4" onClick={handleWithdraw}>
            <div className="function-btn btn-no-body w-full">WITHDRAW</div>
          </div>

        

    </div>
  </div>
  )
}

interface IForStarsShopProps {
  onShopItemSelect: (value: number) => void
  setKeyShopOpen: (isOpen: boolean) => void
}

const ForStarsShop:FC<IForStarsShopProps> = (props) => {
  const { onShopItemSelect, setKeyShopOpen } = props
  return (
    <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
        
    <div className="w-full h-full bg-black opacity-70"></div>
    <div className="absolute bottom-0 w-full h-[307px] task-modal">

      <div className="absolute top-0 right-0 btn-no-body pr-4 pt-2" onClick={() => setKeyShopOpen(false)}>
        <img src="/stars-shop/close.png" alt="" />
      </div>

      <div className='shop-dialog-title mt-16 uppercase px-2'>SHOP</div>
      <div className='shop-dialog-description mt-3 px-2'>Buy more keys for better prizes.</div>

      <div className="w-full grid grid-cols-2 grid-rows-2 px-4 gap-2 text-white">
        <StarShopItem value={10} onSelect={onShopItemSelect} />
        <StarShopItem value={50} onSelect={onShopItemSelect} />
        <StarShopItem value={100} onSelect={onShopItemSelect} />
        <StarShopItem value={200} onSelect={onShopItemSelect} />
      </div>
    </div>

  </div>
  )
}

interface IStarShopItem {
  value: number
  onSelect: (value: number) => void
}
const StarShopItem: FC<IStarShopItem> = (props) => {
  
  const { value, onSelect } = props
  
  return (
    <div className="
    w-full task-item 
    h-16 mt-4
    flex flex-row gap-2
    btn-no-body
    " onClick={() =>onSelect(value)}>
      <div><img className="w-[62px] rounded-md" src="/stars-shop/key-icon.png" alt="" /></div>
      <div className="flex flex-col items-center justify-between h-full py-2">
        <div className="flex flex-row gap-2">
          <img src="/stars-shop/star-icon.png" alt="star-icon" />
          {value}
        </div>
        <img src="/stars-shop/buy_with_chevron.png" alt="buy-with-chevron" />
      </div>
    </div>
  )
}