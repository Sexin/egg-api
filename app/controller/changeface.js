'use strict';

const Controller = require('egg').Controller;
const tencentcloud = require("tencentcloud-sdk-nodejs");
const FtClient = tencentcloud.ft.v20200304.Client;

class ChangefaceController extends Controller {
    async getMyOldFace() {
        const { ctx } = this;
        const imgData = ctx.request.body.imgData;
        const age = ctx.request.body.age ? ctx.request.body.age : 80;
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
                        "Age": age
                    }
                ],
            }
            await client.ChangeAgePic(params).then(
                (data) => {
                    result = {result: 0, data: 'data:image/png;base64,' + data.ResultImage};
                },
                (err) => {
                    result = {result: 1, msg: err};
                }
            );
        } finally {
            ctx.body = result;
        }
    }
}

module.exports = ChangefaceController;