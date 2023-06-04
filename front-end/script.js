const runButton = document.getElementById('run-button');
const submitButton = document.getElementById('submit-button');
const languageSelect = document.getElementById('language-select');
const codeEditor = document.getElementById('code-editor');

runButton.addEventListener('click', (e) => {
  const data = {
    code: codeEditor.value,
    lang: languageSelect.value,
  };

  fetch('http://localhost:3000/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
	console.log(result);
	if (result.error) {
		openSmallWindow(result.message);
	} else {
		openSmallWindow(result.message);
	}
  });
});

submitButton.addEventListener('click', () => {
	const data = {
	  code: codeEditor.value,
	  lang: languageSelect.value,
	};
	fetch('http://localhost:3000/submit', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	  .then(response => response.json())
	  .then(result => {
		console.log(result);
		if (result.error) {
			openSmallWindow(result.message);
		} else {
			openSmallWindow(result.message);
		}
	  });
  });  
languageSelect.addEventListener('change', function() {
	const selectedLanguage = this.value;
	switch (selectedLanguage) {
		case 'js':
			codeEditor.value = "function twoSum(num1, num2) {\n\t\n}\n\nmodule.exports = {twoSum: twoSum};";
			break;
		case 'c++':
			codeEditor.value = "int twoSum(int num1, int num2) {\n\t\n}";
			break;
		case 'python':
			codeEditor.value = "def twoSum(num1, num2):\n\t";
			break;
		case 'java':
			codeEditor.value = "public class Solution {\n\t public static int twoSum(int num1, int num2) {\n\t\t\n\t}\n}";
			break;
		default:
			codeEditor.value = "function twoSum(num1, num2) {\n\t\n}";
	}
});

function openSmallWindow(content) {
	const smallWindow = document.createElement('div');
	smallWindow.className = 'small-window';
	
	const fixedDiv = document.createElement('div');
	fixedDiv.className = 'fixed';
	
	const closeButton = document.createElement('span');
	closeButton.className = 'close-button';
	closeButton.innerText = 'X';
	closeButton.style.color = 'red';
	closeButton.style.border = 'dashed 1px #960505';
	closeButton.addEventListener('click', () => {
	  smallWindow.style.display = 'none';
	});
	
	const heading = document.createElement('h3');
	heading.innerText = 'Output';
	heading.style.color = 'green';
	heading.style.textAlign = 'center';

	const paragraph = document.createElement('p');
	paragraph.innerText = content;
	paragraph.style.textAlign = 'center';

	fixedDiv.appendChild(closeButton);
	fixedDiv.appendChild(heading);
	fixedDiv.appendChild(paragraph);
	
	smallWindow.appendChild(fixedDiv);
	smallWindow.style.position = 'fixed';
	smallWindow.style.top = '10px';
	smallWindow.style.right = '30px';
	smallWindow.style.width = '300px';
	smallWindow.style.border = '3px solid #73AD21';
	smallWindow.style.backgroundColor = 'white';
	smallWindow.style.padding = '8px';

	closeButton.style.position = 'absolute';
	closeButton.style.top = '5px';
	closeButton.style.right = '5px';
	closeButton.style.cursor = 'pointer';
	
	document.body.appendChild(smallWindow);
  }
9  