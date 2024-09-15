import * as React from 'react';
import { BlogPost } from '@/lib/dbType/dbType';

interface BlogPostProps {
    post: BlogPost;
}

const BlogPosts: React.FC<BlogPostProps> = ({ post }) => {
    return (
        <div className="p-4 md:p-6 lg:p-9 bg-white rounded-lg shadow-md">
            <div className="p-2 md:p-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-teal-600">{post.title}</h2>
                <small className="text-gray-600 mb-2 md:mb-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</small>
                <p className="text-gray-800">{post.content}</p>
            </div>
        </div>
    );
};

export default BlogPosts;