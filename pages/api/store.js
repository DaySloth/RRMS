// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../lib/db';

export default async function handler(req, res) {
  const result = await excuteQuery({
    query: "SELECT * FROM accounts WHERE `Account Name` LIKE '%1106%'"
  })

  result.forEach(element => {
    console.log(element['Account Name'])
  });

  res.status(200).json({ name: 'John Doe' })
}
