import React from 'react'
import './App.scss'
import { useQuery } from 'react-query'
import LinearProgress from '@material-ui/core/LinearProgress'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Person from './Person'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: 1000,
    }
});

export type PoepleType = {
    id: number;
    name: {};
    title: string;
    pic: string;
    phone: number;
    city: string;
}

const getPeople = async (): Promise<PoepleType[]> =>
    await(await fetch('https://fakestoreapi.com/products')).json()

const People = () => {
    const classes = useStyles();

    const { data, status } = useQuery<PoepleType[]>(
        'people', 
        getPeople
        );
    console.log(data)

    return (
        <>
            { status === 'loading' && (
                <LinearProgress />
            )}

            { status === 'error' && (
                <div> Sorry, Something went wrong!!</div>
            )}

            { status === 'success' && (
                <div>
                    { data?.map(person => 
                    <div>{person.title} </div> )}
                </div>
            )}
        </>
    )
}

export default People;
