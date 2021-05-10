import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import People from './People/People';

const client = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={client}>
        <People/>
    </QueryClientProvider>,
    document.getElementById('root')
);

