import { NextApiRequest, NextApiResponse } from "next";
const data = require("../../db").data;

const CreateHandler = (
  { body: { author, title, url } }: NextApiRequest,
  res: NextApiResponse
) => {
  data.push({
    author,
    title,
    url,
  });
  res.status(200).send("OK");
};

export default CreateHandler;
