import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';

export type UserResponseData = {
    user: {}
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        userId?: string;
        userName?: string;
    };
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    let user: any | null = null;

    const { userId, userName } = req.body;

    if (userId && !userName) {
        user = prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    if (userName && !userId) {
        user = prisma.user.findUnique({
            where: {
                userName: userName
            }
        })
    }

    res.status(200).json(
        user ? {
            user: user
        } : "Failed to find user."
    );

    // return res.status(200).json({
    //     message: "Success!"
    // })
}
