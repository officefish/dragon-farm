import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

const useUpdateInvoice = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerInvoice } = useUserStore();

  const updateIncome = useCallback(
    async () => {
      try {
        const res = await apiFetch('/player/invoice', 'GET', enqueueSnackbar);
        console.log(res);        
        
        updatePlayerInvoice(res.balance, res.usdt, res.numKeys);
       
      } catch (error) {
        console.error('Error updating user income per hour, ', error);
        enqueueSnackbar('Error updating user income per hour', { variant: 'error' });
      } 
      return null;
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  );

  return { updateIncome };
};

export default useUpdateInvoice;