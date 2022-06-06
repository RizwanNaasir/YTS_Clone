import * as React from 'react';

export default function SelectSmall(props) {

    const handleChange = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <select
                id="demo-select-small"
                value= {props.value}
                onChange={handleChange}
                name={props.label}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={props.value}
            >
                {props.list.map((movies) => (
                                <option key={movies.value} value={movies.value}>{movies.name}</option>
                            ))}
            </select>
        </div>
    );
}
