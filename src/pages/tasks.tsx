import { useSiteStore } from "@/providers/store";
import { ITask, Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react"

import { PendingTaskDialog, ReadyTaskDialog } from "@/components/dialogs/task.dialog";
import { useUserStore } from "@/providers/user";
import useUpdateTasksStatus from "@/hooks/api/useUpdateTaskStatus";
import { apiFetch } from "@/services/api";
import useGetTaskBaunty from "@/hooks/api/useGetTaskBaunty";
import { useNavigate } from "react-router-dom";

const Tasks: FC = () => {

  const [isPendingDialogOpen, setIsPendingDialogOpen] = useState(false)
  const [isReadyDialogOpen, setIsReadyDialogOpen] = useState(false)

  const onBauntySuccess = () => {
      setIsReadyDialogOpen(false)
  }

  const { setPage } = useSiteStore()
  const { updateTasksStatus } = useUpdateTasksStatus(apiFetch) 
  const { getTaskBaunty } = useGetTaskBaunty(apiFetch, onBauntySuccess)

  useEffect(() => {
      updateTasksStatus()
  }, [])

  useEffect(() => {
      setPage(Page.TASKS)
  }, [setPage])

  const { dailyTasks, seasonTasks } = useUserStore()
  const [currentTask, setCurrentTask] = useState<ITask>(seasonTasks[0])

  const handleTaskClick = (task: ITask) => {
      setCurrentTask(task)
      if (task.status === "READY") {
        setIsReadyDialogOpen(true)
      } else if (task.status === "PENDING" || task.status === "IN_PROGRESS") {
        setIsPendingDialogOpen(true)
      }
  }

  const navigate = useNavigate();
  const handleNavigateClick = () => {
      const path = currentTask.templateTask.navigate
      if (!path) {
        setIsPendingDialogOpen(false)     
        return
      }

      if (path.startsWith('http://') || path.startsWith('https://')) {
        // Если да, открываем ссылку в новой вкладке
        setIsPendingDialogOpen(false)
        window.open(path, '_blank');
      } else {
        // В противном случае, используем navigate для перехода внутри приложения
        setIsPendingDialogOpen(false)
        navigate(path);
      }
      
  }

  const handleReadyClick = () => {
      getTaskBaunty(currentTask.id) 
  }

    return (
      <div className="w-screen overflow-x-hidden pb-20 tasks-list">
        <div className="pt-8">
          {dailyTasks.length > 0 && <TasksList 
             tasks={dailyTasks} 
             onTaskCLicked={handleTaskClick} 
           />}
        </div> 
        {/* <div className="tasks-list-title mt-2 pl-4 pb-1">Сезонные задания:</div> */}
          {seasonTasks.length > 0 && <TasksList 
             tasks={seasonTasks} 
             onTaskCLicked={handleTaskClick}
           />}
        <PendingTaskDialog 
            isOpen={isPendingDialogOpen} 
            setIsOpen={setIsPendingDialogOpen}
            onNavigateClick={handleNavigateClick}
            task={currentTask}
          />
         <ReadyTaskDialog 
            isOpen={isReadyDialogOpen} 
            setIsOpen={setIsReadyDialogOpen}
            onReadyClick={handleReadyClick}
            task={currentTask}
          /> 
      </div>
  )}
export default Tasks



interface TaskListsProps {
  tasks: ITask[]
  onTaskCLicked: (task: ITask) => void
}

const TasksList : FC<TaskListsProps> = (props) => {
  const { tasks, onTaskCLicked } = props
  return <div className="mt-2 px-2 w-full flex flex-col gap-2">
      {tasks.map((task, index) => <TaskItem 
          key={index} 
          task={task} 
          onClick={onTaskCLicked}
          />)}
  </div>
}

interface TaskItemProps {
  task: ITask
  onClick: (task: ITask) => void
}



const TaskItem : FC<TaskItemProps> = (props) => {
  const { task, onClick } = props  
  const { title, baunty } = task.templateTask
  
  const handleTaskClick = (e: SyntheticEvent<HTMLDivElement>) => {
      e.preventDefault()
      onClick(task)
  }

  return <div onClick={handleTaskClick} 
  className={`
    ${task.status === "COMPLETED" ? "opacity-80 grayscale" : "grayscale-0"}
    btn-no-body 
    w-full 
    flex flex-row 
    items-center justify-between
    task-item
    h-24
    `}>
      <div className="flex flex-row gap-2 items-center justify-start">
          <div className="flex items-center justify-center pl-2 w-24">
              <Icon type={task.templateTask.type} />
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pl-2">
              <div className="task-job w-48">{title}</div>
              <div className="task-baunty flex flex-row items-center justify-center gap-3">
                <img className="w-8 h-8" src="/tasks/cute-coin.png" alt="" />
                <span>+{baunty}</span>
              </div>
          </div>
      </div>
      <div>
        <TaskStatusWidget task={task} />
      </div>
  </div>
}

interface TaskStatusProps {
  task: ITask
}

const TaskStatusWidget:FC<TaskStatusProps> = (props) => {
  const task = props.task

  const status = task.status

  switch (status) {
    case "COMPLETED": return (
      <div className="w-20 h-full flex items-start justify-center pr-4">
        {/* <img className="w-[57px] h-6" src="/tasks/button.png" alt="check" /> */}
      </div>)
    case "READY": return (
      <div className="w-20 h-full flex items-start justify-center pr-4">
        <img className="w-[57px] h-6" src="/tasks/button.png" alt="check" />
    </div>)
    case "IN_PROGRESS": return (
      <div className="w-8 h-8 flex items-center justify-center pr-2">
        <img className="w-4 h-4" src="/tasks/chevron_right_16.svg" alt="check" />
      </div>)
    case "PENDING": return (
      <div className="w-8 h-8 flex items-center justify-center pr-2">
        <img className="w-4 h-4" src="/tasks/chevron_right_16.svg" alt="check" />
      </div>)
  }
}

interface GetIconProps {
  type: string
}

const Icon:FC<GetIconProps> = (props) => {
  let src
  switch (props.type) {
      case 'DAILY_BAUNTY':
        src = 'tasks/log-in.png'
        break
      case 'DAILY_MINIGAME':
        src = 'tasks/daily-quest.png'
        break
      case 'INVITE_COUNT':
        src = 'tasks/telegram.png'
        break
      case 'SUBSCRIPE_CHANNEL':
        src = 'tasks/telegram.png'
        break
      case 'DAILY_GAMEPLAY_ACTION':
        src = 'tasks/key.png'
        break
      case 'BYBIT_DEPOSIT':
      case 'BYBIT_KYC':
      case 'BYBIT_REGISTRATION':
        src = 'tasks/bybit.png'
        break;
      case 'SHARE_STORY':
        src = 'tasks/story.png'
        break;
      case 'DAILY_TON_CHECKIN':
      case 'CONNECT_WALLET':
      case 'MAKE_TEST_TRANSACTION':
        src = 'tasks/ton.png'
        break;    
      default:
        src = 'tasks/telegram.png'
  }
  return <img className="w-[80px] h-[80px]" src={src} alt="icon" />
}