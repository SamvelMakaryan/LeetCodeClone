const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

app.use(cors());

app.get('/', (req, res) => {
  res.send('LeetCode clone server is running!');
});

app.use(bodyParser.json());

function runCompiler(lang, command) {
  return new Promise((resolve, reject) => {
    exec(`python3 compiler.py ${lang} ${command}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}

function checkErrorFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('error.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.includes('passed'));
      }
    });
  });
}

function isFileEmpty(filePath) {
  try {
    const fileStats = fs.statSync(filePath);
    return fileStats.size === 0;
  } catch (error) {
    console.error('Error accessing the file:', error);
    return false;
  }
}

app.post('/run', (req, res) => {
  const { code, lang } = req.body;
  let fileName;

  switch (lang) {
    case 'js':
      fileName = 'Solution.js';
      break;
    case 'c++':
      fileName = 'Solution.cpp';
      break;
    case 'java':
      fileName = 'Solution.java';
      break;
    case 'python':
      fileName = 'Solution.py';
      break;
    default:
      fileName = 'Solution.js';
      break;
  }

  fs.writeFile(fileName, code, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      runCompiler(lang, 'run')
        .then(() => checkErrorFile())
        .then(passed => {
          if (passed) {
            fs.readFile('final.txt', 'utf-8', (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
              }
              else {
                res.json({success: true, message: data, output: data});
              }
            })
          } else {
            fs.readFile('error.txt', 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.json({ success: true, message: data, output: data });
              }
            });
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    }
  });
});

app.post('/submit', (req, res) => {
  const { code, lang } = req.body;
  let fileName;

  switch (lang) {
    case 'js':
      fileName = 'Solution.js';
      break;
    case 'c++':
      fileName = 'Solution.cpp';
      break;
    case 'java':
      fileName = 'Solution.java';
      break;
    case 'python':
      fileName = 'Solution.py';
      break;
    default:
      fileName = 'Solution.js';
      console.log(lang);
      break;
  }

  fs.writeFile(fileName, code, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      runCompiler(lang, 'submit')
        .then(() => checkErrorFile())
        .then(passed => {
          if (passed) {
              if (isFileEmpty('RunTime.txt') === false) {
                fs.readFile('RunTime.txt', 'utf-8', (err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                  }
                  else {
                    res.json({success: true, message: data, output: data});
                  }
                  })
              }             
              else {
                fs.readFile('final.txt', 'utf-8', (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ error: 'Internal server error' });
                }
                else {
                  res.json({success: true, message: data, output: data});
                }
                })
              }
          } else {
            fs.readFile('error.txt', 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.json({ success: true, message: data, output: data });
              }
            });
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
