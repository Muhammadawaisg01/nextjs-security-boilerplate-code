
import Link from "next/link";


export default async function Archived_Notifications() { 

    await new Promise((resolve) => setTimeout(resolve , 1000));

    return (
        <> 
            <h1> Archived Notifications </h1>
            <Link href={"/dashboard"}> Default Notifications </Link>
        </>
    )

}
