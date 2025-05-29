const addBtn = document.getElementById("add");
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const showUserData = document.getElementById("showUserData");

const lastNameParts = [
  // English/Western
  "el", "al", "ibn", "ebn", "bin", "abu", "abo", "ben", "bint",
  "mac", "mc", "von", "van", "de", "da", "di", "del",

  // Arabic (Arabic script)
  "ال", "بن", "ابن", "أبو", "أبن", "بنّت", "بنت","بني",
  "آل", "عبد", "عبدال", "ذو", "ذي"
];


// Arabic-aware trimming and cleaning
const cleanName = (str) =>
  str
    .replace(/[-<>();]/g, " ") // remove unwanted symbols
    .replace(/\s+/g, " ")      // normalize spaces
    .trim();

addBtn.addEventListener("click", () => {
  const fullText = firstInput.value.trim();
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;

  // Match all emails
  const emails = [...fullText.matchAll(emailPattern)];

  if (!emails.length) return;

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i][0];
    const emailIndex = emails[i].index;

    const startOfName = i === 0 ? 0 : emails[i - 1].index + emails[i - 1][0].length;
    const rawName = fullText.substring(startOfName, emailIndex).trim();

    // Clean and split the name
    let name = rawName.replace(/[-<>();]/g, " ").replace(/\s+/g, " ").trim();
    let first = "", last = "";

    const words = name.split(" ").filter(Boolean);

    // Detect last name part
    let lastIndex = -1;
    for (let j = 0; j < words.length; j++) {
      const wordLower = words[j].toLowerCase();
      if (lastNameParts.includes(wordLower) || lastNameParts.includes(words[j])) {
        lastIndex = j;
        break;
      }
    }

    if (lastIndex >= 0) {
      last = words.slice(lastIndex).join(" ");
      first = words.slice(0, lastIndex).join(" ");
    } else if (words.length > 1) {
      last = words.pop();
      first = words.join(" ");
    } else {
      first = words.join(" ");
    }

    // Preserve original casing, just trim
    first = first.trim();
    last = last.trim();

    // Show result
    if (first || last || email) {
      const userDiv = document.createElement("div");
      userDiv.textContent = `👤 ${first} ${last} | ${first} | ${last} | ✉️ ${email}`;
      showUserData.appendChild(userDiv);
    }
  }

  firstInput.value = "";
  lastInput.value = "";
  emailInput.value = "";
});

