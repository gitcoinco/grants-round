import { Link } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Button } from "../common/styles"
import { ReactComponent as NotFoundBanner } from "../../assets/404.svg"
import { Lit } from "../api/lit"


export default function NotFoundPage() {

  const lit = new Lit({
    chain: "goerli",
    contract: "0x22c0e3EDc90f6A890A259130B416Cd5F3Ee4Aca0",
    wallet: "0x5cdb35fADB8262A3f88863254c870c2e6A848CcA"
  });

  lit.encryptString("Hello World").then(async res => {
    
    const encryptedString = res.encryptedString;
    const encryptedSymmetricKey = res.encryptedSymmetricKey;

    const x = await lit.decryptString(encryptedString, encryptedSymmetricKey);

    console.log(x);
    
  })

  return (
    <>
      <Navbar />
      <main>
        <div className="flex h-screen pt-8">
          <div className="m-auto text-center mt-5">
            <h1 className="my-5 text-sm text-red-100 font-bold">404 ERROR</h1>
            <h2 className="my-5 text-4xl">Uh oh! You might be a little lost</h2>

            <p className='text-grey-400 mb-0'>
              It looks like the page you’re looking for doesn’t exist.
            </p>
            <p className='text-grey-400 mt-1 mb-5'>
              For support, contact us on <a href="https://discord.com/invite/gitcoin">Discord.</a>
            </p>
            
            <Link to="/">
              <Button
                $variant="outline"
                type="button"
                className="px-3 bg-violet-100 text-violet-400 border-0 text-xs"
              >
                Go back home
              </Button>
            </Link>

            <NotFoundBanner className='max-w-full	' />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
