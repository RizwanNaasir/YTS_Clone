import React, {useEffect, useState,Fragment} from 'react';
import { Menu, Popover, Transition,Listbox } from '@headlessui/react'

import '../App.css';
import List from './List';
import withListLoading from '../components/withListLoading';
import API from "../components/API";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { genres_list, sort_by_list, rating_list, quality_list } from '../components/filterLists'
import {
    ChatAltIcon,
    CodeIcon,
    DotsVerticalIcon,
    EyeIcon,
    FlagIcon,
    PlusSmIcon,
    SearchIcon,
    ShareIcon,
    StarIcon,
    ThumbUpIcon,
} from '@heroicons/react/solid'
import { BellIcon, FireIcon, HomeIcon, MenuIcon, TrendingUpIcon, UserGroupIcon, XIcon } from '@heroicons/react/outline'

const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const communities = [
    { name: 'Movies', href: '#' },
    { name: 'Food', href: '#' },
    { name: 'Sports', href: '#' },
    { name: 'Animals', href: '#' },
    { name: 'Science', href: '#' },
    { name: 'Dinosaurs', href: '#' },
    { name: 'Talents', href: '#' },
    { name: 'Gaming', href: '#' },
]
const tabs = [
    { name: 'Recent', href: '#', current: true, value: '' },
    { name: 'Most Liked', href: '#', current: false, value: 'like_count' },
    { name: 'Most Rated', href: '#', current: false, value: 'rating' },
]

const whoToFollow = [
    {
        name: 'Leonard Krasner',
        handle: 'leonardkrasner',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]
const trendingPosts = [
    {
        id: 1,
        user: {
            name: 'Floyd Miles',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
        comments: 291,
    },
    // More posts...
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Home() {
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movies: null,
    });
    const [Limit, setLimit] = useState(20);
    const [Search, setSearch] = useState('');
    const [Sort, setSort] = useState('');
    const [Order, setOrder] = useState('');
    const [Genre, setGenre] = useState('');
    const [Quality, setQuality] = useState('');
    const [Rating, setRating] = useState('');
    let [page, setPage] = useState(1);
    const [totalMovies, settTotalMovies] = useState('');
    const [currentTab, setCurrentTab] = useState(true);
    function movieList() {
        setAppState({loading: true});
        const apiUrl = `list_movies.json`;
        const params = {
            query_term: Search,
            limit: Limit,
            page: page,
            sort_by: Sort,
            order_by: Order,
            genre: Genre,
            quality: Quality,
            minimum_rating: Rating,
        }
        fetch(`${API.endpoint}${apiUrl}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                    setLimit(data.data.limit);
                    settTotalMovies(data.data.movie_count);
                    setPage(data.data.page_number);
                    setAppState({
                        loading: false,
                        movies: data.data.movies,
                    });
                }
            );
    }

    useEffect(() => {
        movieList()
    }, [page, Search, Limit, Sort, Order, Genre, Quality, Rating, setAppState, setPage]);
    return (
        // <div className="min-h-full">
        //     <div className="pb-10">
        //         <main className="mx-auto max-w-7xl px-4 sm:mt-16">
        //             <div className="text-center">
        //                 <h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        //                     <span className="block xl:inline">YTS</span>{' '}
        //                     <span className="block text-indigo-600 xl:inline">on Steroids</span>
        //                 </h1>
        //                 <p className="my-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        //                     Welcome to the un-official YTS website. Here you can browse and download YIFY movies in
        //                     excellent 720p, 1080p, 2160p 4K and 3D quality on lightning speed..
        //                 </p>
        //             </div>
        //         </main>
        //         <main>
        //             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        //
        //                 <div className="flex sm:flex-row flex-col justify-center z-0 gap-3 group">
        //                     <input
        //                         type="text"
        //                         value={Search}
        //                         onChange={(e) => setSearch(e.target.value)}
        //                         className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full sm:py-0 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        //                         placeholder="Search Movies"
        //                     />
        //                     <Listbox value={Genre} onChange={setGenre}>
        //                         {({ open }) => (
        //                             <>
        //                                 <div className="relative">
        //                                     <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        //                                         <span className="block">
        //                                             {Genre === '' ? 'Genre' : Genre}
        //                                         </span>
        //                                         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        //                                         <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //                                       </span>
        //                                     </Listbox.Button>
        //
        //                                     <Transition
        //                                         show={open}
        //                                         as={Fragment}
        //                                         leave="transition ease-in duration-100"
        //                                         leaveFrom="opacity-100"
        //                                         leaveTo="opacity-0"
        //                                     >
        //                                         <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        //                                             {genres_list.map((person) => (
        //                                                 <Listbox.Option
        //                                                     key={person.id}
        //                                                     className={({ active }) =>
        //                                                         classNames(
        //                                                             active ? 'text-white bg-indigo-600' : 'text-gray-900',
        //                                                             'cursor-default select-none relative py-2 pl-8 pr-4'
        //                                                         )
        //                                                     }
        //                                                     value={person.value}
        //                                                 >
        //                                                     {({ selected, active }) => (
        //                                                         <>
        //                                                         <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
        //                                                           {person.name}
        //                                                         </span>
        //
        //                                                             {selected ? (
        //                                                                 <span
        //                                                                     className={classNames(
        //                                                                         active ? 'text-white' : 'text-indigo-600',
        //                                                                         'absolute inset-y-0 left-0 flex items-center pl-1.5'
        //                                                                     )}
        //                                                                 >
        //                                                                 <CheckIcon className="h-5 w-5" aria-hidden="true" />
        //                                                               </span>
        //                                                             ) : null}
        //                                                         </>
        //                                                     )}
        //                                                 </Listbox.Option>
        //                                             ))}
        //                                         </Listbox.Options>
        //                                     </Transition>
        //                                 </div>
        //                             </>
        //                         )}
        //                     </Listbox>
        //                     <Listbox value={Quality} onChange={setQuality}>
        //                         {({ open }) => (
        //                             <>
        //                                 <div className="relative">
        //                                     <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        //                                         <span className="block">
        //                                             {Quality === '' ? 'Quality' : Quality}
        //                                         </span>
        //                                         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        //                                         <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //                                       </span>
        //                                     </Listbox.Button>
        //
        //                                     <Transition
        //                                         show={open}
        //                                         as={Fragment}
        //                                         leave="transition ease-in duration-100"
        //                                         leaveFrom="opacity-100"
        //                                         leaveTo="opacity-0"
        //                                     >
        //                                         <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        //                                             {quality_list.map((person) => (
        //                                                 <Listbox.Option
        //                                                     key={person.id}
        //                                                     className={({ active }) =>
        //                                                         classNames(
        //                                                             active ? 'text-white bg-indigo-600' : 'text-gray-900',
        //                                                             'cursor-default select-none relative py-2 pl-8 pr-4'
        //                                                         )
        //                                                     }
        //                                                     value={person.value}
        //                                                 >
        //                                                     {({ selected, active }) => (
        //                                                         <>
        //                                                         <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
        //                                                             {person.name}
        //                                                         </span>
        //                                                         {selected ? (
        //                                                             <span
        //                                                                 className={classNames(
        //
        //                                                                 active ? 'text-white' : 'text-indigo-600',
        //                                                                 'absolute inset-y-0 left-0 flex items-center pl-1.5'
        //                                                             )}
        //                                                             >
        //                                                                 <CheckIcon className="h-5 w-5" aria-hidden="true" />
        //                                                             </span>
        //                                                         ) : null}
        //                                                         </>
        //                                                     )}
        //                                                 </Listbox.Option>
        //                                             ))}
        //                                         </Listbox.Options>
        //                                     </Transition>
        //                                 </div>
        //                             </>
        //                         )}
        //                     </Listbox>
        //                     <Listbox value={Sort} onChange={setSort}>
        //                         {({ open }) => (
        //                             <>
        //                                 <div className="relative">
        //                                     <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        //                                         <span className="block">
        //                                             {Sort === '' ? 'Sort' : Sort}
        //                                         </span>
        //                                         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        //                                         <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //                                       </span>
        //                                     </Listbox.Button>
        //
        //                                     <Transition
        //                                         show={open}
        //                                         as={Fragment}
        //                                         leave="transition ease-in duration-100"
        //                                         leaveFrom="opacity-100"
        //                                         leaveTo="opacity-0"
        //                                     >
        //                                         <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        //                                             {sort_by_list.map((person) => (
        //                                                 <Listbox.Option
        //                                                     key={person.id}
        //                                                     className={({ active }) =>
        //                                                         classNames(
        //                                                             active ? 'text-white bg-indigo-600' : 'text-gray-900',
        //                                                             'cursor-default select-none relative py-2 pl-8 pr-4'
        //                                                         )
        //                                                     }
        //                                                     value={person.value}
        //                                                 >
        //                                                     {({ selected, active }) => (
        //                                                         <>
        //                                                         <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
        //                                                             {person.name}
        //                                                         </span>
        //                                                         {selected ? (
        //                                                             <span
        //                                                                 className={classNames(
        //                                                                     <span className={classNames(
        //                                                                         active ? 'text-white' : 'text-indigo-600',
        //                                                                         'absolute inset-y-0 left-0 flex items-center pl-1.5'
        //                                                                     )}
        //                                                                     >
        //                                                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
        //                                                                     </span>
        //                                                                 )}
        //                                                             >
        //                                                             </span>
        //                                                         ) : null}
        //                                                         </>
        //                                                     )}
        //                                                 </Listbox.Option>
        //                                             ))}
        //                                         </Listbox.Options>
        //                                     </Transition>
        //                                 </div>
        //                             </>
        //                         )}
        //                     </Listbox>
        //                     <Listbox value={Rating} onChange={setRating}>
        //                         {({ open }) => (
        //                             <>
        //                                 <div className="relative">
        //                                     <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        //                                         <span className="block">
        //                                             {Rating === '' ? 'Rating' : Rating}
        //                                         </span>
        //                                         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        //                                         <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //                                       </span>
        //                                     </Listbox.Button>
        //
        //                                     <Transition
        //                                         show={open}
        //                                         as={Fragment}
        //                                         leave="transition ease-in duration-100"
        //                                         leaveFrom="opacity-100"
        //                                         leaveTo="opacity-0"
        //                                     >
        //                                         <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        //                                             {rating_list.map((person) => (
        //                                                 <Listbox.Option
        //                                                     key={person.id}
        //                                                     className={({ active }) =>
        //                                                         classNames(
        //                                                             active ? 'text-white bg-indigo-600' : 'text-gray-900',
        //                                                             'cursor-default select-none relative py-2 pl-8 pr-4'
        //                                                         )
        //                                                     }
        //                                                     value={person.value}
        //                                                 >
        //                                                     {({ selected, active }) => (
        //                                                         <>
        //                                                         <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
        //                                                             {person.name}
        //                                                         </span>
        //                                                             {selected ? (
        //                                                                 <span
        //                                                                     className={classNames(
        //                                                                         <span className={classNames(
        //                                                                             active ? 'text-white' : 'text-indigo-600',
        //                                                                             'absolute inset-y-0 left-0 flex items-center pl-1.5'
        //                                                                         )}
        //                                                                         >
        //                                                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
        //                                                                     </span>
        //                                                                     )}
        //                                                                 >
        //                                                             </span>
        //                                                             ) : null}
        //                                                         </>
        //                                                     )}
        //                                                 </Listbox.Option>
        //                                             ))}
        //                                         </Listbox.Options>
        //                                     </Transition>
        //                                 </div>
        //                             </>
        //                         )}
        //                     </Listbox>
        //                 </div>
        //                 {/* Replace with your content */}
        //                 <div className="px-4 py-8 sm:px-0">
        //                     <div className='repo-container'>
        //                         <ListLoading isLoading={appState.loading} movies={appState.movies}/>
        //                     </div>
        //                 </div>
        //                 {/* /End replace */}
        //             </div>
        //         </main>
        //     </div>
        //     <nav
        //         className="bg-white px-4 fixed bottom-0 w-full py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        //         aria-label="Pagination"
        //     >
        //         <div className="hidden sm:block">
        //             <p className="text-sm text-gray-700">
        //                 Showing Page <span className="font-medium">{page}</span> of <span
        //                 className="font-medium">{Math.trunc(totalMovies / Limit)}</span>
        //             </p>
        //         </div>
        //         <div className="flex-1 flex justify-between sm:justify-end">
        //             <button
        //                 onClick={() => setPage(page--)}
        //                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        //                 Previous
        //             </button>
        //             <button
        //                 onClick={() => setPage(page++)}
        //                 className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        //                 Next
        //             </button>
        //         </div>
        //     </nav>
        // </div>
        <div className="min-h-full">
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <a href="#">
                                            <img
                                                className="block h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                                                alt="Workflow"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    value={Search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    id="search"
                                                    name="search"
                                                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    <a href="#" className="text-sm font-medium text-gray-900 hover:underline">
                                        Go Premium
                                    </a>
                                    <a
                                        href="#"
                                        className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="flex-shrink-0 relative ml-5">
                                        <div>
                                            <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block py-2 px-4 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    <a
                                        href="#"
                                        className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    >
                                        New Post
                                    </a>
                                </div>
                            </div>
                        </div>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                                <Listbox value={Genre} onChange={setGenre}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Genre === '' ? 'Genre' : Genre}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {genres_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                  {person.name}
                                                                </span>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                )}
                                                                            >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                      </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Quality} onChange={setQuality}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Quality === '' ? 'Quality' : Quality}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {quality_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(

                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                )}
                                                                            >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Sort} onChange={setSort}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Sort === '' ? 'Sort' : Sort}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {sort_by_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    <span className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                    )}
                                                                                    >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                                )}
                                                                            >
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Rating} onChange={setRating}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Rating === '' ? 'Rating' : Rating}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {rating_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    <span className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                    )}
                                                                                    >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                                )}
                                                                            >
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                                    {userNavigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                                <a
                                    href="#"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                                >
                                    New Post
                                </a>

                                <div className="mt-6 flex justify-center">
                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                                        Go Premium
                                    </a>
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>

            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
                            <div className="pb-8 space-y-1">
                                <Listbox value={Genre} onChange={setGenre}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Genre === '' ? 'Genre' : Genre}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {genres_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                  {person.name}
                                                                </span>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                )}
                                                                            >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                      </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Quality} onChange={setQuality}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Quality === '' ? 'Quality' : Quality}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {quality_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(

                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                )}
                                                                            >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Sort} onChange={setSort}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Sort === '' ? 'Sort' : Sort}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {sort_by_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    <span className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                    )}
                                                                                    >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                                )}
                                                                            >
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                                <Listbox value={Rating} onChange={setRating}>
                                    {({ open }) => (
                                        <>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block">
                                                    {Rating === '' ? 'Rating' : Rating}
                                                </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {rating_list.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                    )
                                                                }
                                                                value={person.value}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    <span className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                    )}
                                                                                    >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                                )}
                                                                            >
                                                                    </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                            <div className="pt-10">
                                <p
                                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    id="communities-headline"
                                >
                                    My communities
                                </p>
                                <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
                                    {communities.map((community) => (
                                        <a
                                            key={community.name}
                                            href={community.href}
                                            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                        >
                                            <span className="truncate">{community.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                    <main className="lg:col-span-9 xl:col-span-9">
                        <div className="px-4 sm:px-0">
                            <div className="sm:hidden">
                                <label htmlFor="question-tabs" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="question-tabs"
                                    className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                                    defaultValue={tabs.find((tab) => tab.current).name}
                                >
                                    {tabs.map((tab) => (
                                        <option
                                            onClick={() => setCurrentTab(true)}
                                            onChange={() => setSort(tab.name)}
                                            key={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                                    {tabs.map((tab, tabIdx) => (
                                        <a
                                            key={tab.name}
                                            href={tab.href}
                                            aria-current={tab.current ? 'page' : undefined}
                                            className={classNames(
                                                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                                tabIdx === 0 ? 'rounded-l-lg' : '',
                                                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                            )}
                                        >
                                            <span>{tab.name}</span>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    tab.current ? 'bg-rose-500' : 'bg-transparent',
                                                    'absolute inset-x-0 bottom-0 h-0.5'
                                                )}
                                            />
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h1 className="sr-only">Recent questions</h1>
                            <ListLoading isLoading={appState.loading} movies={appState.movies}/>
                        </div>
                    </main>
                </div>
            </div>
            <nav
                className="bg-white px-4 fixed bottom-0 w-full py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing Page <span className="font-medium">{page}</span> of <span
                        className="font-medium">{Math.trunc(totalMovies / Limit)}</span>
                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                        onClick={() => setPage(page--)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page++)}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Home;
