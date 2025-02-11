export const randomHandler = {
  number(digest: number) {
    if (digest <= 0) {
      throw new Error('Digit must be greater than 0!');
    }

    const minNumber = Math.pow(10, digest - 1);
    const maxNumber = Math.pow(10, digest) - 1;

    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    return randomNumber.toString().padStart(digest, '0');
  },
  password(length: number) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';

    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    return password;
  },
};
