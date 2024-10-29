import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useBuyKeys = (apiFetch: any, onSuccess?: (response: any) => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerInvoice, player } = useUserStore();

  const buyKeys = useCallback(
    async (numKeys: number) => {
   
      try {
        const res = await apiFetch('/star-shop/keys/buy', 'POST', { numKeys }, enqueueSnackbar);
        onSuccess && onSuccess(res)

        updatePlayerInvoice(player?.balance || 0, player?.usdt || 0, res.numKeys);
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyKeys }
}
