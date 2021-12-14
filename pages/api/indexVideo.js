import algoliasearch from "algoliasearch"

export default function handler(req, res) {
  
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
  const index = client.initIndex("video")

  index
  .saveObjects([
    { 
      objectID: req.body._id,
      ...req.body 
    }
  ])
  .then(({ objectIDs }) => {
    console.log(objectIDs);
  })
  .catch(err => {
    console.log(err);
  });

  res.status(200).json({ name: 'Index Video' })
}
