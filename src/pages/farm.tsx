

import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect,  } from "react";

const Farm: FC = () => {

  const { setPage } = useSiteStore();

  useEffect(() => {
    setPage(Page.FARM);
  }, [setPage]);

    return (
    <div className='w-full'>
     
    </div>
   )
}
export default Farm