import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications

export const useBuyKeys = (apiFetch: any, onSuccess?: (response: any) => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const buyKeys = useCallback(
    async (numKeys: number) => {
   
      try {
        const res = await apiFetch('/for-stars-shop/keys/buy', 'POST', { numKeys }, enqueueSnackbar);
        onSuccess && onSuccess(res.invoiceLink);
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyKeys }
}
