// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import algoliasearch from "algoliasearch"


export default async function handler(req, res) {

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID, 
    process.env.ALGOLIA_ADMIN_KEY
  )
  const index = client.initIndex("video")
  const hits = await index.search(req.query.searchTerm)
  console.log('---->', hits)

  return res.status(200).json({ ...hits.hits })
}
