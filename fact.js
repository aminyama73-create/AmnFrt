function calculateFactorial() {
  const num = document.getElementById('numberInput').value;
  const n = parseInt(num);

  if (isNaN(n) || n < 0) {
    document.getElementById('result').innerText = "Please enter a non-negative integer.";
    return;
  }

  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;⁸
  }

  document.getElementById('result').innerText = ` Factorial of ${n} is: ${fact}`;
}
