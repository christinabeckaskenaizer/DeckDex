import type { NextApiRequest, NextApiResponse } from "next";

export type UserResponseData = {
    user: {}
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        query: string;
        set?: string;
        types?: string;
        subtype?: string;
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    let user: any | null = null;
    const { query, set, types, subtype } = req.body;
    let url = `https://api.pokemontcg.io/v2/cards?q=name:"${query}"${set ? ' set.id' + set : ''}${subtype ? ' subtypes:' + subtype : ''}${types ? ' types:' + types : ''}&orderBy=-set.releaseDate`;
    console.log(url)
    let result = await fetch(url);
    if (result.status === 200) {
        let resJson = await result.json();
        res.status(200).json(resJson.data);
    } else {
        res.status(404).json("Failed to find card");
    }
}
