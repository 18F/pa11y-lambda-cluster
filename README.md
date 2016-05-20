# pa11y-lambda-cluster

Run a cluster of pa11y scans using AWS Lambda.

## Installation/Usage

Dependencies:

- Docker
- docker-compose

### Setup AWS Lambda

Set up an AWS Lambda function with pa11y using [pa11y-lambda](https://github.com/18f/pa11y-lambda).

Add an AWS API Gateway endpoint (click on the "API Endpoints" tab in the Lambda console).

The endpoint's HTTP method should be POST. Select "Open" for the security setting.

Once the endpoint is created, AWS will show you its URL.

Create an API key for your endpoint (https://console.aws.amazon.com/apigateway/home#/api-keys).

### Setup Docker environment

Clone this repo and `cd` into it.

Build the image:

```
docker-compose build
```

Make sure the build succeeded:

```
docker-compose run web npm --version
```

This should output the version of NPM installed on the Docker container.

Configure your `.env` file:

```
cp app/.env.example app/.env
```

Edit the environment variables using the API key and API endpoint from the `Setup AWS Lambda` section.

Run the cluster:

```
docker-compose run web node index.js
```

### Settings

At some point this will all be much easier to configure, but by modifying `app/index.js` you can alter the following:

- `const concurrency` (the number of Lambda functions queued at a time)
- `const urls` (the URLs to scan)

Currently, `urls` is an array with a sample of 11 .gov URLs.
