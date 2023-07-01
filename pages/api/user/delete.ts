import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next"; 

export type UserResponseData = {
    message: string;
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

    let deleted: any | null = null;
    const { userId } = req.body;

    if (userId) {
        deleted = await prisma.user.delete({
            where: {
                id: userId
            },
        })
    }

    res.status(200).json(
        deleted ? {
            "message": "User deleted"
        } : "Failed to delete user"
    );
}
