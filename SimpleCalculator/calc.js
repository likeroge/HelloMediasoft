alert("Simple Calculator\nPlease enter two numbers");
let a, b, division;

while (a === undefined || a === "" || (isNaN(a)) == true || a === null) {
    a = prompt("Enter first number");
}
while (b === undefined || b === "" || (isNaN(b)) == true || b === null) {
    b = prompt("Enter second number");
}
a = +a;
b = +b;
if (b === 0) division = "Please don't divide by 0";
else division = a / b;
alert(` Addition = ${a + b}\n Multiplication = ${a * b}\n Subtraction = ${a - b}\n Division = ${division}\n Press ENTER to continue`);
