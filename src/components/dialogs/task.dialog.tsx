import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { ITask } from '@/types'

interface PendingTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onNavigateClick: () => void
  task: ITask
}

function getTaskSrc(type: string): string {
  let src = ""
  switch (type) {
      case 'DAILY_BAUNTY':
        src = 'tasks/daily-quest.png'
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
      default:
        src = 'tasks/telegram.png'
  }
  return src
}

export const PendingTaskDialog: FC<PendingTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onNavigateClick,
    task
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
    <dialog className='modal overflow-hidden' ref={modalRef}>
      <div className='w-full h-screen bottom-0 absolute'>
      <div className='shop-modal relative mt-[320px]'>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
          <img className='w-6 h-6' src="/shop/close.png" alt="close" />
        </div>
        <div className='w-full flex flex-col justify-center items-center pt-8'>
          <div className='flex items-center justify-center w-full p-4'>
            <img className='w-[200px] h-[200px]' src={getTaskSrc(task.templateTask.type)} alt="" />
          </div>
          <div className='shop-dialog-title mt-2'>{task.templateTask.title}</div>
          <div className="w-full flex flex-row items-center justify-center gap-2 pt-8">
            <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
            <span className="balance-label">{task.templateTask.baunty || 0}</span>
          </div>
       </div>
    </div>
  </div>
  <div className='absolute bottom-4 w-screen pl-6'>
        <div className='function-btn btn-no-body pt-6'
          onClick={onNavigateClick}
          >Перейти
        </div>
      </div>
</dialog>
  )
}

interface ReadyTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onReadyClick: () => void
  task: ITask
}

export const ReadyTaskDialog: FC<ReadyTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReadyClick,
    task
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
        
    <dialog className='modal overflow-hidden' ref={modalRef}>
      <div className='w-full h-screen bottom-0 absolute'>
      <div className='shop-modal relative mt-[320px]'>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
          <img className='w-6 h-6' src="/shop/close.png" alt="close" />
        </div>
        <div className='w-full flex flex-col justify-center items-center pt-8'>
          <div className='flex items-center justify-center w-full p-4'>
            <img className='w-[200px] h-[200px]' src={getTaskSrc(task.templateTask.type)} alt="" />
          </div>
          <div className='shop-dialog-title mt-2'>{task.templateTask.title}</div>
          <div className='shop-dialog-description mt-2'>Задание выполнено</div>
          <div className="w-full flex flex-row items-center justify-center gap-2 pt-8">
            <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
            <span className="balance-label">{task.templateTask.baunty || 0}</span>
          </div>
       </div>
    </div>
  </div>
  <div className='absolute bottom-4 w-screen pl-6'>
        <div className='function-btn btn-no-body pt-6'
          onClick={onReadyClick}
          >Забрать награду
        </div>
      </div>
</dialog>
  )
}
