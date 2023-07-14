import { NextApiRequest, NextApiResponse } from "next";

const ID_LEN = 5;

function makeid(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  res.status(200).json({ id: makeid(ID_LEN) });
}