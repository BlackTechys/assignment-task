import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

function formatDate(date) {
  return date.toLocaleDateString("en-CA");
}

function getISOTime(baseDate, hourOffset = 0, minuteOffset = 0) {
  const newDate = new Date(baseDate);
  newDate.setHours(newDate.getHours() + hourOffset);
  newDate.setMinutes(newDate.getMinutes() + minuteOffset);
  return newDate.toISOString();
}

function generateTickets(from, to, startDate, dayCount, ticketsPerDay = 4) {
  const tickets = [];
  for (let day = 0; day < dayCount; day++) {
    const baseDate = new Date(startDate);
    baseDate.setDate(baseDate.getDate() + day);
    const date = formatDate(baseDate);

    for (let slot = 0; slot < ticketsPerDay; slot++) {
      const from_time = getISOTime(baseDate, 6 + slot * 2); 
      const to_time = getISOTime(new Date(from_time), 2); 

      const standard_price = 150 + slot * 10 + day * 5; 
      const plus_price = standard_price + 50;

      tickets.push({
        route_date: `${from}#${to}#${date}`,
        from,
        to,
        date,
        from_time,
        to_time,
        standard_price,
        plus_price,
      });
    }
  }
  return tickets;
}


const defaultTickets = [
  ...generateTickets("Chennai", "Bangalore", new Date(), 5, 4),
  ...generateTickets("London", "Paris", new Date(), 5, 4),
  ...generateTickets("Paris", "London", new Date(), 5, 4),
];


export const handler = async () => {
  const batchSize = 25;
  const chunks = [];

  for (let i = 0; i < defaultTickets.length; i += batchSize) {
    const chunk = defaultTickets.slice(i, i + batchSize).map((item) => ({
      PutRequest: {
        Item: {
          id: `${item.route_date}_${item.from_time}`,
          ...item,
        },
      },
    }));
    chunks.push(chunk);
  }

  try {
    for (const putRequests of chunks) {
      const command = new BatchWriteCommand({
        RequestItems: {
          ticket_routes: putRequests,
        },
      });
      await ddbDocClient.send(command);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tickets inserted successfully.",
        insertedCount: defaultTickets.length,
      }),
    };
  } catch (error) {
    console.error("Error inserting tickets:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to insert tickets.",
        error: error.message,
      }),
    };
  }
};
