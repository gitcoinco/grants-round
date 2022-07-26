import {Outlet, useOutletContext} from 'react-router-dom'

import {useGetWeb3Query} from "../api/services/web3"
import {Web3Instance} from "../api/types"
import {Spinner} from "../common/Spinner";
import {ReactComponent as GitcoinLogo} from "../../assets/gitcoinlogo.svg"

import {init, useConnectWallet} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import {ethers} from 'ethers'
import {useEffect, useState} from "react";
import Navbar from "./Navbar";

const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'


const injected = injectedModule();
// initialize Onboard
init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://eth-mainnet.alchemyapi.io/v2/`
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Ethereum Goerli',
      rpcUrl: `https://goerli.infura.io/v3/`
    },
    {
      id: '0xA',
      token: 'ETH',
      label: 'Optimism Mainnet',
      rpcUrl: `https://mainnet.optimism.io`
    },
    {
      id: '0x45',
      token: 'ETH',
      label: 'Optimism Kovan',
      rpcUrl: `https://kovan.optimism.io`
    }
    // TODO figure out which chains to config
  ],
  // accountCenter: {
  //   desktop: {
  //     enabled: true,
  //     // containerElement: "body"
  //     containerElement: "#web3onboard-id-124"
  //   },
  //   mobile: {
  //     enabled: true,
  //     // containerElement: "body"
  //     containerElement: "#web3onboard-id-124"
  //   }
  // }
});

/**
 * Component for protecting child routes that require web3 wallet instance.
 * It prompts a user to connect wallet if no web3 instance is found.
 */
export default function ProtectedRoute() {


  // const { data, refetch, isSuccess, isLoading } = useGetWeb3Query()
  const [{wallet, connecting}, connect, disconnect] = useConnectWallet();
  console.log("wallet here: ", wallet);
  const [data, setData] = useState<Web3Instance>()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  const connectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault()
    // refetch()
    connect();
  }

  useEffect(() => {
    console.log("Wallet: ", wallet);
    if (wallet) {
      console.log(`wallet account: ${wallet.accounts[0]} | chainId: ${wallet.chains[0].id}`);
      setData({account: wallet.accounts[0].address, chainId: 1});
    }
  }, [wallet])


  return !data ? (
    <div id="web3onboard-id-123">
      <main>
        {connecting
          ? <Spinner text="Connecting Wallet"/>
          : <div className="bg-grey-500 h-screen">
            <div className="flex left-0 h-full fixed bg-white z-10">
              <div>
                <GitcoinLogo className="ml-20 mt-3.5 absolute"/>
              </div>
              <div className="m-auto ml-20">
                <h1>Round Manager</h1>
                <p className="text-2xl my-2 text-grey-400">
                  As a round operator you can manage high-impact<br/>
                  grant programs and distribute funds across different<br/>
                  rounds and voting mechanisms.
                </p>
                <button type="button" className="bg-grey-500 mt-8 py-4 px-8 rounded text-white"
                        onClick={connectHandler}>
                  Connect Wallet
                </button>
              </div>
            </div>
            <div className="left-0 w-[55%] h-full fixed overflow-x-hidden skew-x-[-10deg] bg-white"></div>
            <div className="right-0 w-1/2 h-full fixed overflow-x-hidden"></div>
          </div>
        }
      </main>
    </div>
  ) : <Outlet context={data}/>
}


/**
 * Wrapper hook to expose wallet auth information to other components
 */
export function useWeb3() {
  return useOutletContext<Web3Instance>()
}