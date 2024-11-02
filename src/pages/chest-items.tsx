
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

//import { useNavigate } from "react-router-dom";


const ChestItems: FC = () => {

  const { setPage } = useSiteStore();  
  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);


//   const navigate = useNavigate()

//   const handleGetBaunty = () => {
//     navigate('/baunty')
//   }

    return (
    <div className='w-full'>

        <div className="fixed top-0 w-screen h-screen overflow-hidden z-50">
            
            <div className="task-modal w-full h-full">
                <div className='shop-dialog-title pt-20 uppercase px-2'>9 Types of Rewards Available!</div>
                <div className='
                pt-3 px-2 
                shop-dialog-description 
                flex flex-row 
                items-center justify-center gap-2
                ' >
                  Unlock amazing rewards: from coins and USDT to valuable keys for extra reopens. You can open new box every 4 hours!  
                </div>

                <div className="pt-6 w-full grid grid-cols-3 grid-rows-3 gap-1 px-2">
                    {/* Epic */}
                    <ChestItem 
                    type="coins"
                    rarity="unique"
                    percents={5.0}
                    min={400}
                    max={600}
                    />
                    <ChestItem 
                    type="USDT"
                    rarity="unique"
                    percents={5.0}
                    min={1.0}
                    max={2.0}
                    />
                    <ChestItem 
                    type="keys"
                    rarity="unique"
                    percents={5.0}
                    min={3}
                    max={5}
                    />
                    {/* Rare */}
                    <ChestItem 
                    type="coins"
                    rarity="rare"
                    percents={25.0}
                    min={200}
                    max={300}
                    />
                    <ChestItem 
                    type="USDT"
                    rarity="rare"
                    percents={25.0}
                    min={0.5}
                    max={1.0}
                    />
                    <ChestItem 
                    type="keys"
                    rarity="rare"
                    percents={25.0}
                    min={2}
                    max={4}
                    />
                    {/* Common */}
                    <ChestItem 
                    type="coins"
                    rarity="basic"
                    percents={70.0}
                    min={100}
                    max={200}
                    />
                    <ChestItem 
                    type="USDT"
                    rarity="basic"
                    percents={70.0}
                    min={0.1}
                    max={0.3}
                    />
                    <ChestItem 
                    type="keys"
                    rarity="basic"
                    percents={70.0}
                    min={1}
                    max={2}
                    />
                </div>

                <div className="absolute top-2 right-2 btn-no-body">
                    <img className="w-8 h-8" src="/farm/close.png" alt="close" onClick={() => window.history.back()} />
                </div>
            </div>
        </div>
    </div>   
   )
}
export default ChestItems

type ChestItemType = 'coins' | 'USDT' | 'keys'
type ChestItemRarity = 'unique' | 'rare' | 'basic'

interface IChestItem {
  type: ChestItemType
  rarity: ChestItemRarity
  percents: number
  min: number
  max: number
}

function getTypeImgSrc(type: ChestItemType) {
    switch (type) {
        case 'coins': return 'farm/big-coin.png';
        case 'USDT': return 'farm/big-usdt.png';
        case 'keys': return 'farm/big-key.png';
        default: return 'keys.png';
    }
}

const ChestItem: FC<IChestItem> = (props) => {
  const { type, rarity, percents, min, max } = props



  return (
    <div className="w-full h-full 
    flex flex-col items-center justify-center">
        <div className="chest-item-info">
            <img className="w-full h-full p-2" src={getTypeImgSrc(type)} alt="" />
        </div>
        {rarity === 'unique' && (
            <div className="
            w-full
            chest-item-info-rarity rarity-unique
            flex flex-row items-center justify-between p-1
            ">
                <div>{rarity.toUpperCase()}</div>
                <div>{percents}%</div>
            </div>
        )}
         {rarity === 'rare' && (
            <div className="
            w-full
            chest-item-info-rarity rarity-rare
            flex flex-row items-center justify-between p-1
            ">
                <div>{rarity.toUpperCase()}</div>
                <div>{percents}%</div>
            </div>
        )}
         {rarity === "basic" && (
            <div className="
            w-full
            chest-item-info-rarity rarity-common
            flex flex-row items-center justify-between p-1
            ">
                <div>{rarity.toUpperCase()}</div>
                <div>{percents}%</div>
            </div>
        )}
        <div className="chest-item-min-max w-full items-start p-1">{min}-{max} {type}</div>
        {/* <div>
            <span>{percents}%</span>
            <span>{min}-{max}</span>
        </div> */}
    </div>
  )
}
      