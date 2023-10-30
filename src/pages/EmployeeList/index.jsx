import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useTable,
    useSortBy,
    usePagination,
} from 'react-table';
import './style.css';

import { employeesMock } from '../../data/mock';
import { Link } from 'react-router-dom';

function EmployeeList() {

    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Date Of Birth',
                accessor: 'dateOfBirth',
                Cell: ({ value }) => {
                    const date = new Date(value);
                    return date.toLocaleDateString();
                },
            },
            {
                Header: 'Start Date',
                accessor: 'startDate',
                Cell: ({ value }) => {
                    const date = new Date(value);
                    return date.toLocaleDateString();
                },
            },
            {
                Header: 'Street',
                accessor: 'street',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'State',
                accessor: 'state',
            },
            {
                Header: 'ZipCode',
                accessor: 'zipCode',
            },
            {
                Header: 'Department',
                accessor: 'department',
            },
        ],
        []
    );

    const employeeData = useSelector((state) => state.employeeSlice.employeeData);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(5); // Initial row size
    const [data, setData] = useState(employeeData);
    const [useMockedData, setUseMockedData] = useState(false); // Local state to toggle data source

    useEffect(() => {
        setData(useMockedData ? employeesMock : employeeData);
    }, [useMockedData, employeeData]);

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize }, // Pass pageSize as part of initialState
        },
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize: currentPageSize }, // Rename pageSize to currentPageSize
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
    } = tableInstance;

    const filteredRows = useMemo(() => {
        return page.filter((row) => {
            return Object.values(row.original).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchQuery.toLowerCase());
                } else if (value instanceof Date) {
                    const formattedDate = value.toLocaleDateString();
                    return formattedDate.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return false;
            });
        });
    }, [page, searchQuery]);

    // Event handler to change the page size
    const handlePageSizeChange = (e) => {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
    };
    useEffect(() => {
        // This code will run after the component re-renders due to state changes
        console.log("page size after", pageSize);
        tableInstance.setPageSize(pageSize);
        gotoPage(0); // Go back to the first page when changing page size
    }, [pageSize, gotoPage, tableInstance]); // Add pageSize as a dependency for the useEffect

    return (
        <div className="full-page">
            <button onClick={() => {
                setUseMockedData(!useMockedData);
                console.log("Current Data:", data);
            }}>
                {useMockedData ? 'Use employeeData' : 'Use mocked data instead'}
            </button>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Dropdown menu for row size */}
            <div className="row-size-dropdown">
                <label htmlFor="row-size-select">Rows per page:</label>
                <select
                    id="row-size-select"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    {[5, 10, 20].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <span className="sort-descending">▼</span>
                                        ) : (
                                            <span className="sort-ascending">▲</span>
                                        )
                                    ) : (
                                        <span className="sort-inactive">▼▲</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {filteredRows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={pageIndex === pageCount - 1}>
                    {'>>'}
                </button>
            </div>
            <Link to="/">Go back to form</Link>
        </div>
    );
}

export default EmployeeList;
