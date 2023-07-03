import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next"; 


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

    const session = await getServerSession(req, res, authOptions);

    if(session?.user?.id !== req.body.userId) {
        return res.status(401).json("Unauthorized");
    }

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
        } : "Failed to find user."
    );
}
