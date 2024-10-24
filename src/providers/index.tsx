import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
import { UserProvider } from "./user"
import { TapsProvider } from "./tap"
import { SnackbarProvider } from "notistack"
import { TonClientProvider } from "./ton"
import { WalletProvider } from "./wallet"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <SnackbarProvider 
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <SiteProvider>
            <UserProvider>
            <TapsProvider>
            <WalletProvider>
            <TonClientProvider>
                {children}
            </TonClientProvider>
            </WalletProvider>
            </TapsProvider>
            </UserProvider>
            </SiteProvider>
        </SnackbarProvider>
    )
}
export default Providers