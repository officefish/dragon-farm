

import { useChestsStore } from "@/providers/chests";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect,  } from "react";

const Farm: FC = () => {

  const { setPage } = useSiteStore();  
  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

  const { tape } = useChestsStore();

    return (
    <div className='w-full'>

    <div className='shop-dialog-title mt-8 uppercase px-2'>find a Great Prize!</div>
    <div className='mt-3 shop-dialog-description px-2'>
      9 Types of Rewards Available
    </div>

    <div className="w-full mt-8 px-2">
      <div className="grid grid-rows-5 grid-cols-5 gap-1">
          
          {Array.from({ length: tape?.chests.length || 0 }).map((_, index) => (
            <div key={index} className="col-span-1 flex h-20 items-center justify-center">
              <img className="w-12 h-12" src="farm/chest.png" alt="" />
            </div>
          ))}
        
        </div>
      </div>
      <div className="w-full absolute bottom-20 px-2">
        <img className="w-full" src="farm/row.png" alt="" />
      </div>
    </div>
   )
}
export default Farm