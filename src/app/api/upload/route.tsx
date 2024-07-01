import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req: any){
    const formDat = await req.formData();
    const file = formDat.get('file')
    // console.log(file);
    // console.log(file.name)
    const {type, name} = file;
    const data = await arrayBuffer();

    const s3Client = new S3Client({
        region: "asia-east-1", // enter you region
        credentails: {
            acessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    // make the id unique
    const id = uniqId();
    const extension = name.split('.').slice(-1)[0]; // grap the .mp4 from the file
    // const newFile = id + '.mp4';
    const newFileName = id + + '.' + extension;

    const uploadCmd = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: data,
        ACL: 'public-read',
        ContentType:type, // here is type: mp4
        Key: newFileName,
    })

    // send the above data to the CLIENT
    s3Client.send(uploadCmd);

    return Response.json({id, name, extension, newFileName})
    
}