import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { BackendDatabase } from '../backenddb/backend-database';
import { BackendApi } from '../backend_api/backend_api';

export default class PersonalWebBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const db = new BackendDatabase(this, 'BackendDatabase');
    const api = new BackendApi(this, 'BackendApi');

    db.allowCrud(api.handler);
  }
}
