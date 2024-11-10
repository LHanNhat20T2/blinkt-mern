const verifyEmailTemplate = ({ name, url }) => {
    return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .header {
            font-size: 24px;
            color: #333;
            font-weight: bold;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-top: 15px;
            line-height: 1.5;
          }
          .verify-button {
            background-color: #2711d1;
            color: black important;
            padding: 15px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
            display: inline-block;
          }
          .verify-button:hover {
           opacity: 0.5
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Hello, ${name}!</div>
          <div class="message">
            Thank you for registering with Binkeyit. To complete your registration, please click the button below to verify your email address:
          </div>
          <a href="${url}" class="verify-button">Verify Email</a>
          <div class="message">
            If you did not register for an account, please ignore this email.
          </div>
        </div>
      </body>
    </html>
    `;
};

export default verifyEmailTemplate;
