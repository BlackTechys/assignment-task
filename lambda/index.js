import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const { from, to, date } = event.queryStringParameters || {};

  if (!from || !to || !date) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required parameters: from, to, date",
      }),
    };
  }

  const route = `${from}#${to}`;

  try {
    const command = new QueryCommand({
      TableName: "ticket_routes_v2",
      KeyConditionExpression: "#pk = :pkValue AND begins_with(#sk, :skPrefix)",
      ExpressionAttributeNames: {
        "#pk": "route",
        "#sk": "route_date",
      },
      ExpressionAttributeValues: {
        ":pkValue": route,
        ":skPrefix": date,
      },
      ScanIndexForward: true,
    });

    const { Items } = await ddbDocClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tickets fetched successfully",
        count: Items.length,
        data: Items,
      }),
    };
  } catch (error) {
    console.error("Query failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch tickets",
        error: error.message,
      }),
    };
  }
};
