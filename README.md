Ticket Booking API - AWS DynamoDB + Lambda
------------------------------------------

✅ Features:
- Store and fetch train tickets using AWS DynamoDB
- API to get available tickets by "from", "to", and "date"
- Frontend integrated and deployed

📦 API Example:
GET /GetAvailableTicket?from=Chennai&to=Bangalore&date=2025-07-15

📂 DynamoDB Table:
- Partition Key: route_date (e.g., Chennai#Bangalore#2025-07-15)
- Sort Key: from_time
- Other fields: to_time, standard_price,plus_price, id, from, to, date

🛠️ Tech Used:
- AWS Lambda (Node.js)
- DynamoDB
- API Gateway
- Frontend (React)
