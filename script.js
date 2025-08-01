// function updatePrice() {
//   const category = document.getElementById("category").value;
//   const priceMap = {
//     "Student (Single)": 25,
//     "Student Couple": 40,
//     "Working (Single)": 40,
//     "Working Couple": 60,
//     "Family Membership": 75,
//   };

//   const price = priceMap[category] || 0;
//   document.getElementById(
//     "priceDisplay"
//   ).innerText = `Membership Fee: $${price}`;
// }

function updatePrice() {
  const category = document.getElementById("category").value;
  const priceMap = {
    "Student (Single)": 25,
    "Student Couple": 40,
    "Working (Single)": 40,
    "Working Couple": 60,
    "Family Membership": 75,
  };

  const price = priceMap[category] || 0;
  document.getElementById(
    "priceDisplay"
  ).innerText = `Membership Fee: $${price}`;

  renderMemberInputs(category);
}

function renderMemberInputs(category) {
  const container = document.getElementById("memberInputs");
  container.innerHTML = "";

  let count = 1;
  if (category.includes("Couple")) count = 2;
  if (category === "Family Membership") count = 3;

  for (let i = 0; i < count; i++) {
    const nameLabel = document.createElement("label");
    nameLabel.innerText = `Full Name ${i + 1}`;
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = `name${i}`;
    nameInput.required = true;

    const emailLabel = document.createElement("label");
    emailLabel.innerText = `Email Address ${i + 1}`;
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = `email${i}`;
    emailInput.required = true;

    container.appendChild(nameLabel);
    container.appendChild(nameInput);
    container.appendChild(emailLabel);
    container.appendChild(emailInput);
  }
}

document
  .getElementById("membershipForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const category = document.getElementById("category").value;

    console.log("Form submitted with values:", {
      name,
      email,
      category,
    });

    if (!name || !email || !category) {
      alert("Please fill out all required fields.");
      return;
    }

    // const response = await fetch("http://127.0.0.1:5050/submit", {
    const response = await fetch(
      "https://nsa-membership-api.vercel.app/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, category }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(
        `Thank you, ${name}! Your ${category} membership registration was received.`
      );
      this.reset();
      document.getElementById("priceDisplay").innerText = "Membership Fee: $0";
    } else {
      alert("Error: " + data.error);
    }
  });

//   document
//   .getElementById("membershipForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const category = document.getElementById("category").value;

//     if (!name || !email || !category) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     alert(
//       `Thank you, ${name}! Your ${category} membership registration was received.`
//     );
//     // Here you would send the form data to your backend (e.g., Firebase, Google Sheets, etc.)
//     this.reset();
//     document.getElementById("priceDisplay").innerText = "Membership Fee: $0";
//   });
