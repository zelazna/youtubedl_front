import Download from '@mui/icons-material/Download';
import {
    Chip,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import React from 'react';

import { RequestInterface, RequestState } from '../../context/RequestsContext';
import TablePaginationActions from './TablePaginationActions';

const ChipMapping = new Map<string, string>([
    [RequestState.error, "error"],
    [RequestState.pending, "primary"],
    [RequestState.done, "success"]
]);

type ChipColor = "error" | "primary" | "success";


interface ContainerProps {
    requests: RequestInterface[];
}

export const Container = ({ requests }: ContainerProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>Url</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : requests
                    ).map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>
                                {request.download
                                    ? moment(request.download.created_at).format("MMM Do YY")
                                    : null}
                            </TableCell>
                            <TableCell>
                                <Link color="primary" href={request.url}>
                                    {request.url}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {request.download
                                    ? request.download.name.substring(0, 10)
                                    : null}
                            </TableCell>
                            <TableCell align="right">
                                <Chip
                                    label={request.state}
                                    color={ChipMapping.get(request.state) as ChipColor}
                                />
                            </TableCell>
                            <TableCell>
                                {request.download ? (
                                    <IconButton
                                        aria-label="download"
                                        component={Link}
                                        href={request.download.url}
                                        download
                                    >
                                        <Download />
                                    </IconButton>
                                ) : null}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={requests.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}