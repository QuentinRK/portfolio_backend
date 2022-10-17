/* eslint-disable no-undef */
import { QueryOutput, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';
import Formatter, { throwFormatError } from '../../../../Utils/Formatter/Formatter';
import projectsFormat from '../mocks/formattedProjects.json';
import bioFormat from '../mocks/formattedBio.json';
import projects from '../mocks/projects.json';
import workHistory from '../mocks/workHistory.json';
import formattedWorkHistory from '../mocks/formattedWorkHistory.json';
import bio from '../mocks/bio.json';

describe('Tests how payloads are formatted', () => {
  it('Tests formatter for projects', async () => {
    const payload: QueryOutput = projects;

    const result = Formatter(<PromiseResult<QueryOutput, AWSError>>payload, 'projects');

    expect(result).toEqual(projectsFormat);
  });

  it('Tests formatter for work history', async () => {
    const payload: QueryOutput = workHistory;

    const result = Formatter(<PromiseResult<QueryOutput, AWSError>>payload, 'work');

    expect(result).toEqual(formattedWorkHistory);
  });

  it('Tests formatter for bio', async () => {
    const payload: GetItemOutput = bio;

    const result = Formatter(<PromiseResult<GetItemOutput, AWSError>>payload, 'bio');

    expect(result).toEqual(bioFormat);
  });

  it('Tests formatter error message', async () => {
    const t = () => {
      throwFormatError();
    };

    expect(t).toThrow(Error);
    expect(t).toThrow('Formatting Error - No Items Returned From DB');
  });
});
