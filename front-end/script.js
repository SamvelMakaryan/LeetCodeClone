const runButton = document.getElementById('run-button');
const submitButton = document.getElementById('submit-button');
const languageSelect = document.getElementById('language-select');
const codeEditor = document.getElementById('code-editor');

runButton.addEventListener('click', (e) => {
  const data = {
	  code: codeEditor.value,
	  lang: languageSelect.value,
	  file: 'run'
  };
	console.log(data);
	fetch('http://localhost:3000/run', {
		method: 'POST',
		mode: 'no-cors',
		body: JSON.stringify(data)
	})
	.then(response => {
		response.json();
	})
	.then(result => {
		console.log(result);
		codeEditor.value = result;
	});
});

submitButton.addEventListener('click', () => {
  const data = {
	  code: codeEditor.value,
	  lang: languageSelect.value,
	  file: 'submit'
  };
	console.log(data);
	fetch('http://localhost:3000/submit', {
		method: 'POST',
		mode: 'no-cors',
		body: JSON.stringify(data)
	})
	.then(response => {
		response.json();
	})
	.then(result => {
		console.log(result);
		codeEditor.value = result;
	});
});

languageSelect.addEventListener('change', function() {
	const selectedLanguage = this.value;
	switch (selectedLanguage) {
		case 'javascript':
			codeEditor.value = "function twoSum(num1, num2) {\n\t\n}";
			break;
		case 'cpp':
			codeEditor.value = "int twoSum(int num1, int num2) {\n\t\n}";
			break;
		case 'python':
			codeEditor.value = "def twoSum(num1, num2):\n\t";
			break;
		case 'java':
			codeEditor.value = "public class Solution  \t public static int twoSum {\n\t\n\t}\n}";
			break;
		default:
			codeEditor.value = "function twoSum(num1, num2) {\n\t\n}";
	}
});
