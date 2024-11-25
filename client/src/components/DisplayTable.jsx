import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
    const table = useReactTable({
        data,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="p-2">
            <table className="w-full px-0 py-0 border-collapse">
                <thead className="text-white bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            <th>Sr.No</th>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border ">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id}>
                            <td className="px-2 py-1 border">{index + 1}</td>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-2 py-1 border">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default DisplayTable;
