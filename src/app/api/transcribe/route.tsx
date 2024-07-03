import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";

function getClient(){
    return new TranscribeClient({
            region: "asia-east-1", // enter you region
            credentails: {
                acessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
}

function createTranscriptCmd(filename: String | null){
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: filename,
        OuputBucketName: process.env.AWS_BUCKET_NAME, // want to save the vid in the same page
        OutputKey: filename + '.transcription',
        IdentifyLanguage: true,
        Media: {
            MediaFileUrl: 's3://' + process.env.AWS_BUCKET_NAME+ '/' + filename,
        },

    });
}

function getJobStatus(filename: String | null) {
    return new GetTranscriptionJobCommand({
        TranscriptionJobName: filename,
    });
}

async function StreamToString(stream: any | any[]){
    const chunks : any[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk: any) => {
            Buffer.from(chunk);
        });
        stream.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf8'));
        });
        stream.on('error', reject);
    })
}

// find ready transcription
async function getTranscriptionFile(filename: String | null) {
    const transcriptionFile = filename + '.transcription';
    const s3Client = new S3Client({
        region: "asia-east-1", // enter you region
        credentails: {
            acessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const getObjectCmd = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: transcriptionFile
    });
    let transcriptionFileResponse = null;
    try {
        transcriptionFileResponse = await s3Client.send(getObjectCmd);
    } catch (error) {
        console.log("transcription file get error: " + error);
    }
    if(transcriptionFileResponse){
       return JSON.stringify(await StreamToString(transcriptionFileResponse.Body));
    //    console.log({transcription}) // PRINT OUT THE TIMELINE AND THE SCRIPT AT EACH MOMENT
    };
    return null;
}

export async function GET(req: any) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    // console.log(searchParams);
    const filename = searchParams.get('filename'); // getting the name of the file

    // find ready transcription
    const transcrib = await getTranscriptionFile(filename);
    if(transcrib){
        return Response.json({
        status: 'COMPLETED',
        transcrib,
        });
    }

    const transcribeClient = getClient();

    let jobStatusRes =null

    // in the situation of upload 2 same files to the web: ask the server is any job like this exist => check if it alr runned
    let existingJobFound = false;
    try {
        const transcriptionJobStatusCmd = getJobStatus(filename);
        jobStatusRes = await transcribeClient.send(transcriptionJobStatusCmd);   
        existingJobFound=true;
        // console.log(jobStatusRes)
    } catch (error) {
        return jobStatusRes;
    }
    // console.log(existingJobFound);
    
    // if we have an existing job
    if(jobStatusRes){
        return Response.json({
            status: jobStatusRes.TranscriptionJob.TranscriptionJobStatus,
        })
    }

    // after check, no => create new transcription job
    if(!jobStatusRes){
        const transcriptionCmd = createTranscriptCmd(filename)
        const res = await transcribeClient.send(transcriptionCmd); // might wait like 1 min
        return Response.json({
            status: res.TranscriptionJob.TranscriptionJobStatus, // create a new job
        })
    }

    // return Response.json('success');
    return Response.json(null);
}