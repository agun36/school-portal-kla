import { BlogPost } from "@/lib/dbType/dbType";
import dbJson from "@/lib/db.json"

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    return dbJson as BlogPost[]
};