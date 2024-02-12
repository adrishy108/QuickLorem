

// Selecting DOM elements
const numInput = document.querySelector('.num-input');
const selected = document.querySelector('.selected');
const selectedOpt = document.querySelector('.selected-option');
const options = document.querySelector('.options');
const generateBtn = document.querySelector('.generate-btn');
const result = document.querySelector('.result');
const generated = document.querySelector('.generated');

// Event listener for the selected dropdown
selected.addEventListener("click", function () {
    // Toggle the display of options
    if (options.style.display == "block") {
        options.style.display = "none";
    } else {
        options.style.display = "block";
    }
});

// Event listener for options click
options.addEventListener('click', function (e) {
    // Remove active class from all options
    for (let i = 0; i < options.childElementCount; i++) {
        options.children[i].classList.remove('active');
    }
    // Set the selected option text and add active class
    selectedOpt.innerText = e.target.innerText;
    e.target.classList.add("active");
    // Hide options
    options.style.display = "none";
});

// Event listener for generate button click
generateBtn.addEventListener('click', run);

// Function to generate output based on user input
function generate(paragraph) {
    result.style.display = "block";
    generated.innerText = "";

    let words = paragraph.split(" ");

    // Generate word(s)
    if (selectedOpt.innerText == "word") {
        for (let i = 0; i < numInput.value; i++) {
            generated.innerText += " " + wordG(words);
        }
    }

    // Generate sentence(s)
    if (selectedOpt.innerText == "list") {
        sentence(words);
    }

    // Generate paragraph(s)
    if (selectedOpt.innerText == "paragraph") {
        for (let i = 0; i < numInput.value; i++) {
            const random = Math.floor(Math.random() * (90 - 50 + 1) + 50);
            for (let j = 0; j < random; j++) {
                generated.innerHTML += " " + wordG(words);
            }
            generated.innerHTML += `. </br> </br>`;
        }
    }
}

// Function to generate a random word from the given array
function wordG(words) {
    const rWord = Math.floor(Math.random() * words.length);
    return words[rWord];
}

// Function to generate a random sentence from the given array
//Genrating List
function sentence(words) {
    const list = document.createElement("ul")
    generated.append(list)
    for (let i = 0; i < numInput.value; i++) {
        const random = Math.floor(Math.random() * (18 - 10 + 1) + 10);
        const listItem = document.createElement("li")
        list.append(listItem)
        for (let j = 0; j < random; j++) {
            listItem.innerHTML += ` ${wordG(words)}`;
        }
        
        
    }
}

// Function to handle the generation process
function run() {
    fetch("/src/lorem-ispum.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(paragraph => {
            // Call generate function with the fetched paragraph
            generate(paragraph);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function MadeBy(){
    const credit = document.createElement("p")
    credit.className = "credit"
    credit.innerText = "Made By : Ayush Mishra"
    document.body.append(credit)
}
