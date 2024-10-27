

import { ReadyBauntyDialog } from "@/components/dialogs/farm.dialog";
import { useBuyKeys } from "@/hooks/api/useBuyKeys";
import { useGetChestBaunty } from "@/hooks/api/useGetChestBaunty";
import { useOpenChest } from "@/hooks/api/useOpenChest";
import { useUnblockTape } from "@/hooks/api/useUnblockTape";
import useUpdateChests from "@/hooks/api/useUpdateChests";
import { useChestsStore } from "@/providers/chests";
import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { Page } from "@/types";
import { IChest, IChestItem } from "@/types/chest";
import { FC, useEffect, useState } from "react";

const Farm: FC = () => {

  const { setPage } = useSiteStore();  
  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

  const { unblockTape } = useUnblockTape(apiFetch);
  const { openChest } = useOpenChest(apiFetch);
  const { buyKeys } = useBuyKeys(apiFetch);
  const { tape, chests, items, baunty } = useChestsStore();

  const [isBauntyDialogOpen, setIsBauntyDialogOpen] = useState(false)

  useEffect(() => {
    if (baunty) {
      setIsBauntyDialogOpen(true)
    }
  }, [baunty])

  const handleUnblockTape = () => {
    unblockTape(tape?.id || '');
  }

  const handleAddKey = () => {    
    buyKeys(1);
  }

  const handleOpenChest = (chestId: string) => {
    openChest(tape?.id || '', chestId);
  }

  const onSuccessGetBaunty = () => {
   setIsBauntyDialogOpen(false)
  }

  const { getChestBaunty } = useGetChestBaunty(apiFetch, onSuccessGetBaunty)

  const handleGetBaunty = () => {
    getChestBaunty(baunty?.id || '')
  }

  const { updateChests } = useUpdateChests(apiFetch)

  const handleUpdateChests = () => {
    updateChests()
  }

    return (
    <div className='w-full'>

      <div className='shop-dialog-title mt-8 uppercase px-2'>find a Great Prize!</div>
      <div className='mt-3 shop-dialog-description px-2'>
        9 Types of Rewards Available
      </div>

      <div className="w-full mt-6 px-2">
        <div className="grid grid-rows-4 grid-cols-4 gap-3 text-white">

          {tape && tape.state === "BLOCKED" && (
            Array(16).fill(0).map((_, index) => (
              <ClosedChest key={index}  />
            ))
          )}

          {tape && tape.state === "UNBLOCKED" && (
            chests && chests.map((chest, index) => (
              <Chest 
              key={index} 
              chest={chest} 
              onOpen={handleOpenChest}
              />     
            ))
          )}

          {tape && tape.state === "OPENED" && (
            items && items.map((item, index) => (
              <Item key={index}
              data={item} />
            ))
          )}

        </div>
      </div>

      <div className="w-full absolute bottom-20">

      {/* Tape blocked navigation */}
        {tape?.state === "BLOCKED" && (
          <TapeBlockedNavigation
          onAddKey={handleAddKey}
          onUnblockTape={handleUnblockTape}
          ></TapeBlockedNavigation>  
      )}

      {/* Tape unblocked navigation */}
      {tape?.state === "UNBLOCKED" && (
         <div className="h-20 task-item flex flex-row gap-1 items-center justify-center mx-2">
            <div className="shop-dialog-title">OPEN ANY BOX!</div>
         </div>
      )}

      {/* Tape unblocked navigation */}
      {tape?.state === "OPENED" && (
         <div className="h-20 function-btn btn-no-body flex flex-row gap-1 items-center justify-center mx-2"
         onClick={handleUpdateChests}
         >
            <div className="shop-dialog-title flex flex-row items-center justify-center gap-2">
              {/* <img className="w-4 h-4" src="farm/win.png" alt="" /> */}
              TRY AGAIN!
              {/* <img className="w-4 h-4" src="farm/win.png" alt="" /> */}
            </div>
         </div>
      )}

      {tape?.state === "OPENED" && (
        <ReadyBauntyDialog item={baunty} 
        isOpen={isBauntyDialogOpen} 
        setIsOpen={handleGetBaunty} 
          onReadyClick={handleGetBaunty} />
      )}
      </div>
    </div>
   )
}
export default Farm

interface TapeBlockedNavigationProps {
  onAddKey: () => void;
  onUnblockTape: () => void;  
} 

const TapeBlockedNavigation: FC<TapeBlockedNavigationProps> = (props) => {

  const { player } = useUserStore();
  const { onAddKey, onUnblockTape } = props;

  return (
   <div className="h-20 task-item flex flex-row gap-1 items-center justify-between">
          <div className="flex flex-col pl-2 pt-2 w-56">
            
            <div className="flex flex-row items-center justify-between gap-1 h-6 w-full">
              <div className="flex flex-row items-center justify-start gap-1">
                <img className="w-6 h-6" src="farm/key.png" alt="key" />
                <div className="farm-key-value">{player?.numKeys}</div>
              </div>
              <div className="farm-key-title">KEYS</div>
              <div className="btn-no-body" onClick={onAddKey}>
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
          onClick={onUnblockTape}
          >
            Open Box
          </div>
        </div>
  )
}

interface ChestProps {
  chest: IChest;
  onOpen: (chestId: string) => void;
}

const Chest: FC<ChestProps> = (props) => {

  const handleOpen = () => {
   props.onOpen(props.chest.id); 
  }

  return (
  <div className="col-span-1 flex h-20 items-center justify-center btn-no-body"
  onClick={handleOpen}
  >
    <img className="w-18 h-18" src="farm/chest-open.png" alt="chest open" /> 
  </div>
   )
}

const ClosedChest: FC = () => {
  return (
  <div className="col-span-1 flex h-20 items-center justify-center btn-no-body">
    <img className="w-18 h-18" src="farm/chest.png" alt="chest close" />
  </div>
   )
}

interface ItemProps {
  data?: IChestItem;
}

const Item: FC<ItemProps> = (props) => {

  const data = props.data

  const getIconSrc = (variant: string) => {
    switch(variant) {
      case "KEYS": return "farm/big-key.png";
      case "COINS": return "farm/big-coin.png";
      case "USDT": return "farm/big-usdt.png";
    }
  }

  return (
    <div className="col-span-1 flex flex-col h-20 w-20 gap-1 items-center justify-center">
      <img className="w-16 h-16" src={getIconSrc(data?.variant || "KEYS")} alt="chest close" />
      <div className="chest-item-value">{data?.variant === "USDT" ? data.value / 100 : data?.value}</div>
    </div>
  )
}



