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

function formatTime(date) {
  return date.toTimeString().slice(0, 5); 
}

function getTimeObject(baseDate, hourOffset = 0, minuteOffset = 0) {
  const newDate = new Date(baseDate);
  newDate.setHours(newDate.getHours() + hourOffset);
  newDate.setMinutes(newDate.getMinutes() + minuteOffset);
  return newDate;
}

function generateTickets(from, to, startDate, dayCount, ticketsPerDay = 4) {
  const tickets = [];
  for (let day = 0; day < dayCount; day++) {
    const baseDate = new Date(startDate);
    baseDate.setDate(baseDate.getDate() + day);
    const datePart = formatDate(baseDate); 
    const route = `${from}#${to}`;

    for (let slot = 0; slot < ticketsPerDay; slot++) {
      const fromTimeObj = getTimeObject(baseDate, 6 + slot * 2);
      const toTimeObj = getTimeObject(fromTimeObj, 2);

      const from_time = fromTimeObj.toISOString();
      const to_time = toTimeObj.toISOString();
      const timePart = formatTime(fromTimeObj); 

      const route_date = `${datePart}#${timePart}`; 

      const standard_price = 150 + slot * 10 + day * 5;
      const plus_price = standard_price + 50;

      tickets.push({
        id: `${route}_${route_date}`,
        route,          
        route_date,      
        from,
        to,
        date: datePart,  
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
        Item: item,
      },
    }));
    chunks.push(chunk);
  }

  try {
    for (const putRequests of chunks) {
      const command = new BatchWriteCommand({
        RequestItems: {
          ticket_routes_v2: putRequests,
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
