"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Blog data array (replicates your 4 cards)
const blogs = [
  {
    title: "Best Flooring for Modern Modern kitchen",
    img: "/images/blog/blogThumb1_1.jpg",
    day: "09",
    month: "SEP",
    author: "Admin",
    category: "Tiels",
  },
  {
    title: "How to Make Your House Look High Wood Flooring",
    img: "/images/blog/blogThumb1_2.jpg",
    day: "12",
    month: "SEP",
    author: "Admin",
    category: "Interior",
  },
  {
    title: "Why choose plank over other flooring types?",
    img: "/images/blog/blogThumb1_3.jpg",
    day: "17",
    month: "SEP",
    author: "Admin",
    category: "Tiels",
  },
  {
    title: "Best Tiels for Modern Modern kitchen",
    img: "/images/blog/blogThumb1_4.jpg",
    day: "27",
    month: "SEP",
    author: "Admin",
    category: "Floor",
  },
];

export default function NewsRoom() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="section-title text-center mb-20 max-w-xl mx-auto">
          <motion.div
            className="subtitle flex justify-center items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/images/shape/titleShape1_1.png" width={24} height={24} alt="icon" />
            NEWS ROOM
            <img src="/images/shape/titleShape1_2.png" width={24} height={24} alt="icon" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            View the Most Recent Articles on the Blog
          </motion.h2>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              className="blog-card-items style1 overflow-hidden rounded shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Blog Images */}
              <div className="relative w-full h-64">
                <Image
                  src={blog.img}
                  alt="blog thumbnail"
                  fill
                  className="object-cover"
                />
                <Image
                  src={blog.img}
                  alt="blog thumbnail overlay"
                  fill
                  className="object-cover absolute top-0 left-0 opacity-0 hover:opacity-25 transition-opacity duration-300"
                />
              </div>

              {/* Blog Meta */}
              <div className="flex justify-center gap-2 mt-2 text-sm font-semibold text-[var(--primary)]">
                <div>{blog.day}</div>
                <div>{blog.month}</div>
              </div>

              {/* Blog Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  <a href="/blog-details" className="hover:text-[var(--primary)] transition-colors">
                    {blog.title}
                  </a>
                </h3>

                <ul className="flex gap-4 text-sm text-gray-600">
                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d="M14.5442 5.19275C14.5442 7.69093 12.4996 9.7355 10.0014 9.7355C7.50327 9.7355 5.45869 7.69093 5.45869 5.19275C5.45869 2.69457 7.50323 0.65 10.0014 0.65C12.4996 0.65 14.5442 2.69458 14.5442 5.19275Z" stroke="#C7844F" strokeWidth="1.3"></path>
                      <path d="M18.265 14.6706C18.1058 14.9458 17.9247 15.2073 17.7176 15.4766L17.7174 15.4765L17.7095 15.4873C17.421 15.8788 17.0852 16.2373 16.7301 16.5924C16.4332 16.8892 16.0939 17.186 15.7574 17.4385C14.0801 18.6911 12.0628 19.3499 9.97879 19.3499C7.89901 19.3499 5.88571 18.6938 4.21041 17.4461C3.84652 17.1504 3.51432 16.8792 3.22751 16.5924L3.22054 16.5854L3.21337 16.5787C2.85728 16.2436 2.54303 15.8877 2.2481 15.4874L2.24812 15.4873L2.24478 15.4829C2.06257 15.24 1.87385 14.9756 1.71984 14.7169C1.83683 14.4559 1.98519 14.1847 2.14586 13.9526L2.14597 13.9527L2.15349 13.9413C3.07049 12.5556 4.5377 11.6388 6.16707 11.4148L6.18665 11.4121L6.20603 11.4082C6.23151 11.4031 6.29559 11.4117 6.34612 11.4496L6.34611 11.4496L6.35012 11.4525C7.41715 12.2401 8.68694 12.6453 10.0014 12.6453C11.3159 12.6453 12.5857 12.2401 13.6528 11.4525L13.6528 11.4525L13.6568 11.4496C13.6722 11.438 13.741 11.408 13.8498 11.4167C15.4695 11.6435 16.9128 12.5568 17.8531 13.9468L17.853 13.9469L17.857 13.9526C18.0172 14.1839 18.1563 14.4231 18.265 14.6706Z" stroke="#C7844F" strokeWidth="1.3"></path>
                    </svg>
                    {blog.author}
                  </li>
                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#C7844F" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10"></circle>
                    </svg>
                    {blog.category}
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}