"use server";

// This function runs on the server!
export async function submitContactForm(prevState, formData) {
  // 1. Get raw data
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // 2. Simple Server-Side Validation
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters."];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email address."];
  }
  if (!message || message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters."];
  }

  // If there are errors, return them to the client
  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation failed.",
      errors: errors,
      success: false,
    };
  }

  // 3. Simulate Database/Email Delay (e.g., waiting for API)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 4. Success!
  console.log(`Server received: ${name}, ${email}, ${subject}`);

  return {
    message: "Message sent successfully! We will get back to you soon.",
    errors: {},
    success: true,
  };
}
