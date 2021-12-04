'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const { getFiles } = require('../utils/getFiles');
const { createUUID } = require('../utils/common');
const tencentcloud = require("tencentcloud-sdk-nodejs");

const FtClient = tencentcloud.ft.v20200304.Client;

class ChangefaceController extends Controller {
    async getMyOldFace() {
        const { ctx } = this;
        const imgData = ctx.request.body.imgData;
        let result;
        try {
            const clientConfig = {
                credential: {
                    secretId: "AKIDnOjgS4RYP0MSJvIPGrDJBoBJBnAIBpDM",
                    secretKey: "vaz83mGVVEhusb5JI2WjgQvBBwRgfPt7",
                },
                region: "ap-shanghai",
                profile: {
                    httpProfile: {
                        endpoint: "ft.tencentcloudapi.com",
                    },
                },
            };

            const client = new FtClient(clientConfig);
            const params = {
                "Image": imgData,
                "AgeInfos": [
                    {
                        "Age": 80
                    }
                ],
            }
            await client.ChangeAgePic(params).then(
                (data) => {
                    console.log(data);
                    result = data.ResultImage;
                },
                (err) => {
                    console.error("error", err);
                }
            );
        } finally {
            ctx.body = {
                data: 'data:image/png;base64,' + result
            };
        }
    }
}

module.exports = ChangefaceController;