import { Buffer } from 'buffer';

export const decodeBase64Image = (string: string) => {
  try {
    const buffer = Buffer.from(string, 'base64');
    return buffer;
  } catch (error) {
    console.error('Error decoding base64 string:', error);
    throw new Error('Invalid base64 string');
  }
};
