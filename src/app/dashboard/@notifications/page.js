import Link from "next/link";



export default async function Notifications() { 

    await new Promise((resolve) => setTimeout(resolve , 1000));

    return (
        <> 
            <h1>All Notifications</h1>
            <Link href={"/dashboard/archive"}> Archived Notifications </Link>
        </>
    )

}
