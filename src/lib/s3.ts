import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { decodeBase64Image } from "@/utils/decodeBase64";

const Bucket = process.env.LUCID_AWS_BUCKET_NAME;

const s3 = new S3Client({
  region: process.env.LUCID_AWS_REGION,
  credentials: {
    accessKeyId: process.env.LUCID_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.LUCID_AWS_SECRET_ACCESS_KEY as string,
  }
});

export const uploadFile = async (file: any, fileName: string) => {

  try {
    const imageBuffer = decodeBase64Image(file);

    const params = {
      Bucket,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg'
    };

    const data = await s3.send(new PutObjectCommand(params));
    return data;
  } catch (e: any) {
    console.error('Error uploading:', e);
    throw e;
  };
};

export default s3;
