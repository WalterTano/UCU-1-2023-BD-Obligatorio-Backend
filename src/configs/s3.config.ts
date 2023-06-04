import { S3Client } from "@aws-sdk/client-s3";
import { throwIfUndef } from "../lib";

const BUCKET_REGION = throwIfUndef(process.env.BUCKET_REGION, "BUCKET_REGION");
const ACCESS_KEY = throwIfUndef(process.env.S3_ACCESS_KEY, "S3_ACCESS_KEY");
const SECRET_ACCESS_KEY = throwIfUndef(process.env.S3_SECRET_ACCESS_KEY, "S3_SECRET_ACCESS_KEY");

let s3: S3Client | undefined;

export const getS3Client = () => {
    if (!s3) {
        s3 = new S3Client({
            region: BUCKET_REGION,
            credentials: {
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_ACCESS_KEY,
            }
        });
    }

    return s3;
}
