const bucket = process.env.LUCID_AWS_BUCKET_NAME;

export const getSignedUrl = (key: string) => {
  const s3Url = `https://${bucket}.s3.amazonaws.com/`;
  return `${s3Url}${key}`;
};
