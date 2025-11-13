// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tracking-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const clearDataButton = document.getElementById('clear-data');

    // Function to save data to Local Storage
    const saveProgress = (goal, weight) => {
        const userData = {
            goal: goal,
            weight: weight,
            timestamp: new Date().toLocaleString()
        };
        // Use JSON.stringify to store the object as a string
        localStorage.setItem('fitnessTrackerData', JSON.stringify(userData));
        displayWelcomeMessage(userData);
    };

    // Function to load data from Local Storage
    const loadProgress = () => {
        // Use JSON.parse to convert the string back into an object
        const storedData = localStorage.getItem('fitnessTrackerData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        return null;
    };

    // Function to display the personalized welcome message and populate the form
    const displayWelcomeMessage = (data) => {
        if (data) {
            // Populate form fields with stored data
            document.getElementById('goal').value = data.goal;
            document.getElementById('weight').value = data.weight;

            // Generate the message based on the goal
            let goalText = '';
            switch(data.goal) {
                case 'weight_loss':
                    goalText = 'weight loss';
                    break;
                case 'muscle_gain':
                    goalText = 'muscle gain';
                    break;
                case 'general_health':
                    goalText = 'general health';
                    break;
            }

            welcomeMessage.innerHTML = `Welcome back! Your goal is currently set for ${goalText} (Weight: ${data.weight} lbs). Last updated: ${data.timestamp}.`;
            welcomeMessage.classList.remove('d-none');
            form.querySelector('button[type="submit"]').textContent = 'Update Progress';
        } else {
            // If no data is found, show the default form state
            welcomeMessage.classList.add('d-none');
            form.querySelector('button[type="submit"]').textContent = 'Save Progress';
        }
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const weight = document.getElementById('weight').value;

        if (goal && weight) {
            saveProgress(goal, weight);
            alert('Your progress has been saved!');
        } else {
            alert('Please select a goal and enter your weight.');
        }
    });

    // Handle clearing data
    clearDataButton.addEventListener('click', () => {
        localStorage.removeItem('fitnessTrackerData');
        alert('Your saved data has been cleared.');
        // Reset the form and message display
        form.reset();
        displayWelcomeMessage(null);
    });

    // Load and display data on page load
    const initialData = loadProgress();
    displayWelcomeMessage(initialData);

});
