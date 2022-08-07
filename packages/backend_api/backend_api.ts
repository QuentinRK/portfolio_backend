import { Construct } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Cors, RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import iam = require('@aws-cdk/aws-iam');

export default class BackendApi extends Construct {
  private getHandler: Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const api = new RestApi(this, 'backend_api', {
      restApiName: 'Backend',
      defaultCorsPreflightOptions: {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'X-Amz-Data'],
      },
    });

    const getWebsiteDataLambda = new Function(this, 'get-website-data-lambda', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'data.default',
      code: Code.fromAsset('./dist'),
    });

    const getContactLambda = new Function(this, 'get-contact-lambda', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'email.default',
      code: Code.fromAsset('./dist'),
    });

    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ses:SendEmail', 'ses:sendRawEmail', 'ses:SendTemplatedEmail'],
      resources: ['*'],
    });

    getContactLambda.addToRolePolicy(policyStatement);

    const aboutMe = api.root.addResource('about-me');
    const projects = api.root.addResource('projects');
    const contact = api.root.addResource('contact');

    aboutMe.addMethod('GET', new LambdaIntegration(getWebsiteDataLambda));
    projects.addMethod('GET', new LambdaIntegration(getWebsiteDataLambda));
    contact.addMethod('POST', new LambdaIntegration(getContactLambda));

    this.getHandler = getWebsiteDataLambda;
  }

  get handler(): Function {
    return this.getHandler;
  }
}
