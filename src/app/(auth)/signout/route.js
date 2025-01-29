
import { cookies } from "next/headers";


export const GET = async () => {
    const cookie = cookies();
    await cookie.delete("Security_token");
  
    return Response.json(
      {
        message: "Logout Successfully",
        status: 200
      }
    );
  };
  