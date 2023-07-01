import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';

export type UserResponseData = {
    user: {}
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        userId: string;
        image?: string;
        userName?: string;
        bio?: string;
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    let user: any | null = null;

    const { userId } = req.body;

    if (userId) {
        user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: req.body.image,
                userName: req.body.userName,
                bio: req.body.bio
            }
        })
    }

    res.status(200).json(
        user ? {
            user: user
        } : "Failed to find user ;("
    );
}
