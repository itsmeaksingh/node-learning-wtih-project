#! /bin/bash

ng build --configuration=uat  

# added details accourding to UAT
BUCKET_NAME="" # need to add s3 bucket name 
PROFILE_NAME="" # need to add aws profile name
DISTRIBUTION_ID="" # need to add cloudfront distribution id after first deploy 
BUILD_FOLDER="" # need to add build folder name

aws configure set s3.multipart_threshold 128MB --profile ${PROFILE_NAME}
aws s3 rm s3://${BUCKET_NAME} --recursive --profile ${PROFILE_NAME}
aws s3 cp dist/${BUILD_FOLDER} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --exclude "*.js" --exclude "*.json"  --profile ${PROFILE_NAME}
aws s3 cp --content-type application/javascript dist/${BUILD_FOLDER} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --exclude "*" --include "*.js"  --profile ${PROFILE_NAME}
aws s3 cp --content-type application/json dist/${BUILD_FOLDER} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --exclude "*" --include "*.json"  --profile ${PROFILE_NAME}
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths '/*' --profile ${PROFILE_NAME}