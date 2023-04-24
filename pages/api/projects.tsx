import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
	description: string;
	preview: string;
	url: string;
	git?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd(), "json");
	//Read the json data file data.json
	const fileContents = await fs.readFile(jsonDirectory + "/projects.json", "utf8");
	//Return the content of the data file in json format
	res.status(200).json(JSON.parse(fileContents));
}
