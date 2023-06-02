const { foo } = require('./Solution');

function output() {
    const num1 = process.argv[2];
    const num2 = process.argv[3];

    const sum = foo(parseInt(num1), parseInt(num2));
    const fs = require('fs');
    const data = sum.toString();
    fs.writeFile('output.txt', data, (err) => {
        if (err) throw err;
    });
}

output();
