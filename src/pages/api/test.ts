import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:NextRequest, res:any) {
  
  return res.status(200).json({a: 'b'});
}