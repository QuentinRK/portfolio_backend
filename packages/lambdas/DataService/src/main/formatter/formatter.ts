import { PromiseResult } from "aws-sdk/lib/request";
import {
  QueryOutput,
  GetItemOutput,
  AttributeMap,
} from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk";

export interface FormatResponse {
  name: string;
  description: string;
  link?: string;
}

export const formatter = (
  payload: PromiseResult<QueryOutput | GetItemOutput, AWSError>
): FormatResponse[] | FormatResponse => {
  if ("Items" in payload && payload.Items !== undefined) {
    return projectsFormat(payload["Items"]);
  }

  if ("Item" in payload && payload.Item !== undefined) {
    console.log(typeof payload);
    return bioFormat(payload.Item);
  }

  throw new Error("FormatErorr");
};

const projectsFormat = (payload: AttributeMap[]): FormatResponse[] => {
  let projects: FormatResponse[] = [];

  payload.forEach((project) => {
    projects.push({
      name: project.name["S"] as string,
      description: project.description["S"] as string,
      link: project.link["S"] as string,
    });
  });

  return projects;
};

const bioFormat = (payload: AttributeMap): FormatResponse => {
  return {
    name: payload.name["S"] as string,
    description: payload.description["S"] as string,
  };
};
