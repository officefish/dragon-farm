
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
//import { useNavigate } from "react-router-dom"

const ReferralProgram: FC = () => {

  const { setPage } = useSiteStore();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const referralsCode = "2"

  useEffect(() => {
    

    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Стань лидером сообщества!'
      const url = `https://t.me/duck_taps_test_bot/duck_taps?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }

    
  }, [referralsCode])

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



  useEffect(() => {
    setPage(Page.HOME);
  }, [setPage]);

  const plusFive = "+5% к активности"
  const plusTen = "+10% к активности"
  const plusTwenty = "+20% к активности"

    return (
    <div className='w-full'>
        
        {/* Activity widget */}
        <div className="w-full px-8">
            <div className="label">
                <span className="label-text">Активность (вклад в сообщество)</span>
            </div>
            <input type="range" min={0} max="100" value="25" className="range range-secondary" step="25" />
            <div className="flex w-full justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
            <div className="flex w-full justify-between px-2 pt-2 text-xs">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
            </div>
        </div>

        {/* Toy widget */}
        <div className="w-full px-4 pt-4 flex flex-row items-center justify-center gap-1">
            <img className="w-24 h-24 btn-no-body" src="referral_program/toy1.png" alt="toy1" />
            <img className="w-24 h-24 btn-no-body" src="referral_program/toy2.png" alt="toy2" />
        </div>

        {/* Baunty results table */}
        <div className="overflow-x-auto pb-24">
            <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th></th>
                    <th>Задания</th>
                    <th>Награда</th>
                    <th>Прогресс</th>
                </tr>
            </thead>
            <tbody>
            {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Пригласи пять друзей</td>
                    <td>{plusFive}</td>
                    <td>0/5</td>
                </tr>
            {/* row 2 */}
                <tr>
                    <th>2</th>
                    <td>Пригласи 10 друзей</td>
                    <td>{plusFive}</td>
                    <td>0/10</td>
                </tr>
            {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Пригласи 50 друзей</td>
                    <td>{plusFive}</td>
                    <td>0/50</td>
                </tr>
            {/* row 4 */}
                <tr>
                    <th>4</th>
                    <td>Пригласи 100 друзей</td>
                    <td>{plusFive}</td>
                    <td>0/100</td>
                </tr>
            {/* row 5 */}
                <tr>
                    <th>5</th>
                    <td>Пригласи 1000 друзей</td>
                    <td>{plusFive}</td>
                    <td>0/1000</td>
                </tr>

            {/* row 6 */}
                <tr>
                    <th>6</th>
                    <td>Пригласи 5 premium друзей</td>
                    <td>{plusTen}</td>
                    <td>0/5</td>
                </tr>

            {/* row 7 */}
                <tr>
                    <th>7</th>
                    <td>Ежедневные приглашения</td>
                    <td>{plusFive}</td>
                    <td>0/5</td>
                </tr>

            {/* row 8 */}
                <tr>
                    <th>8</th>
                    <td>Ежедневные приглашения</td>
                    <td>{plusTen}</td>
                    <td>0/10</td>
                </tr>

             {/* row 9 */}
                <tr>
                    <th>9</th>
                    <td>Ежедневные приглашения</td>
                    <td>{plusTwenty}</td>
                    <td>0/30</td>
                </tr>

            {/* row 10 */}
                <tr>
                    <th>10</th>
                    <td>Ежедневные приглашения</td>
                    <td>{plusTen}</td>
                    <td>0/10</td>
                </tr>

            {/* row 11 */}
                <tr>
                    <th>11</th>
                    <td>Потапай по персонажу</td>
                    <td>{plusFive}</td>
                    <td>0/1000</td>
                </tr>

            {/* row 12 */}
                <tr>
                    <th>12</th>
                    <td>Потапай по персонажу</td>
                    <td>{plusFive}</td>
                    <td>0/10000</td>
                </tr>

            {/* row 12 */}
                <tr>
                    <th>13</th>
                    <td>Потапай по персонажу</td>
                    <td>{plusFive}</td>
                    <td>0/100000</td>
                </tr>

            </tbody>
          </table>
        </div>

        <div className="fixed left-0 bottom-0 h-24 w-full 
        flex items-center justify-center gap-2">
            <button 
            className="btn btn-wide btn-accent"
            onClick={handleShare}
            >Поделиться</button>
            <button 
            className="btn btn-accent"
            onClick={handleCopy}
            >
                <img className="w-6 h-6" src="/friends/copy.png" alt="copy" />
            </button>
        </div>
        
        <textarea
        ref={textAreaRef}
        className="invisible"
        style={{ position: 'absolute', left: '-9999px' }}
        readOnly
      />
    </div>
   )
}
export default ReferralProgram