import { Button, Image, Input, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useState } from 'react';
export default function Index()
{
    const form = useForm({
        initialValues: {
            prompt: '',
            num: 1
        }
    });


    const [imgList, setImgList] = useState<string[]>([]);


    const [loading, setLoadgin] = useState<boolean>(false);


    const imageGeneration = useCallback(async (values: any) =>
    {
        const { prompt, num } = values;

        if (!prompt) return;

        setLoadgin(true);

        try
        {
            const res = await fetch('api/openai', {
                method: 'POST',
                body: JSON.stringify({ prompt, num })
            });

            if (res.status === 200)
            {
                const data = JSON.parse(await res.json());

                for (const d of data)
                {
                    console.log(d);
                    setImgList(prve =>
                    {
                        return prve.concat(d.url);
                    });
                }
            }
        } catch (e)
        {

        } finally
        {
            setLoadgin(false);
        }
    }, []);


    return (
        <div>

            <form onSubmit={form.onSubmit(imageGeneration)}>
                <Input
                    placeholder="Enter key words"
                    {...form.getInputProps('prompt')}
                />
                <NumberInput
                    placeholder="Image number"
                    label="Image number"
                    withAsterisk
                    min={1}
                    max={4}
                    {...form.getInputProps('num')}
                />
                <Button loading={loading} type='submit'>Generat Image</Button>
            </form>
            {
                imgList.map(v => (<Image key={v} width={400} height={300} src={v} />))
            }
        </div>
    );
}
