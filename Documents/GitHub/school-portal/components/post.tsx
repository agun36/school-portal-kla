import BlogPosts from "./BlogPost";
import { Card } from "./ui/card";

export default function Post() {
    return (
        <div className="p-4 mt-9">
            <Card>
                <BlogPosts post={{ title: "test", content: "test", author: "test", date: "test", image: "test", id: "test" }} />
            </Card>
        </div>
    )
}