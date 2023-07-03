import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prismadb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        id : string,
    }
}

// type ResponseData = {
//     message : boolean
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { id } = req.body;

    const deletedDeck = await prisma.deck.delete({
        where: {
            id : id
        },
    })
    res.status(200).json(deletedDeck)
}
