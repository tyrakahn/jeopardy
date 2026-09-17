// Jeopardy 3x3 – data: 3 kategorier, varje kategori har 3 frågor (rader = poängvärden)
// Byt gärna ut texterna nedan mot era egna frågor och svar.

const categories = [
  {
    name: "Ekonomi - Begrepp",
    questions: [
      {
        value: 100,
        question: "De kostnader i ett företag som inte ändras när försäljningsvolymen förändras",
        answer: "Vad är fasta kostnader?",
      },
      {
        value: 200,
        question: "Den skriftliga rapport som visar ett företags tillgångar, skulder och eget kapital vid ett visst datum (oftast sista december)",
        answer: "Vad är en balansräkning",
      },
      {
        value: 300,
        question: "Det företagsekonomiska nyckeltal som visar hur stor andel av ett företags tillgångar som är finansierade med eget kapital",
        answer: "Vad är soliditet",
      },
    ],
  },
  {
    name: "Linköpingskunskap",
    questions: [
      {
        value: 100,
        question: "Detta årtiondet invigdes Linköping Universitet som ett självständigt universitet",
        answer: "När va 70-talet (1975)?",
      },
      {
        value: 200,
        question: "Denna plats är Linköping på listan över Sveriges största kommuner (Befolkning)",
        answer: "Vad är 5:e plats?",
      },
      {
        value: 300,
        question: "Detta århundrade började byggnationen av Linköpings domkyrka",
        answer: "När va 1100-talet?",
      },
    ],
  },
  {
    name: "Vett och etikett",
    questions: [
      {
        value: 100,
        question: "Denna ordning ska du använda besticken under en flerrätters middag",
        answer: "Vad är utifrån och in?",
      },
      {
        value: 200,
        question: "När du skålar på en formell bankett med din bordskamrat, här ska du titta enligt traditionell etikett",
        answer: "Vad är i ögonen (att titta ner i glaset eller bort anses oartigt)?",
      },
      {
        value: 300,
        question: "Om din bordsgranne ber dig att räcka över saltet, detta måste du enligt klassisk vett och etikett alltid skicka med samtidigt",
        answer: "Vad är pepparn? (Vad är salt och peppar betraktas som ett \"gift par\" och ska alltid skickas tillsammans på bordet)",
      },
    ],
  },
];

const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const categoryLabel = document.getElementById("category-label");
const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const showAnswerBtn = document.getElementById("show-answer-btn");
const closeBtn = document.getElementById("close-btn");

let activeTile = null; // referens till rutan som just nu visas i overlayen

function buildBoard() {
  // Kategorirubriker (rad 1)
  categories.forEach((category) => {
    const header = document.createElement("div");
    header.className = "category-header";
    header.textContent = category.name;
    board.appendChild(header);
  });

  // Frågerutor (rad 2-4), en rad per poängnivå
  for (let row = 0; row < 3; row++) {
    categories.forEach((category, colIndex) => {
      const item = category.questions[row];

      const tile = document.createElement("button");
      tile.className = "tile";
      tile.textContent = `$${item.value}`;
      tile.dataset.category = colIndex;
      tile.dataset.row = row;

      tile.addEventListener("click", () => openQuestion(tile, category, item));

      board.appendChild(tile);
    });
  }
}

function openQuestion(tile, category, item) {
  if (tile.classList.contains("used")) return;

  activeTile = tile;

  categoryLabel.textContent = `${category.name} – $${item.value}`;
  questionText.textContent = item.question;
  answerText.textContent = item.answer;
  answerText.hidden = true;

  overlay.hidden = false;
}

function closeQuestion() {
  if (activeTile) {
    activeTile.classList.add("used");
    activeTile.textContent = "✓";
    activeTile = null;
  }
  overlay.hidden = true;
}

showAnswerBtn.addEventListener("click", () => {
  answerText.hidden = false;
});

closeBtn.addEventListener("click", closeQuestion);

// Klick utanför kortet (på den mörka bakgrunden) stänger också frågan
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeQuestion();
  }
});

buildBoard();
