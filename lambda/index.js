import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const from = event.queryStringParameters?.from;
  const to = event.queryStringParameters?.to;
  const date = event.queryStringParameters?.date;

  if (!from || !to || !date) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required query parameters: from, to, and date",
      }),
    };
  }

  const route_date = `${from}#${to}#${date}`;

  try {
    const command = new QueryCommand({
      TableName: "ticket_routes",
      KeyConditionExpression: "route_date = :routeDate",
      ExpressionAttributeValues: {
        ":routeDate": route_date,
      },
      ScanIndexForward: true
    });

    const response = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error("Query error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
