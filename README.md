# Ketl-PFP-Generator

This repository contains the Ketl-PFP-Generator project. It's an application developed to generate avatars for Ketl users. It utilizes the Stable Diffusion AI API to generate images from given Ethereum addresses and uploads these images to the InterPlanetary File System (IPFS).

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/ketl-pfp-generator`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn start`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name             | Description                              |
| ---------------- | ---------------------------------------- |
| `IPFS_UPLOADER`  | URL for IPFS upload                      |
| `MONGO`          | URL of the mongo database                |
| `PORT`           | Port to run server on (defaults to 1337) |
| `OPENAI_API_KEY` | OpenAI Key                               |

Also, please, consider looking at `.env.sample`.
