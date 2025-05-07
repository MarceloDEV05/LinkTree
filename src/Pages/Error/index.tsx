import { Link } from "react-router-dom"

export const Error = () =>{
    return(
        <div className="flex w-full justify-center items-center flex-col min-h-screen text-white">
           <h1 className="font-bold text-4xl mb-4">Ops...</h1>
           <h2 className="text-6xl">404</h2>
            <p className="italic text-1xl mb-4">Page Not Found!</p>

            <Link to='/' className="bg-gray-50/20 py-1 px-4 rounded-md">Go Home</Link>
        </div>
    )
}