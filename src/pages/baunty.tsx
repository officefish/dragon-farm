

import BauntyItem from "@/components/farm/baunty.item";
import { useGetChestBaunty } from "@/hooks/api/useGetChestBaunty";
import useUpdateChests from "@/hooks/api/useUpdateChests";
import { useChestsStore } from "@/providers/chests";
import { apiFetch } from "@/services/api";
//import { apiFetch } from "@/services/api";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

function getItemVariant(type: string) {
  switch (type) {
    case 'USDT': return 'farm/big-usdt.png'
    case 'COINS': return 'farm/big-coin.png'
    case 'KEYS': return 'farm/big-key.png'
    default:
      return '/farm/big-keys.png'
  }
}

const Baunty: FC = () => {

  const { items, baunty } = useChestsStore();

  const navigate = useNavigate()

  const onSuccessUpdateChests = () => {
    navigate('/')
  }

  const { updateChests } = useUpdateChests(apiFetch, onSuccessUpdateChests)

  const onSuccessBaunty = () => {
    console.log('onSuccessBaunty')
    updateChests()
  }

  const {getChestBaunty} = useGetChestBaunty(apiFetch, onSuccessBaunty)

  const handleClaimClick = () => {  
    //console.log('handleClaimClick')
    getChestBaunty(baunty?.id || '')
  }

    return (
    <div className='w-full'>

      <div className='shop-dialog-title mt-8 uppercase px-2'>find a Great Prize!</div>
      <div className='mt-3 shop-dialog-description px-2'>
        9 Types of Rewards Available
      </div>

      <div className="w-full mt-6 px-2">
        <div className="grid grid-rows-4 grid-cols-4 gap-3 text-white">

            {items && items.map((item, index) => (
              <BauntyItem key={index}
              data={item}
              selected={baunty?.chestId === item?.chestId}
              />
            ))}
        </div>
      </div>

      <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
        <div className="h-[25%] bg-black opacity-50 blur-xl"></div>
        <div className="task-modal w-full h-[75%]">
          <div className='w-full flex flex-col justify-center items-center pt-8'>
            <div className='flex items-center justify-center w-full p-4'>
              <img className='w-[200px] h-[200px] rounded-md' src={getItemVariant(baunty?.variant || 'KEYS')} alt="" />
            </div>
            <div className='shop-dialog-description mt-3 px-6'>
              {baunty?.value}
            </div>
            <div className='shop-dialog-title mt-4 uppercase'>{baunty?.variant}</div>
            </div>
          </div>
          <div className='absolute bottom-4 w-screen'>
            <div className="h-20 function-btn btn-no-body flex flex-row gap-1 items-center justify-center mx-2"
            onClick={handleClaimClick}
            >
            <div className="shop-dialog-title flex flex-row items-center justify-center gap-2">
              CLAIM!
            </div>
         </div>
      </div>
        </div>
    </div>
   )
}
export default Baunty
