
//import ReactJson from 'react-json-view';
//import { Cell } from '@ton/core';

import { useSiteStore } from '@/providers/store';
import { Page } from '@/types';
import { SendTransactionRequest, SendTransactionResponse, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { 
    FC, 
    useCallback, 
    useEffect,
    useState, 
} from 'react'

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx: SendTransactionRequest = {
	// The transaction is valid for 10 minutes from now, in unix epoch seconds.
	validUntil: Math.floor(Date.now() / 1000) + 600,
	messages: [

		{
			// The receiver's address.
			//address: 'EQCKWpx7cNMpvmcN5ObM5lLUZHZRFKqYA4xmw9jOry0ZsF9M',
            address: "UQC8F3ioQ_WOTamDnT9fYj2UMJyel3Ux0yDjwz7hgBMYWMFM",
			// Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
			amount: '5000000',
			// (optional) State initialization in boc base64 format.
			//stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
			// (optional) Payload in boc base64 format.
			//payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
		},

		// Uncomment the following message to send two messages in one transaction.
		/*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */

	],
};




const Airdrop:FC = () => {
    const { setPage } = useSiteStore();
   
    useEffect(() => {
      setPage(Page.AIRDROP);
    }, [setPage]);

    return (
        <>
            <div className='w-full'>
                <TxForm/>
            </div>
        </>
      
        )
};
  
export default Airdrop;

const TxForm = () => {
    const [tx, ] = useState(defaultTx);
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();

	//const onChange = useCallback((value: object) => setTx((value as { updated_src: typeof defaultTx }).updated_src), []);

    const sendTransaction = useCallback(async () => {
        //await tonConnectUi.sendTransaction(tx);
        const result: SendTransactionResponse = await tonConnectUi.sendTransaction(tx)
        console.log(result)

        // Optionally, track the transaction status using a transaction hash
        //const transactionHash = result.boc;

        // You can now monitor the blockchain or explorer for confirmation
        //console.log('Transaction hash:', transactionHash);

        if (result && result.boc) {
            //const cell = Cell.fromBase64(result.boc)
            //const buffer = cell.hash();
            //const hashHex = buffer.toString('hex');     
        }

       
        // hashHex: 57123dffb9029bdaa9187b5d035737eea94a1b8c018e2ab1885f245eb95c6e30
        // const hashBase64 = buffer.toString('base64');

        // https://tonapi.io/v2/blockchain/transactions/57123dffb9029bdaa9187b5d035737eea94a1b8c018e2ab1885f245eb95c6e30

    }, []);
   
    return (
        <div className='overflow-x-hidden pb-20 tasks-list'>
           
            <div className='mt-8'>
                <img className='px-2 w-full' src="/airdrop/banner.png" alt="banner" />
            </div>
            <div className='shop-dialog-title mt-4 uppercase !text-left px-2'>Airdrop</div>
            <div className='mt-3 shop-dialog-description !text-left px-2'>
                By connecting your Ton Wallet, you can participate in the airdrop and receive rewards directly into your wallet.
            </div>
            <div className='mt-4 airdrop-conditions px-2'>
                To join the airdrop, follow these steps:      
            </div>
            <div className='
            mt-3 flex items-center justify-between px-4'>
                <span className={`${wallet ? 'airdrop-conditions-disabled' : 'airdrop-conditions'}`}>1. Connect your Ton Wallet.</span>  
                {wallet &&<img src="/airdrop/checked.png" alt="checked" />}  
            </div>
            <div className='mt-4'>
                <div 
                onClick={() => tonConnectUi.openModal()}
                className={`
                uppercase 
                flex flex-row items-center 
                justify-center gap-2
                ${wallet ? 'function-btn-disabled' : 'function-btn btn-no-body'}
                `}>
                    Connect wallet
                    <img className='w-8 h-8' src="/airdrop/wallet.png" alt="" />
                </div>
            </div>

            <div className='
            mt-4 flex items-center justify-between px-4'>
                <span className={`airdrop-conditions`}>2. Make an upproval transaction.</span>  
                {/* <span className={`${wallet ? 'airdrop-conditions-disabled' : 'airdrop-conditions'}`}>1. Connect your Ton Wallet.</span>   */}
                {/* {wallet &&<img src="/airdrop/checked.png" alt="checked" />}   */}
            </div>
            <div className='mt-4'>
                {/* <div className={`
                uppercase 
                flex flex-row items-center 
                justify-center gap-2
                ${wallet ? 'function-btn-disabled' : 'function-btn btn-no-body'}
                `}>
                    Connect wallet
                    <img className='w-8 h-8' src="/airdrop/wallet.png" alt="" />
                </div> */}
                <div
                onClick={sendTransaction}
                className={`
                uppercase 
                flex flex-row items-center 
                justify-center gap-2
                function-btn btn-no-body
                `}>
                    Make transaction 0.05 TON
                    <img className='w-8 h-8' src="/airdrop/wallet.png" alt="" />
                </div> 
            </div>

            <div className='
            mt-4 flex items-center justify-between px-4'>
                <span className={`airdrop-conditions`}>3. Wait for the airdrop rewards to be distributed!</span>  
            </div>

            <div className='mt-6 airdrop-conditions px-2'>
                What will affect the amount of tokens you receive?      
            </div>

            <ul className='mt-3 shop-dialog-description !text-left pl-8 list-disc'>
                <li>Your current income in the game.</li>
                <li>Your activity and engagement in the game.</li>
                <li>The number of friends you invite to the game.</li>      
            </ul>

            <div className='mt-4 airdrop-conditions px-2'>
                The more you interact with the game and share it with others, the higher your token rewards will be!     
            </div>

            <div className='mt-3 shop-dialog-description !text-left px-2'>
            Once you’ve received your tokens, you’ll be able to exchange them on popular exchanges such as OKX and ByBit for USDT (Tether). Keep an eye on the airdrop page for updates and detailed instructions on how to exchange your tokens.            
            </div>

         
            {/* <ReactJson src={defaultTx} theme="ocean" onEdit={onChange} onAdd={onChange} onDelete={onChange} /> */}
        </div>
        
    )
}