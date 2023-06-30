import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

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
            cardIds : cardIds,
            cardNames : cardNames,
        }
    });
    res.status(200).json({"id" : result.id})
} catch (error) {
    res.json(error);
}
}
