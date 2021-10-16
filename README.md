<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="IMGUP" src="https://sujalgoel.engineer/assets/images/avatar.png">

# IMGUP 🖼

<a href="https://repl.it/github/sujalgoel/IMGUP"><img src="https://repl.it/badge/github/sujalgoel/IMGUP" /></a>
<a href="https://github.com/sujalgoel/IMGUP/stargazers"><img src="https://img.shields.io/github/stars/sujalgoel/IMGUP.svg?label=Stars" /></a>
<a href="https://github.com/sujalgoel/IMGUP/blob/network/members"><img src="https://img.shields.io/github/forks/sujalgoel/IMGUP.svg?color=ff0000&label=Forks" /></a>
<a href="https://github.com/sujalgoel/IMGUP/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-orange" /></a>

> An image uploader API and website compatible with ShareX built in Node.js.

## Setup ✏️

#### config.json

```json
{
	"port": 3000,
	"domain": "https://imgup.sujalgoel.engineer"
}
```

#### ShareX.sxcu

```json
{
	"Version": "1.0.0",
	"Name": "IMGUP",
	"DestinationType": "ImageUploader",
	"RequestMethod": "POST",
	"RequestURL": "https://imgup.sujalgoel.engineer/sharex",
	"Body": "MultipartFormData",
	"FileFormName": "image",
	"URL": "$json:url$"
}
```
