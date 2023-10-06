# Care Connect

**Care Connect** is a web application developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js) that serves as a virtual clinic for healthcare management. It caters to three types of users: Patients, Doctors, and Ordination Manager. The application offers various functionalities, including:

## Features

### User Authentication
- **Sign Up**: Users can create new accounts.
- **Login**: Registered users can log in securely.

### Doctor Directory
- **View Doctors**: Users can browse through the list of available doctors.
- **Clinic Description**: Information about the clinic is provided.

### Appointment Management
- **Appointment Scheduling**: Patients can schedule appointments.
- **Report Access**: Access and download medical reports.
- **QR Code Export**: Reports can be exported to the patient's email with QR codes.

### Doctor Features
- **Next Appointments**: Doctors can see their upcoming appointments.
- **Appointment Cancellation**: Doctors can cancel appointments.
- **Patient Records**: Doctors can view patient records.
- **Report Entry**: Doctors can add medical reports.
- **Profile Updates**: All users can update their profiles, including profile pictures.

### Application Manager Functions
- **Add Doctors**: Managers can add new doctors to the system.
- **Create Appointment Types**: Managers can define new types of appointments.
- **Price Adjustment**: Managers can adjust appointment prices.
- **Notifications**: All users receive notifications about discounts, changes in appointment times, or pricing.

## Libraries and Technologies

- Frontend:
  - HTML, CSS, Angular
  - Bootstrap for styling

- Backend:
  - TypeScript, Node.js
  - MongoDB for database management
  - Express.js for API development
  - Nodemailer for email functionality
  - Multer for handling file uploads
  - QRCode for generating QR codes
  - jsPDF for creating PDFs

## Installation and Usage

1. Clone the repository: `git clone https://github.com/your-username/Care-Connect.git`
2. Install dependencies: `npm install`
3. Start the MongoDB database and include .json files from database folder
4. Start the frontend: `ng serve`
5. Start the backend: `npm run serve`
