/* eslint-disable no-undef */
import { QueryOutput, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';
import Formatter, { throwFormatError } from '../../main/Formatter/formatter';
import projectsFormat from '../mocks/formattedProjects.json';
import bioFormat from '../mocks/formattedBio.json';
import projects from '../mocks/projects.json';
import bio from '../mocks/bio.json';

describe('Tests how payloads are formatted', () => {
  it('Tests formatter for projects', async () => {
    const payload: QueryOutput = projects;

    const result = Formatter(<PromiseResult<QueryOutput, AWSError>>payload);

    expect(result).toEqual(projectsFormat);
  });

  it('Tests formatter for bio', async () => {
    const payload: GetItemOutput = bio;

    const result = Formatter(<PromiseResult<GetItemOutput, AWSError>>payload);

    expect(result).toEqual(bioFormat);
  });

  it('Tests formatter error message', async () => {
    const t = () => {
      throwFormatError();
    };

    expect(t).toThrow(Error);
    expect(t).toThrow('Formatting Error');
  });
});
