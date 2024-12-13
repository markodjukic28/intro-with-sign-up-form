// Select all necessary fields
const fields = [
  { id: 'firstName', errorClass: '.firstName-error' },
  { id: 'lastName', errorClass: '.lastName-error' },
  { id: 'email', errorClass: '.email-error' },
  { id: 'password', errorClass: '.password-error' }
];

const btnSubmit = document.querySelector('.btn-submit');

// Timers for resetting fields
const resetTimers = {};

// Add event listener to the submit button
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  fields.forEach(({ id, errorClass }) => {
    validateField(id, errorClass);
  });
});

// Function to validate individual fields
function validateField(fieldId, errorClass) {
  const field = document.getElementById(fieldId);
  const errorElement = document.querySelector(errorClass);
  const errorImg = field.nextElementSibling; // Assuming the error icon is the next sibling
  let errorMessage = '';
  let isValid = true;

  // Check field value and set error messages
  if (field.value.trim() === '') {
    errorMessage = `${capitalize(fieldId)} cannot be empty`;
    isValid = false;
  } else if (fieldId === 'email' && !isValidEmail(field.value)) {
    errorMessage = 'Looks like this is not an email';
    isValid = false;
  } else if (fieldId === 'password' && field.value.length < 8) {
    errorMessage = 'Password must be at least 8 characters';
    isValid = false;
  }

  // Show error message and apply styles
  errorElement.textContent = errorMessage;
  errorElement.style.color = isValid ? '' : 'hsl(0, 100%, 74%)';
  field.style.borderColor = isValid ? '' : 'hsl(0, 100%, 74%)';
  errorImg.style.display = isValid ? 'none' : 'inline';

  // Reset field styles and messages after 5 seconds
  clearTimeout(resetTimers[fieldId]); // Clear any existing timeout for this field
  if (!isValid) {
    resetTimers[fieldId] = setTimeout(() => {
      errorElement.textContent = '';
      field.style.borderColor = 'lightgray';
      errorImg.style.display = 'none';
      field.placeholder = capitalize(fieldId);
    }, 5000);
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
