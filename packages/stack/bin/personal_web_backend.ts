#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import PersonalWebBackendStack from '../backend_api_stack';

const app = new cdk.App();
new PersonalWebBackendStack(app, 'PersonalWebBackendStack', {});
