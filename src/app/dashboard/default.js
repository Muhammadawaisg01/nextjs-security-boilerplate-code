

import Link from "next/link";

export default async function Default_Dashboard() { 


    await new Promise((resolve) => setTimeout(resolve , 3000));

    return (
        <> 
            <h1> Default Dashboard </h1>
            {/* <Link href={"/dashboard"}> Default Notifications </Link> */}
        </>
    )

}



