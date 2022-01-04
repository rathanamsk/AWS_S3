const express = require('express');
const app = express();

const AWS = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');


const BUCKET_NAME = 'coins3';

const s3 = new AWS.S3({
    region:process.env.AWS_REGION,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID
});



const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-southeast-1"
    }
};


const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'sample.png', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};


uploadFile('sample.png')

app.listen(3000,()=>{
    console.log('app run on port 3000')
})




