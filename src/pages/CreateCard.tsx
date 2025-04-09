import { Button, Input } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { create_card } from '../api/config';

interface FormData {
    name: string;
    link: string;
}

function CreateCard() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    function createCard(data: FormData) {
        console.log('Card successfully created:', data);

        // axios.post(create_card, data)
        //     .then((response) => {
        //         console.log(response);
        //         navigate('/');
        //     })
        //     .catch((err) => {
        //         console.error('Error:', err);
        //     });
    }

    return (
        <div>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '650px',
                    marginTop: '5rem',
                }}
                onSubmit={handleSubmit(createCard)}
            >
                <Input
                    placeholder="Contents"
                    {...register('name', { required: 'Contents is required' })}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

                <Input
                    placeholder="Links"
                    style={{ margin: '20px 0' }}
                    {...register('link', { required: 'Links is required' })}
                />
                {errors.link && <p style={{ color: 'red' }}>{errors.link.message}</p>}

                <Button type="submit" style={{ backgroundColor: 'blue', color: 'white', width: '150px' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default CreateCard;
