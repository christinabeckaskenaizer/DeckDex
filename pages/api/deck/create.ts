import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

// type deckResponseData = {
//     deck: {}
// }
interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        userId: string,
        name : string,
        description: string,
        formatId : string,
        isDeckPrivate : boolean,
        cardIds : string[],
        cardNames : string[]
    };
 }

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(req, res, authOptions);

    // if(session?.user?.id !== req.body.userId) {
    //     return res.status(401).json("Unauthorized");
    // }

    const { userId, name, description, formatId, isDeckPrivate, cardIds, cardNames} = req.body;
    console.log("hello", name);
    try{
    let result = await prisma.deck.create({
        data: {
            userId : userId,
            name: name,
            description : description,
            formatId : formatId,
            isDeckPrivate :isDeckPrivate,
        }
    });
    res.status(200).json({
        "id" : result.id,
        "userId" : result.userId,
        "name": result.name,
        "description" : result.description,
        "formatId" : result.formatId,
        "isDeckPrivate" : result.isDeckPrivate,
        "cards": result.cards
    })
} catch (error) {
    res.json(error);
}
}
