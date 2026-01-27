import React from 'react';
import ItemList from './item-list';

const Page: React.FC = () => {
    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping List</h1>
                <ItemList />
            </div>
        </main>
    );
};

export default Page;
