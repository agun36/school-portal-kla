"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchBlogPosts } from './FetchBlog';
import { BlogPost } from '@/lib/dbType/dbType';
import BlogPosts from './BlogPost';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPosts = async () => {
            const blogPosts = await fetchBlogPosts();
            setPosts(blogPosts);
            setLoading(false);
        };
        getPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-9 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
            {posts.map((post) => (
                <BlogPosts key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Blog;