import { Construct } from "@aws-cdk/core";
import { IGrantable } from "@aws-cdk/aws-iam";
import { Table, AttributeType, BillingMode } from "@aws-cdk/aws-dynamodb";
import { TableNames } from "./TableNames";

export class BackendDatabase extends Construct {
  private websiteDataTable: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.websiteDataTable = new Table(this, TableNames.WebsiteData, {
      partitionKey: { name: id, type: AttributeType.STRING },
      billingMode: BillingMode.PROVISIONED,
      readCapacity: 25,
      writeCapacity: 25,
      tableName: TableNames.WebsiteData,
    });
  }

  allowCrud(grantee: IGrantable) {
    this.websiteDataTable.grantReadWriteData(grantee);
  }
}
