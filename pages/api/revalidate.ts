import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

  if(req.query.key !== process.env.NEXT_PUBLIC_REVALIDATE_KEY){
    return res.status(401).json({message: 'Invalid token ❌'})
  }

  try {
    await res.unstable_revalidate('/')
    return res.status(200).json({message: 'Revalidate successful'})
  } catch (error) {
    return res.status(500).json({message: 'Revalidate failed'})
  }
}
