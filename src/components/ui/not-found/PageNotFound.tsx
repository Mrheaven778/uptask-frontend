import Image from "next/image";
import Link from "next/link";

function PageNotFound() {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center">
            <div className="text-center px-5 mx-5">
                <h2 className={` antialiased text-9xl`}>400</h2>
                <p className="font-semibold text-xl">Whoops! Lo sentimos mucho</p>
                <p className="font-light"><span>
                    Puedes regresar al </span><Link href='/dashboard' className="font-normal hover:underline transition-all ">inicio</Link></p>
            </div>
            <div className="px-5 mx-5">
                <Image src="/logo.svg" alt="404" width={500} height={500} />
            </div>
        </div>
    );
}


export default PageNotFound