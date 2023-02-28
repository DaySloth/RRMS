// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../lib/db";

export default async function handler(req, res) {
  const { params } = req.query;
  switch (params[0]) {
    case "search":
      const result = await excuteQuery({
        query:
          "SELECT * FROM accounts WHERE `Account Name` LIKE " +
          `'%${params[1]}%'`,
      });
      res.status(200).json({ stores: result });

      break;
    default:
      // Nothing matches return error
      res.status(500);
      break;
  }
}
