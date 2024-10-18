import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { ITask } from '@/types';
import { useUserStore } from '@/providers/user';

const useGetTaskBaunty = (apiFetch: any, onSuccess?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyTasks, setSeasonTasks } = useUserStore();

  const getTaskBaunty = useCallback(
    async (taskId: string) => {
      try {
        const res = await apiFetch('/tasks/baunty', 'POST', { taskId }, enqueueSnackbar);

        // Filter tasks into dailyTasks and seasonTasks
        const dailyTasks = res.filter((task: ITask) => task.templateTask.isDaily);
        const seasonTasks = res.filter((task: ITask) => !task.templateTask.isDaily);

        console.log('getTaskBaynty response:');
        console.log(res);
        
        // console.log('Season Tasks:', seasonTasks);

        setDailyTasks(dailyTasks);
        setSeasonTasks(seasonTasks);

        onSuccess && onSuccess();
        
        //console.log(res);
      } catch (error) {
        console.error('Error updating user tasks:', error);
        enqueueSnackbar('Error updating tasks', { variant: 'error' });
      }
    },
    [apiFetch, enqueueSnackbar, setDailyTasks, setSeasonTasks] // Dependencies
  );

  return { getTaskBaunty };
};

export default useGetTaskBaunty;

