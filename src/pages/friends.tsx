import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { IReferral, Page } from "@/types";
import { 
  FC, 
  useCallback, 
  useEffect,
  useState, 
  useRef, 
} from "react";

const Friends: FC = () => {

  const { setPage } = useSiteStore()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
      setPage(Page.FRIENDS)
  }, [setPage])

  
  const { 
    referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals,
  } = useUserStore()
 
 const [refferals, setReferrals] = useState<IReferral[]>()

  useEffect(() => {
    
    if (referralsTotal) {
      setReferrals(getRefferals(referralsPage)) //
    }

    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Помоги еноту построить оконную империю!'
      const url = `https://t.me/Curt_Gedel_bot/windows_taps?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }

    
  }, [referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals])

  const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412") 
  const [telegramUrl, setTelegramUrl] = useState("")

  const handleShare = () => {
     window.open(telegramUrl, '_blank');
  };

  const handleCopy = () => {
    // Using the Clipboard API to copy text
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(referralUrl)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
          fallbackCopyText(referralUrl);
        });
    } else {
      // Fallback method
      fallbackCopyText(referralUrl);
    }
  }

  const fallbackCopyText = useCallback((text: string) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.value = text;
      textArea.select();
      try {
        document.execCommand('copy');
        //alert("Text copied using fallback!");
      } catch (err) {
        //console.error('Fallback: Oops, unable to copy', err);
      }
    } else {
      //console.error('Fallback: Text area reference is null');
    }
  }, [])

  return (
    <div className="w-full pt-4">
        {/* Friends header */}
        <div className="w-full">
          <div className="friends-title">INVITE FRIENDS</div>
          <div className="friends-description pt-3">You and your friend will get bonus</div>
        </div>
        {/* Friends banner */}
        <div className="w-full px-1 pt-4">
          <img className="w-full" src="/friends/friends.png" alt="friends" />
          <div className="friends-banner flex flex-row items-center justify-between py-2">
            <div className="flex flex-col items-center w-full gap-2">
              <div className="
              w-full text-center friends-banner-title px-4">Invite<br/>friend</div>
              <div className="friend-banner-baunty flex flex-row 
              items-center justify-center gap-1">
                <img className="w-5 h-5" src="/stats/coin.png" alt="" />
                + 1 237.344K
              </div>
              <div className="friend-banner-description">both for you and your friend</div>
            </div>
            <div className="h-[72px] flex flex-col items-center w-full gap-2">
              <div className="w-full text-center friends-banner-title px-4">Invite friend<br />Telegram Premium</div>
              <div className="friend-banner-baunty flex flex-row 
              items-center justify-center gap-1">
                <img className="w-5 h-5" src="/stats/coin.png" alt="" />
                + 1 237.344K
              </div>
              <div className="friend-banner-description">both for you and your friend</div>
            </div>
          </div>
        </div>
        {/* Friends list */}
        <div className="w-full px-2 pt-4 friends-list-label">Your friends</div>
        {refferals 
          ? <div className="w-full px-2 mt-4 friends-list">
          {/* <FriendsList friends={refferals} /> */}
            </div> 
          : <div className="mx-2 mt-4 flex items-center justify-center gap-2 h-16 no-friends-slot">
            Still no friends here 😔
            </div>
        }
         <div className='fixed bottom-16 mb-1 w-screen px-3 flex flex-row justify-between gap-3'>
        <div className='invite-friends-btn w-full btn-no-body flex flex-row items-center justify-center gap-2 text-nowrap'
          onClick={handleShare}
          >INVITE FRIENDS 
        </div>
        <div className='invite-friends-btn btn-no-body !w-20 flex items-center justify-center'
           onClick={handleCopy}
           >
          <img className="w-10 h-10" src="/friends/copy.png" alt="copy" />
        </div>
      </div>   
    </div>
  )
}

export default Friends

  /*
  return (
    <>
      <div className="w-screen">
      <div className="friends-header py-4">
        Всегда выгоднее действовать сообща!
      </div>
      <div className="
      friends-description friends-slot 
      flex flex-row items-center justify-center 
      gap-2 px-2 mx-2
      h-[75px]
      ">
        <img src="/friends/gift.png" alt="gift" />
        Приглашай заговорщиков в фирму и собирай подогрев.
      </div>
      {refferals 
        ?  <div className="
        friends-description friends-slot 
        flex flex-col items-center justify-start 
        gap-1 px-2 mt-3
        h-[100px] pt-2
      ">
      <div className="function-btn pt-4">Забрать сбор</div>
      <div className="flex flex-row items-center justify-between w-full px-5 !h-[42px]">
        Фирма принесла вам доход.
        <div className="flex flex-row gap-2">0 <img className="w-6 h-6" src="/home/coin.png" alt="" /></div> 
      </div>
      </div>
        : <div className="
          friends-description friends-slot 
          flex flex-row items-center justify-center 
          gap-2 px-8 mt-3
          opacity-70 h-[100px]
        ">
        Вам нужно проявлять больше активности, чтобы другие еноты последовали за вами.
        </div>
      }
      <div className="friends-devider mt-3 px-4">Список ваших друзей.</div>
      {refferals 
        ? <div>
          {refferals && <FriendsList friends={refferals || []} />}
        </div>
        : <div className="
        friends-description friends-slot 
        flex flex-row items-center justify-center 
        px-8 mt-3
        opacity-70 h-[75px]
        ">Пока еще никто не перешел по вашей ссылке.</div>
      }   
    </div>
      <div className='absolute bottom-24 mb-2 w-screen px-3 flex flex-row justify-between gap-3'>
        <div className='function-btn btn-no-body flex flex-row items-center justify-center gap-2 text-nowrap'
          onClick={handleShare}
          >Пригласить друга 
          <img className="w-8 h-8" src="/friends/group.png" alt="friends" />
        </div>
        <div className='function-btn btn-no-body !w-20 flex items-center justify-center'
          onClick={handleCopy}
          ><img className="w-10 h-10" src="/friends/copy.png" alt="copy" />
        </div>
      </div>   
    </>
  
  )
*/

interface UserItemProps {
  player: IReferral
}

interface FriendsListProps {
  friends: IReferral[]
}   

const FriendsList: FC<FriendsListProps> = (props) => {
  const { friends } = props
  return <div className="mt-4 w-full flex flex-col gap-4 z-0">
      {friends.map((friend, i) => <UserItem key={i} player={friend} />)}
  </div>
}

const UserItem: FC<UserItemProps> = (props) => {
  const { player } = props
  
  return <div className="friends-description friends-slot 
      h-[75px] flex flex-row 
      items-center justify-between mx-2">
      <div className="flex flex-row gap-4 items-center pl-2">
          <img className="w-[55px] h-[55px] rounded-full" 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt={player.username} />
          <div className="flex flex-col items-start justify-between h-full">
              <div className="sm-user-name">{player.username}</div>
              <div className="sm-user-status pt-4">
                  {`Active · ${player.balance}`}
              </div>
          </div>
      </div>
      
      <div className="user-income flex flex-row gap-2 items-center justify-center pr-4">
        + {player.incomePerHour}
        <img className="w-6 h-6" src="/home/coin.png" alt="" />
      </div>
    </div>
}

