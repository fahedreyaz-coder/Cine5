const SUBJECTS_BY_EXAM = {
  neet: ["Physics", "Chemistry", "Biology"],
  jee: ["Physics", "Chemistry", "Mathematics"]
};

const questionBank = [
  { id: 1, exam: "neet", stream: "medical", class: "11", subject: "Biology", topic: "Cell Structure", year: 2023, question: "Which cell organelle is called the powerhouse of the cell?" },
  { id: 2, exam: "neet", stream: "medical", class: "11", subject: "Biology", topic: "Plant Kingdom", year: 2022, question: "Name the division of plants where vascular tissues are absent." },
  { id: 3, exam: "neet", stream: "medical", class: "11", subject: "Physics", topic: "Thermodynamics", year: 2021, question: "State the first law of thermodynamics with sign convention." },
  { id: 4, exam: "neet", stream: "medical", class: "12", subject: "Biology", topic: "Genetics", year: 2024, question: "A heterozygous tall plant is crossed with a dwarf plant. Write the phenotypic ratio." },
  { id: 5, exam: "neet", stream: "medical", class: "12", subject: "Biology", topic: "Human Physiology", year: 2023, question: "Which structure in nephron helps in ultrafiltration?" },
  { id: 6, exam: "neet", stream: "medical", class: "12", subject: "Chemistry", topic: "Electrochemistry", year: 2022, question: "Write Nernst equation for a general electrode reaction." },
  { id: 7, exam: "jee", stream: "non-medical", class: "11", subject: "Physics", topic: "Laws of Motion", year: 2021, question: "State Newton's second law and derive F = ma for constant mass." },
  { id: 8, exam: "jee", stream: "non-medical", class: "11", subject: "Chemistry", topic: "Chemical Bonding", year: 2020, question: "Explain why BF3 is electron deficient with reference to its structure." },
  { id: 9, exam: "jee", stream: "non-medical", class: "12", subject: "Physics", topic: "Electrostatics", year: 2024, question: "Derive electric field due to an electric dipole at an axial point." },
  { id: 10, exam: "jee", stream: "non-medical", class: "12", subject: "Mathematics", topic: "Integration", year: 2023, question: "Evaluate ∫ x·e^x dx using integration by parts." },
  { id: 11, exam: "jee", stream: "non-medical", class: "12", subject: "Mathematics", topic: "Probability", year: 2022, question: "Two fair dice are thrown. Find the probability of getting sum greater than 9." },
  { id: 12, exam: "jee", stream: "non-medical", class: "12", subject: "Chemistry", topic: "Coordination Compounds", year: 2021, question: "What is ligand denticity? Give one example of a bidentate ligand." }
];

const questionForm = document.getElementById("questionForm");
const studentClass = document.getElementById("studentClass");
const stream = document.getElementById("stream");
const exam = document.getElementById("exam");
const subject = document.getElementById("subject");
const topic = document.getElementById("topic");
const formError = document.getElementById("formError");
const clearBtn = document.getElementById("clearBtn");

const resultSection = document.getElementById("resultSection");
const summary = document.getElementById("summary");
const questionsList = document.getElementById("questionsList");

const updateSubjectOptions = () => {
  subject.innerHTML = '<option value="">Select subject</option>';
  const subjects = SUBJECTS_BY_EXAM[exam.value] || [];

  subjects.forEach((subjectName) => {
    const option = document.createElement("option");
    option.value = subjectName;
    option.textContent = subjectName;
    subject.appendChild(option);
  });
};

const showFormError = (message) => {
  formError.textContent = message;
  formError.classList.remove("hidden");
};

const clearFormError = () => {
  formError.textContent = "";
  formError.classList.add("hidden");
};

const renderQuestions = (matches) => {
  questionsList.innerHTML = "";

  matches.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.topic}:</strong> ${item.question}
      <span class="meta">${item.exam.toUpperCase()} • Class ${item.class} • ${item.subject} • ${item.year}</span>
    `;
    questionsList.appendChild(li);
  });
};

const resetResults = () => {
  questionsList.innerHTML = "";
  summary.textContent = "";
  resultSection.classList.add("hidden");
};

exam.addEventListener("change", () => {
  updateSubjectOptions();
  subject.value = "";
});

clearBtn.addEventListener("click", () => {
  questionForm.reset();
  clearFormError();
  resetResults();
  updateSubjectOptions();
  topic.focus();
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFormError();

  if (!studentClass.value || !stream.value || !exam.value || !subject.value || !topic.value.trim()) {
    showFormError("Please fill all fields before searching.");
    resetResults();
    return;
  }

  const topicText = topic.value.trim().toLowerCase();

  const matches = questionBank
    .filter((item) => item.class === studentClass.value)
    .filter((item) => item.stream === stream.value)
    .filter((item) => item.exam === exam.value)
    .filter((item) => item.subject === subject.value)
    .filter((item) => item.topic.toLowerCase().includes(topicText))
    .sort((a, b) => b.year - a.year);

  if (matches.length === 0) {
    summary.textContent = `No questions found for "${topic.value}". Try a broader or alternate topic keyword.`;
    questionsList.innerHTML = "";
    resultSection.classList.remove("hidden");
    return;
  }

  summary.textContent = `Found ${matches.length} question(s) for ${exam.value.toUpperCase()} ${subject.value}.`;
  renderQuestions(matches);
  resultSection.classList.remove("hidden");
});

updateSubjectOptions();
