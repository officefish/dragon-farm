import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useChestsStore } from '@/providers/chests';
//import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

const useUpdateChests = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setTape } = useChestsStore();

  const updateChests = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/chest/tape', 'GET', null, enqueueSnackbar);
        setTape(res)

        //if (res.energyLatest && res.energyMax) {
        //  updatePlayerEnergy(res.energyLatest, res.energyMax)
        //}
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during update energy: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { updateChests }
}
export default useUpdateChests