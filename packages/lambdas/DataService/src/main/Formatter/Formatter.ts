import { PromiseResult } from 'aws-sdk/lib/request';
import {
  QueryOutput,
  GetItemOutput,
  AttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { FormatResponse } from '../Interfaces/FormatterInterface';

const projectsFormat = (payload: AttributeMap[]): FormatResponse[] => {
  const projects: FormatResponse[] = [];

  payload.forEach((project) => {
    projects.push({
      name: project.name.S as string,
      description: project.description.S as string,
      link: project.link.S as string,
    });
  });

  return projects;
};

const bioFormat = (payload: AttributeMap): FormatResponse => ({
  name: payload.name.S as string,
  description: payload.description.S as string,
});

export const throwFormatError = (): Error => {
  throw new Error('Formatting Error');
};

export default (
  payload: PromiseResult<QueryOutput | GetItemOutput, AWSError>,
): FormatResponse[] | FormatResponse | Error => {
  if ('Items' in payload && payload.Items !== undefined) {
    return projectsFormat(payload.Items);
  }

  if ('Item' in payload && payload.Item !== undefined) {
    return bioFormat(payload.Item);
  }

  return throwFormatError();
};
