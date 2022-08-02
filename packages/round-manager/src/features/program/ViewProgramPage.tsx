import { useNavigate, useParams, Link } from "react-router-dom"
import {ArrowLeftIcon, ArrowNarrowRightIcon, PencilIcon, PlusIcon, PlusSmIcon, UserIcon} from "@heroicons/react/solid"
import { RefreshIcon } from "@heroicons/react/outline"

import { Button } from "../common/styles"
import { useWallet } from "../common/Auth"
import { useListProgramsQuery } from "../api/services/program"
import { useListRoundsQuery } from "../api/services/round"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer";

const abbreviateAddress = (address: string) => `${address.slice(0,8)}...${address.slice(-4)}`

export default function ViewProgram() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { address, chain: { network } } = useWallet()
  const { program } = useListProgramsQuery({ address, network }, {
    selectFromResult: ({ data }) => ({ program: data?.find((program) => program.id === id) }),
  })

  const {
    data: rounds,
    isLoading: isRoundsLoading,
    isSuccess: isRoundsFetched
  } = useListRoundsQuery({ address, network, programId: id })

  const roundItems = rounds?.map((round, index) =>
    <div
      key={index}
      className="relative rounded border border-grey-100 bg-white px-5 py-4 my-2 flex items-center space-x-3"
    >

      <div className="flex-1 min-w-0">

        <p className="text-sm mb-1 font-medium text-gray-900">
          {round.roundMetadata!.name}
        </p>

        <div className="grid sm:grid-cols-3">
          <p className="text-xs flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-grey-500 my-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-grey-400 my-auto">Applications: </span>
            <span className="my-auto">{`${round.applicationsStartTime.toLocaleDateString()} - ${round.applicationsEndTime.toLocaleDateString()}`}</span>
          </p>
          <p className="text-xs flex gap-1 md:ml-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-grey-400 my-auto">Round: </span>
            <span className="my-auto">{`${round.roundStartTime.toLocaleDateString()} - ${round.roundEndTime.toLocaleDateString()}`}</span>
          </p>
        </div>
      </div>

      <Link className="text-xs flex gap-2" to={`/round/${round.id}`} key={index}>
        <span>View Details</span>
        <ArrowNarrowRightIcon className="h-5 w-5" />
      </Link>

    </div>
  )

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <>
      <Navbar programCta={true} />
      <div className="container flex flex-col w-screen h-screen">
        <header className="border-b">
          <Link to={`/`}>
            <ArrowLeftIcon className="h-6 w-6 mr-3 mt-1" aria-hidden="true" />
          </Link>
          <div className="mb-2 flex justify-between">
            <div className="flex flex-rows">

              <h1 className="text-3xl sm:text-[32px]">
                {program?.metadata?.name || "Program Details"}
              </h1>
            </div>
          </div>
          <div className="flex flex-row">
            {
              program?.operatorWallets.map((operatorWallet, index) =>
                <div className="bg-white text-grey-500 pb-2 pr-5" key={index}>
                  <UserIcon className="inline h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500" key={index}>{abbreviateAddress(operatorWallet)}</span>
                </div>
              ) || (
                <p className="text-gray-500 text-sm">
                  Fetching operator wallets...
                </p>
              )
            }
          </div>
        </header>

        <main className="flex-grow">
          <div>
            <div className="sm:flex sm:justify-between">
              {/*<div className="sm:basis-3/4 sm:mr-3">*/}
              {/*  /!* TODO: background *!/*/}
              {/*  <img src="https://storageapi.fleek.co/thelostone-mc-team-bucket/1500x500-1.jpg" aria-hidden="true" alt="program image" />*/}
              {/*</div>*/}



            </div>

          </div>

          <div className="sm:flex sm:justify-between">
            <div className="sm:mr-3">
              {/*<h2 className="text-sm mb-3">Operators</h2>*/}
              {/*<div className="grid sm:grid-cols-3 gap-2">*/}
              {/*  {*/}
              {/*    program?.operatorWallets.map((operatorWallet, index) =>*/}
              {/*      <div className="bg-white text-grey-500 border rounded py-2 px-5 truncate block" key={index}>*/}
              {/*        <UserIcon className="inline-flex h-4 w-4 text-black mr-1" />*/}
              {/*        <span className="text-xs text-gray-500" key={index}>{operatorWallet}</span>*/}
              {/*      </div>*/}
              {/*    ) || (*/}
              {/*      <p className="text-gray-500 text-sm">*/}
              {/*        Fetching operator wallets...*/}
              {/*      </p>*/}
              {/*    )*/}
              {/*  }*/}
              {/*</div>*/}

              {/*<p className="text-gray-500 border-b text-sm py-4">*/}
              {/*  You can't edit operator wallets after the round is deployed.*/}
              {/*</p>*/}


              <h2 className="text-sm my-4">My Rounds</h2>

              <div className="grid md:grid-cols-1 sm:grid-cols-1 mb-8">
                {isRoundsFetched && roundItems}
                {isRoundsLoading && <p>Fetching your rounds...</p>}
              </div>
            </div>
            <div className="sm:basis-1/4 text-center sm:ml-3"></div>
          </div>

          <div className="flex justify-center">
            <div className="text-center px-8 sm:ml-3 w-96">
              <RefreshIcon className="h-12 w-12 mt-8 mx-auto bg-zinc-100 rounded-full p-3" aria-hidden="true"></RefreshIcon>
              <h3 className="text-2xl mt-8 mb-2">
                My Rounds
              </h3>
              <p className="text-gray-500 text-sm">
                Manage date details and acceptance criteria for your Grant Program Round.
              </p>
              <Link to={`/round/create?programId=${program?.id}`}>
                <Button className="my-4 px-4 mt-10">
                  <PlusIcon className="h-4 w-4 inline-flex -translate-y-0.5" aria-hidden="true" /> Create round
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}