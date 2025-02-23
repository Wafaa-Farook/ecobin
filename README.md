# EcoBin
EcoBin is an innovative web-based platform designed to promote sustainable living and environmental responsibility. With the rising global concerns about waste management, carbon emissions, and resource conservation, EcoBin offers a comprehensive solution that empowers individuals to make eco-friendly choices effortlessly.

The platform integrates multiple features that address key aspects of environmental sustainability. The AI-powered Waste Sorter allows users to upload images of waste items, automatically classifying them into recyclable, non-recyclable, or compostable categories, ensuring proper disposal and reducing landfill contributions. The Carbon Footprint Calculator provides users with personalized estimates of their daily carbon emissions based on lifestyle inputs like transportation and energy usage. This feature not only highlights the user's environmental impact but also offers actionable suggestions to minimize their carbon footprint.

Additionally, the Recycling Locator leverages OpenStreetMap integration to help users find nearby recycling centers. This encourages responsible waste management by making recycling more accessible. The platform also includes an Eco Tips section, offering practical advice and daily habits to encourage sustainable living practices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment](#environment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#License)
- [Contact](#contact)

## Features
- **Waste Sorter:** Upload images of waste items, and let EcoBin’s AI-powered classifier automatically categorize them into recyclable, non-recyclable, organic and E-wastes. This helps you dispose of waste responsibly.It Supports various waste categories and provides suggestions for proper disposal methods.
- **Carbon Footprint Calculator:** Estimate your daily carbon emissions based on your lifestyle habits. Simply input your data for transportation, energy use, waste production, and more.
It calculates carbon footprint in kilograms of CO₂ equivalent (CO₂e) and visualizes your emissions with a pie chart.
EcoBin provides tailored suggestions to reduce your carbon output.
Categorizes your footprint level into:
    1. Safe Level: Minimal environmental impact.
    2. Moderate Level: Some adjustments recommended.
    3. Unsafe Level: Consider significant changes.
- **Recycling Locator :** Find nearby recycling centers effortlessly using integrated map functionality powered by OpenStreetMap.
- **Eco Tips:** Receive helpful, easy-to-implement tips for sustainable living.Daily eco-friendly habits and advice on reducing plastic, conserving water, and minimizing energy consumption.

## Installation

1. Clone the Repository

2. git clone https://github.com/anshidarinshii/ecobin.git
```bash
cd ecobin
```

3. Install Dependencies
 Run the following commands in the project directory:
```bash
npm install
```

4. Backend Setup
 Navigate to the backend folder:
```bash
cd backend
npm install
```
```bash
node server.js
```

5. Frontend Setup
In a new terminal window:
```bash
cd frontend
```
```bash
npm install
npm start
```

6.Firebase Configuration
Create a new Firebase project.
Replace the Firebase configuration object in your firebase.js file with your project’s credentials.

## Environment

1. Frontend: React.js, Material-UI (MUI)

2. Backend: Node.js, Express.js

3. Database: Firebase Realtime Database

4. Machine Learning: TensorFlow.js for waste classification

5. Mapping Service: OpenStreetMap API for locating recycling centers

## Usage

1. Upload & Sort Waste
- Go to the Waste Sorter section.
- Upload an image of your waste item.
- Get instant classification and disposal advice.

 2. Carbon Footprint Calculator
- Navigate to the Calculator page.
- Enter values for your daily activities (e.g., distance traveled, electricity usage).
- View your carbon footprint and get personalized suggestions.

3. Find Recycling Centers
- Access the Recycling Locator.
- Allow location access or input your city manually.
- Get directions to the nearest recycling facility.

4.Read Eco Tips
- Check out the Eco Tips section for daily green living advice.

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Submit a Pull Request.


## License

This project is licensed under the MIT License.


## Contact

If you have any questions or suggestions, feel free to reach out to the project maintainers:

Email - vvswathi63@gmail.com

anshidarinshii@gmail.com

wafaafarook@gmail.com








