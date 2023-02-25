// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';


const config = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(config);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
)
{
    if (req.method === 'POST')
    {
        const { prompt, num } = JSON.parse(req.body);

        const image_res = await openai.createImage({
            size: '1024x1024',
            prompt,
            n: num
        });

        if (image_res.status === 200 && image_res.statusText === 'OK')
        {
            res.status(200).json(JSON.stringify(image_res.data.data));
        } else
        {
            res.status(400).json({ msg: 'error' });
        }
    }

    // res.status(200).json({ name: 'John Doe' });
}
