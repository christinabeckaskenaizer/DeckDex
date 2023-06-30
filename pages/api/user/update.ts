import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';

export type UserResponseData = {
    user: {}
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        userId: string;
        
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    let user: any | null = null;

    const { userId } = req.body;

    console.log(req.body)

    if (userId) {
        user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    res.status(200).json(
        user ? {
            user: user
        } : "Failed to find user ;("
    );
}
