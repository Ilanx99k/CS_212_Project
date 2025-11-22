// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tracking-form');
    const planResult = document.getElementById('plan-result');
    const clearDataButton = document.getElementById('clear-data');

    if (!form) return;

    // DOM Elements
    const recDietTitle = document.getElementById('rec-diet-title');
    const recDietDesc = document.getElementById('rec-diet-desc');
    const recDietImg = document.getElementById('rec-diet-img');

    const recWorkoutTitle = document.getElementById('rec-workout-title');
    const recWorkoutDesc = document.getElementById('rec-workout-desc');
    const recWorkoutImg = document.getElementById('rec-workout-img');
    
    const welcomeText = document.getElementById('welcome-text');

    // Save Data
    const saveProgress = (goal, weight) => {
        const userData = {
            goal: goal,
            weight: weight,
            timestamp: new Date().toLocaleDateString()
        };
        localStorage.setItem('fitnessTrackerData', JSON.stringify(userData));
        displayPersonalizedPlan(userData);
    };

    // Load Data
    const loadProgress = () => {
        const storedData = localStorage.getItem('fitnessTrackerData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        return null;
    };

    // Update UI with Images
    const displayPersonalizedPlan = (data) => {
        if (!data) {
            planResult.classList.add('d-none');
            return;
        }

        document.getElementById('goal').value = data.goal;
        document.getElementById('weight').value = data.weight;
        planResult.classList.remove('d-none');
        
        switch(data.goal) {
            case 'muscle_gain':
                // MUSCLE GAIN: Animal Based + PPL
                recDietTitle.innerText = "Animal-Based / High Protein";
                recDietDesc.innerText = "Focus on protein-heavy foods like lean beef, eggs, and dairy to support muscle repair.";
                // Image: Steak/Meat
                recDietImg.src = "https://images.unsplash.com/photo-1607116176195-b81b1f41f536?q=80&w=1000&auto=format&fit=crop"; 
                
                recWorkoutTitle.innerText = "Push / Pull / Legs (6 Day)";
                recWorkoutDesc.innerText = "High-frequency volume. Targets muscle groups twice a week for maximum hypertrophy.";
                // Image: Heavy Weights/Dumbbells
                recWorkoutImg.src = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop";
                break;

            case 'weight_loss':
                // WEIGHT LOSS: Mediterranean + Full Body
                recDietTitle.innerText = "Mediterranean Diet";
                recDietDesc.innerText = "Low caloric density but high nutrients. Rich in fruits, veggies, and fish.";
                // Image: Salad/Fish
                recDietImg.src = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop";

                recWorkoutTitle.innerText = "Full Body (2 Day)";
                recWorkoutDesc.innerText = "Focus on compound movements to burn calories efficiently without needing daily gym trips.";
                // Image: Yoga/Bodyweight
                recWorkoutImg.src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop";
                break;

            case 'general_health':
                // GENERAL HEALTH: Paleo + Upper/Lower
                recDietTitle.innerText = "Paleo Diet";
                recDietDesc.innerText = "Focuses on unprocessed foods like meat, fish, fruits, and nuts. Cuts out processed ingredients for better vitality.";
                // Image: Paleo (Meat + Veggies + Nuts)
                recDietImg.src = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop";

                recWorkoutTitle.innerText = "Upper / Lower (4 Day)";
                recWorkoutDesc.innerText = "The perfect balance of intensity and recovery. Great for sustaining long-term health.";
                // Image: Treadmill/Cardio
                recWorkoutImg.src = "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop";
                break;
        }

        welcomeText.innerText = `Welcome back! Your current weight is ${data.weight} lbs. (Last updated: ${data.timestamp})`;
        form.querySelector('button[type="submit"]').innerText = 'Update My Plan';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const weight = document.getElementById('weight').value;

        if (goal && weight) {
            saveProgress(goal, weight);
        } else {
            alert('Please select a goal and enter your weight.');
        }
    });

    clearDataButton.addEventListener('click', () => {
        localStorage.removeItem('fitnessTrackerData');
        form.reset();
        planResult.classList.add('d-none');
        form.querySelector('button[type="submit"]').innerText = 'GENERATE MY PLAN';
    });

    const initialData = loadProgress();
    displayPersonalizedPlan(initialData);
});
