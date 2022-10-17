import { PromiseResult } from 'aws-sdk/lib/request';
import { QueryOutput, GetItemOutput, AttributeMap } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { FormatResponse, WorkHistoryInterface } from '../Interfaces/FormatterInterface';
import { Email } from '../Interfaces/EmailInterface';

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

export const workFormatter = (payload: AttributeMap[]): WorkHistoryInterface[] => {
  const workResponse: WorkHistoryInterface[] = [];
  let orderNo = 0;

  payload.forEach((work) => {
    const currentOrderNo = parseInt(work.orderNo.N as string, 10);

    const workHistory = {
      orderNo: currentOrderNo,
      name: work.name.S as string,
      description: work.description.S as string,
      role: work.role.S as string,
      location: work.location.S as string,
      date: work.date.S as string,
    };

    if (currentOrderNo > orderNo) {
      workResponse.push(workHistory);
    } else {
      workResponse.unshift(workHistory);
    }

    orderNo = currentOrderNo;
  });

  return workResponse;
};

export const throwFormatError = (msg: string = 'No Items Returned From DB'): Error => {
  throw new Error(`Formatting Error - ${msg}`);
};

export const emailFormatter = ({ name, email, message }: Email) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `Received an Email\n👤: ${name} \n✉️: ${email} \n📝: ${message}`;

export default (
  payload: PromiseResult<QueryOutput | GetItemOutput, AWSError>,
  type: string,
): FormatResponse[] | FormatResponse | Error => {
  if ('Items' in payload) {
    switch (type) {
      case 'work':
        if (payload.Items !== undefined) {
          return workFormatter(payload.Items);
        }
        break;
      case 'projects':
        if (payload.Items !== undefined) {
          return projectsFormat(payload.Items);
        }
        break;

      default:
        break;
    }
  }

  if ('Item' in payload && payload.Item !== undefined) {
    return bioFormat(payload.Item);
  }

  return throwFormatError();
};
