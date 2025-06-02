const { SitemapStream, streamToPromise } = require('sitemap')
const { writeFileSync } = require('fs')

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://mystdetailing.ca' })

  const urls = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/warranty', changefreq: 'monthly', priority: 0.0 },
    { url: '/shipping', changefreq: 'monthly', priority: 0.0 },
    { url: '/refund', changefreq: 'monthly', priority: 0.0 },
    { url: '/terms', changefreq: 'monthly', priority: 0.0 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.0 },
    { url: '/buy', changefreq: 'weekly', priority: 0.0 },
    { url: '/checkout', changefreq: 'weekly', priority: 0.0 },
    { url: '/checkout/success', changefreq: 'weekly', priority: 0.0 },
    { url: '/track-order', changefreq: 'weekly', priority: 0.0 }
  ]


  urls.forEach((page) => sitemap.write(page))
  sitemap.end()

  const xml = await streamToPromise(sitemap)
  writeFileSync('./public/sitemap.xml', xml.toString())
  console.log('Sitemap generated at public/sitemap.xml')
}

generateSitemap()
