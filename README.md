# Cryptography API

This is a simple Cryptography API built with Node.js and Express. It provides various cryptographic operations such as generating random bytes, hashing, HMAC, AES encryption/decryption, and RSA key generation.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [GET /random](#get-random)
  - [GET /uuid](#get-uuid)
  - [GET /keys](#get-keys)
  - [POST /hash](#post-hash)
  - [POST /base64/encode](#post-base64encode)
  - [POST /base64/decode](#post-base64decode)
  - [POST /hmac](#post-hmac)
  - [POST /aes/encrypt](#post-aesencrypt)
  - [POST /aes/decrypt](#post-aesdecrypt)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/gizzixz/cryptography-api.git
    cd cryptography-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Hosting:
    ```sh
    node index.js
    ```

## Usage

You can use `curl` or any API client (like Postman) to interact with the API.

## Endpoints

### GET /random
Generates a random string of 16 bytes.

### GET /uuid
Generates a random UUID.

### GET /keys
Generates a pair of RSA keys.

### POST /hash
Hashes a string using the specified algorithm.

**Request Body:**
```json
{
    "input": "string",
    "algorithm": "sha256"
}
```

### POST /base64/encode
Encodes a string using Base64.

**Request Body:**
```json
{
    "input": "string"
}
```

### POST /base64/decode
Decodes a Base64 encoded string.

**Request Body:**
```json
{
    "input": "string"
}
```

### POST /hmac
Generates an HMAC using a secret key. (sha256)

**Request Body:**
```json
{
    "message": "string",
    "key": "key"
}
```

### POST /aes/encrypt
Encrypts a message using AES-256-CBC.

**Request Body:**
```json
{
    "message": "string",
    "key": "key"
}
```

### POST /aes/decrypt
Decrypts a message encrypted with AES-256-CBC.

**Request Body:**
```json
{
    "encrypted": "encrypted string",
    "key": "key in hex",
    "iv": "iv in hex"
}
```