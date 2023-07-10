import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";


interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        id : string,
    }
}

// type ResponseData = {
//     message : boolean
// }



export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const session = await getServerSession(req, res, authOptions);

    if(session?.user?.id !== req.body.userId) {
        return res.status(401).json("Unauthorized");
    }
    const { id } = req.body;

    const deletedDeck = await prisma.deck.delete({
        where: {
            id : id
        },
    })
    res.status(200).json(deletedDeck)
}
