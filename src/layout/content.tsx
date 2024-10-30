import GameStats from "@/components/game.stats";
import { useBuyKeys } from "@/hooks/api/useBuyKeys";
import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { useSiteStore } from "@/providers/store";
//import { useSimpleBuyKeys } from "@/hooks/api/useSimpleBuyKeys";
import { apiFetch } from "@/services/api";
import { FC, PropsWithChildren } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
  
    const { keyShopOpen, setKeyShopOpen } = useSiteStore()
    
    const onSimpleBuyKeysSuccess = () => {
      setKeyShopOpen(false)
    }
    const { simpleBuyKeys } = useSimpleBuyKeys(apiFetch, onSimpleBuyKeysSuccess)

    const onBuyKeysSuccess = (invoiceLink: string, numKeys: number) => {
      //console.log('On buy keys for stars success')
      //console.log(invoiceLink)
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

    const onShopItemSelect = (value: number) => {    
      buyKeys(value)
    }
    
    return  (<>
      <GameStats onBuyKeys={handleBuyKeys} />
      <main className='pt-8'>
        {children}
        {/* Shop component */}
        {keyShopOpen && (
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
        )}
      </main>
    </>)
  
}
export default Content

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