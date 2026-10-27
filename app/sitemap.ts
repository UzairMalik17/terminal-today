import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
    }))

  const currentDate = new Date().toISOString()

  const routes = [
    {
      url: `${siteUrl}/`,
      lastModified: currentDate,
    },
    ...['blog', 'tags', 'about'].map((route) => ({
      url: `${siteUrl}/${route}/`,
      lastModified: currentDate,
    })),
  ]

  return [...routes, ...blogRoutes]
}
