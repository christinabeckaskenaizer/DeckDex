import type { NextApiRequest, NextApiResponse } from "next";

export type UserResponseData = {
    user: {}
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        cardId: string;
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    let user: any | null = null;
    const { cardId } = req.body;

    let result = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
    if (result.status === 200) {
        let resJson = await result.json();
        res.status(200).json(resJson.data);
    } else{
        res.status(404).json("Failed to find card");
    }


}
