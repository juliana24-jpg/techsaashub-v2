"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getCategoryName } from "@/lib/constants";
import type { BlogPostSummary } from "@/lib/blog-data";

interface LatestBlogPostsSectionProps {
  posts: BlogPostSummary[];
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative mx-auto mt-12 flex max-w-xl flex-col items-center px-6 py-14 text-center"
    >
      <div className="glass-edge" aria-hidden="true" />
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <PenLine className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
        First articles are in the works
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We&rsquo;re writing the first round of guides and tool deep-dives. Subscribe below and
        we&rsquo;ll let you know the moment they&rsquo;re live.
      </p>
      <a
        href="#newsletter"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
      >
        Get notified at launch
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </motion.div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LatestBlogPostsSection({ posts }: LatestBlogPostsSectionProps) {
  return (
    <section aria-labelledby="latest-posts-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="latest-posts-heading"
          eyebrow="From the blog"
          title="Latest articles"
          description="Sharp, no-fluff writing on the tools, tactics and trends behind modern SaaS."
        />

        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="glass group flex h-full flex-col overflow-hidden"
                  >
                    <div className="glass-edge" aria-hidden="true" />
                    {post.coverImage && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <Badge variant="secondary" className="w-fit">
                        {getCategoryName(post.category)}
                      </Badge>
                      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.author.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {post.readingTimeMinutes} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              >
                Read all articles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
