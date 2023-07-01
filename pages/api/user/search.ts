import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next"; 

export type UserResponseData = {
    users: []
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        search: string;
        skip?: number;
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UserResponseData | string>) {

    const session = await getServerSession(req, res, authOptions);

    if(!session || !session?.user?.id) {
        return res.status(401).json("Unauthorized");
    }

    let users: any | null = null;
    const { search, skip } = req.body;

    if (search) {
        users = await prisma.user.findMany({
            where: {
                userName: {
                    search: search.split(" ").join(" & ")
                }
            },
            skip: skip || 0
        })
    }

    res.status(200).json(
        users ? {
            users: users
        } : "No users found."
    );
}
