const addBtn = document.getElementById("add");
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const showUserData = document.getElementById("showUserData");

const lastNameParts = [
  "el", "al", "ibn", "ebn", "bin", "abu", "abo", "ben", "bint",
  "mac", "mc", "von", "van", "de", "da", "di", "del"
];

// Capitalize each word smartly
const capitalize = (str) =>
  str
    .split(" ")
    .map((word) =>
      word.length <= 2 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

addBtn.addEventListener("click", () => {
  let first = firstInput.value.trim();
  let last = lastInput.value.trim();
  let email = emailInput.value.trim();

  // Extract email from first input if embedded
  const emailMatch = first.match(/<*([\w.-]+@[\w.-]+\.\w+)>*/);
  if (emailMatch) {
    email = emailMatch[1];
    first = first.replace(emailMatch[0], "").replace(/[<>]/g, "").trim();
  }

  // Clean extra symbols from first
  first = first.replace(/[-<>();]/g, " ").replace(/\s+/g, " ").trim();

  // If last input is filled, trust it
  if (last) {
    // Do nothing
  }

  // Handle "Last, First" format
  else if (first.includes(",")) {
    const parts = first
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length >= 2) {
      last = parts[0];
      first = parts.slice(1).join(" ");
    }
  }

  // Try to auto-split full name if last is empty
  else if (!last && first) {
    const words = first.split(" ").filter(Boolean);

    let lastIndex = -1;
    for (let i = 0; i < words.length; i++) {
      const wordLower = words[i].toLowerCase();
      if (lastNameParts.includes(wordLower)) {
        lastIndex = i;
        break;
      }
    }

    if (lastIndex >= 0) {
      last = words.slice(lastIndex).join(" ");
      first = words.slice(0, lastIndex).join(" ");
    } else if (words.length > 1) {
      last = words.pop();
      first = words.join(" ");
    }
  }

  // Final cleanup and formatting
  first = capitalize(first.replace(/\s+/g, " "));
  last = capitalize(last.replace(/\s+/g, " "));
  email = email.trim();

  if (first || last || email) {
    const userDiv = document.createElement("div");
    userDiv.textContent = `👤 ${first} ${last} | ${first} | ${last} | ✉️ ${email}`;
    showUserData.appendChild(userDiv);
  }

  firstInput.value = "";
  lastInput.value = "";
  emailInput.value = "";
});
