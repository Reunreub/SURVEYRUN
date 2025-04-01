document.getElementById('surveyForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form values
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const gender = document.getElementById('gender').value;

  // Validate form data
  if (!email || !name || !age || !gender) {
    alert('Please fill out all fields.');
    return;
  }

  // Prepare data for Google Sheets
  const formData = {
    email,
    name,
    age,
    gender,
  };

  // Google Apps Script URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxu5ReOLDsQuE64FGWol_XXhjb7FOrrCks8i7hX7Z4SEezrN5Imn1hkj5M6Ss2PonyvNA/exec';

  try {
    // Send POST request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Response from server:', result);

      if (result.message === 'Success') {
        alert('Form submitted successfully!');
        document.getElementById('surveyForm').reset();
      } else {
        alert(`Error: ${result.message || 'Unknown error occurred.'}`);
      }
    } else {
      alert('Failed to submit the form. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Update button text based on mode
  const toggleButton = document.getElementById('darkModeToggle');
  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Light Mode';
  } else {
    toggleButton.textContent = 'Dark Mode';
  }
});