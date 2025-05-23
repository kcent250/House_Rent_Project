import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

export default function Properties() {
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: properties, isLoading } = useQuery(['properties', searchTerm], async () => {
    const response = await axios.get(`http://localhost:8081/api/properties?search=${searchTerm}`);
    return response.data;
  });

  const columns = [
    { Header: 'Address', accessor: 'address' },
    { Header: 'Bedrooms', accessor: 'bedrooms' },
    { Header: 'Rent', accessor: 'rent', Cell: ({ value }: { value: number }) => `$${value}` },
    { Header: 'Status', accessor: 'available', 
      Cell: ({ value }: { value: boolean }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Available' : 'Occupied'}
        </span>
      )
    }
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data: properties || [],
      initialState: { pageIndex: 0, pageSize }
    },
    useGlobalFilter,
    usePagination
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Property
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setTablePageSize(Number(e.target.value));
              }}
              className="border rounded px-2 py-1"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {'<<'}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {'<'}
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {'>'}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}