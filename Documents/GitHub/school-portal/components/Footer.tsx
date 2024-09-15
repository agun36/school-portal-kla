import * as React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Contact Information */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2 text-teal-600">Contact Us</h2>
                        <p className="text-gray-400">123 School Street, City, State, 12345</p>
                        <p className="text-gray-400">Phone: (123) 456-7890</p>
                        <p className="text-gray-400">Email: info@school.edu</p>
                    </div>
                    {/* Social Media Links */}
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.325-.597 1.325-1.324V1.325C24 .597 23.403 0 22.675 0z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149 4.916 4.916 0 003.195 9.723a4.902 4.902 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.923 4.923 0 004.6 3.417A9.867 9.867 0 010 21.543a13.905 13.905 0 007.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.012 7.052.07 5.773.128 4.548.334 3.515 1.367 2.482 2.4 2.276 3.625 2.218 4.905.012 8.332 0 8.756 0 12s.012 3.668.07 4.948c.058 1.28.264 2.505 1.297 3.538 1.033 1.033 2.258 1.239 3.538 1.297 1.28.058 1.704.07 4.948.07s3.668-.012 4.948-.07c1.28-.058 2.505-.264 3.538-1.297 1.033-1.033 1.239-2.258 1.297-3.538.058-1.28.07-1.704.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.264-2.505-1.297-3.538-1.033-1.033-2.258-1.239-3.538-1.297-1.28-.058-1.704-.07-4.948-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="mt-4 text-center text-gray-400">
                    &copy; {new Date().getFullYear()} School Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;