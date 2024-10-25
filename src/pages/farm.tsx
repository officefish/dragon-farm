

import { useChestsStore } from "@/providers/chests";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { IChest } from "@/types/chest";
import { FC, useEffect, useState,  } from "react";

const Farm: FC = () => {

  const { setPage } = useSiteStore();  
  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

  const [globalBlocked, setGlobalBlocked] = useState(true);

  const { tape } = useChestsStore();

    return (
    <div className='w-full'>

    <div className='shop-dialog-title mt-8 uppercase px-2'>find a Great Prize!</div>
    <div className='mt-3 shop-dialog-description px-2'>
      9 Types of Rewards Available
    </div>

    <div className="w-full mt-6 px-2">
      <div className="grid grid-rows-4 grid-cols-4 gap-3">
          
          {tape &&tape.chests.map((chest, index) => (
            <Chest key={index} chest={chest} globalBlocked={globalBlocked} />     
          ))}
        
        </div>
      </div>
      <div className="w-full absolute bottom-20">
        <div className="h-20 task-item flex flex-row gap-1 items-center justify-between">
          <div className="flex flex-col pl-2 pt-2 w-56">
            
            <div className="flex flex-row items-center justify-between gap-1 h-6 w-full">
              <div className="flex flex-row items-center justify-start gap-1">
                <img className="w-6 h-6" src="farm/key.png" alt="key" />
                <div className="farm-key-value">{28}</div>
              </div>
              <div className="farm-key-title">KEY</div>
              <div>
                <img className="w-5 h-5" src="farm/plus_icon.png" alt="plus" />            
              </div>
            </div>
            <div>
              <progress className="w-full progress progress-info progress-xs bg-[#A7B4BE75]" value={28} max={100}></progress>
            </div>
            <div className="flex flex-row items-center justify-between h-8">
              <div className="farm-key-tag">New key</div>
              <div className="farm-key-expire">03:30</div>
            </div>
          </div>
          <div className="function-btn btn-no-body uppercase w-full"
          onClick={() => setGlobalBlocked(false)}
          >
            Open Box
          </div>
        </div>
        {/* <img className="w-full" src="farm/row.png" alt="" /> */}
      </div>
    </div>
   )
}
export default Farm

interface ChestProps {
  chest: IChest;
  globalBlocked: boolean;
}

const Chest: FC<ChestProps> = (props) => {

  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    if (!props.globalBlocked) {
      setBlocked(false);
    }
  }, [props.globalBlocked]);

  const handleOpen = () => {
    if (blocked) {
      setBlocked(false);
    }

    if (blocked) {
      //setOpen(false);
      console.log("handle open");
    }
  }

  return (
  <div className="col-span-1 flex h-20 items-center justify-center btn-no-body"
  onClick={handleOpen}
  >
    {!blocked
    ? <img className="w-18 h-18" src="farm/chest-open.png" alt="chest open" /> 
    : <img className="w-18 h-18" src="farm/chest.png" alt="chest close" />}
  </div>
   )
}
