Ticket Booking API - AWS DynamoDB + Lambda
------------------------------------------

✅ Features:
- Store and fetch train tickets using AWS DynamoDB
- API to get available tickets by "from", "to", and "date"

📦 API Example:
GET /GetAvailableTicket?from=Chennai&to=Bangalore&date=2025-07-15


📂 DynamoDB Table: ticket_routes_v2
- Partition Key: route (e.g., Chennai#Bangalore)
- Sort Key: route_date (e.g., 2025-07-15T06:00:00Z)
- Other fields: to_time, standard_price,plus_price, id, from, to, date

🛠️ Tech Used:
- AWS Lambda (Node.js)
- DynamoDB
- API Gateway
- Frontend (React)
