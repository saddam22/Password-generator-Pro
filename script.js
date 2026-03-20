const passwordE1 = document.getElementById('password');
const lengthE1 = document.getElementById('length');
const lengthValueE1 = document.getElementById('lengthValue');

const upperCaseE1 = document.getElementById('upperCase');
const lowerCaseE1 = document.getElementById('lowerCase');
const numbersE1 = document.getElementById('numbers');
const symbolsE1 = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const historyList = document.getElementById("historyList");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";


//Update Length Value
lengthE1.addEventListener('input', () =>{
	lengthValueE1.textContent = lengthE1.value;
});


// Generate Password
function generatePassword(){
	let characters = "";
	if(upperCaseE1.checked) characters += upperChars;
	if(lowerCaseE1.checked) characters += lowerChars;
	if(numbersE1.checked) characters += numberChars;
	if(symbolsE1.checked) characters += symbolsChars;

	if(characters === ""){
		alert("Please select at least one character type!");

		return "";
	}

	let password = "";
	const length = parseInt(lengthE1.value);
	for(let i = 0; i < length; i++){
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
}


// Generate Password
function checkStrength(password){
	let strength = 0;
	if(/[A-Z]/.test(password)) strength++;
	if(/[a-z]/.test(password)) strength++;
	if(/[0-9]/.test(password)) strength++;
	if(/[^A-Za-z0-9]/.test(password)) strength++;
	if(password.length >= 12) strength++;

	let color = "red", text = "Weak", width = "20%";
	if(strength === 2) {color = "orange"; text="Fair"; width="40%"; }
	if(strength === 3) {color = "yellow"; text="Medium"; width="60%"; }
	if(strength === 4) {color = "green"; text="Strong"; width="80%"; }
	if(strength === 5) {color = "blue"; text="Very Strong"; width="100%"; }

	strengthBar.style.backgroundColor = color;
	strengthBar.style.width = width;
	strengthText.textContent = `Strength: ${text}`;
}

// Password History

function saveHistory(password){
	if(!password) return;
	let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
	history.unshift(password);
	if(history.length > 10) history.pop();
	localStorage.setItem('passwordHistory', JSON.stringify(history));
	renderHistory();
}

function renderHistory(){
	let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
	historyList.innerHTML = history.map(pw => `<li>${pw}</li>`).join('');
}


// Generate Button
generateBtn.addEventListener("click", () =>{
const password = generatePassword();
passwordE1.value = password;
navigator.clipboard.writeText(password);
checkStrength(password);
saveHistory(password);
alert("Password Generated & Copied!");
});


// Copy Button
copyBtn.addEventListener("click", () =>{
	if(passwordE1.value === "") return;
	navigator.clipboard.writeText(passwordE1.value);
	alert("Password Copied!");
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () =>{
	document.body.classList.toggle('dark');
});

// Initial Render History
renderHistory();