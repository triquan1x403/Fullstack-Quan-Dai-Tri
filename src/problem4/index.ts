/*
 * With Function Sum To "n" A (Iterative Approach)
 * Time Complexity: O(n) – We need to iterate n times to compute the sum.
 * Space Complexity: O(1) – Only a single variable sum is used to store the result.
 * Use Case: This approach is simple and easy to understand, but it is less efficient for large values of n due to the linear time complexity.
 */
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/*
 * With Function Sum To "n" B (Mathematical Formula)
 * Time Complexity: O(1) – The sum is computed using a constant-time mathematical formula.
 * Space Complexity: O(1) – No additional memory is required.
 * Use Case: This is the most efficient approach in terms of both time and space. It is ideal for any value of n as long as the result does not exceed Number.MAX_SAFE_INTEGER
 */
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

/*
 * With Function Sum To "n" C (Recursive Approach)
 * Time Complexity: O(n) – The function makes n recursive calls to compute the sum.
 * Space Complexity: O(n) – Each recursive call adds a new stack frame, leading to linear space usage.
 * Use Case: This approach is elegant and easy to understand but is inefficient for large n due to the risk of stack overflow and higher space complexity. It is not recommended for large inputs.
 */
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}
