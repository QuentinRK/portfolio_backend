/* eslint-disable no-undef */
import * as AWS from 'aws-sdk-mock';
import { QueryOutput, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import Repository from '../../main/Repository/WebsiteDataRepository';
import projects from '../mocks/projects.json';
import bio from '../mocks/bio.json';

describe('Tests how payloads are formatted', () => {
  beforeAll(() => {
    AWS.mock('DynamoDB', 'getItem', bio);
    AWS.mock('DynamoDB', 'query', projects);
  });

  it('Tests Repository for bio', async () => {
    const repo: Repository = new Repository();
    const result: GetItemOutput = await repo.getBioData();

    if (result.Item) {
      const { length } = Object.keys(result.Item);
      expect(length).toBeGreaterThan(0);
    } else {
      throw new Error('Bio Not Found');
    }
  });

  it('Tests Repository for projects', async () => {
    const repo: Repository = new Repository();
    const result: QueryOutput = await repo.getProjectsData();
    if (result.Count) {
      expect(result.Count).toBeGreaterThan(0);
    } else {
      throw new Error('Projects Not Found');
    }
  });

  afterAll(() => {
    AWS.restore('DynamoDB');
  });
});
