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

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";


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

generateBtn.addEventListener("click", () =>{
passwordE1.value = generatePassword();
});

lengthE1.addEventListener("input", () =>{
	lengthValueE1.textContent = lengthE1.value;
});

copyBtn.addEventListener("click", () =>{
	if(passwordE1.value === "") return;
	navigator.clipboard.writeText(passwordE1.value);
	alert("Password Copied!");
});

darkModeToggle.addEventListener("click", () =>{
	document.body.classList.toggle('dark');
});