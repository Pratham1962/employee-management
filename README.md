# Employee Management System

## Live Demo
You can view the live application at the following link:

https://employee-management-iota-sage.vercel.app/

## Description

This is an **Employee Management System** built with **React.js** and **Material UI**. The system allows administrators to log in, manage users (view, edit, delete), and receive notifications for successful or failed operations. The application integrates with the `reqres.in` API to simulate backend operations.

## Features

- **Secure Login**: Authentication system with credential validation
- **User Dashboard**: Admin interface for viewing and managing user data
- **User Management**: Full CRUD operations (create, read, update, delete)
- **Real-time Notifications**: Snackbar alerts for operation success/failure
- **Pagination**: Support for displaying users with configurable page size
- **Responsive Design**: Mobile-friendly interface built with Material UI

## Technologies Used

- **React.js**: Frontend framework
- **Material UI**: Component library for consistent styling
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests
- **React Hooks**: State and lifecycle management

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
/src
  /components
    /EditUserDialog.js       # Dialog for editing user details
    /Dashboard.js            # Main dashboard with user management
    /UserTable.js            # Table displaying the list of users
  /services
    /userService.js          # API calls related to user data
  /App.js                    # Main entry point of the application
  /index.js                  # ReactDOM rendering
  /styles
    /dashboard.css           # Custom styles for dashboard
  /assets
    /logo.svg                # Project logo
```

## Dependencies

- `react`: UI library
- `@mui/material`: Material UI components
- `axios`: API request handling
- `react-router-dom`: Routing and navigation
- `react-scripts`: Build scripts and configuration

## Assumptions & Considerations

- The application uses **reqres.in** as a mock API service. In a production environment, these endpoints would be replaced with a real backend.
- Login functionality uses simulated authentication. In production, this would implement proper security practices (JWT, OAuth, etc.).
- The dashboard is configured with default pagination of 5 rows per page, which can be adjusted by the user.
- Material UI is used to ensure responsive design across different screen sizes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style patterns and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## GitHub Repository

https://github.com/Pratham1962/employee-management.git