// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import { iIngredients } from '../interfaces/iIngredients';

// export const TableComponent = ({props}: {props: iIngredients}) => {
//     <Table aria-label="simple table">
//         <TableHead>
//             <TableRow>
//             <TableCell sx={{ fontWeight: 'bold' }} scope="col">#</TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} scope="col">Recipe Name</TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} scope="col">Description</TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} scope='col'>Category</TableCell>
//             <TableCell sx={{ fontWeight: 'bold' }} scope="col">Date Added</TableCell>
//             <TableCell scope="col"></TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             { filteredProducts !== null? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
//             <TableRow
//             key={product.id}
//             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//             <TableCell sx={{ fontSize: '1.1rem' }} scope="row">{page * rowsPerPage + index + 1}</TableCell>

//             <TableCell sx={{ fontSize: '1.1rem' }}><Link to={`/product`} state={{currentProduct: product}} >{product.title}</Link></TableCell>

//             <TableCell sx={{ fontSize: '1.1rem' }}>{product.summary}</TableCell>
//             <TableCell sx={{ fontSize: '1.1rem' }}>{product.category? product.category.title:''}</TableCell>
//             <TableCell sx={{ fontSize: '1.1rem' }}>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
//             <TableCell align='center'>
//                 <IconButton color='secondary' onClick={() => handleConfirmOpen(product.id)}>
//                     <DeleteIcon />
//                 </IconButton>
//                 <IconButton color='secondary' onClick={() => handleClickOpenEdit(product)}>
//                     <EditIcon />
//                 </IconButton>
//             </TableCell>
//             </TableRow>
//             ) ): (<TableRow><TableCell>Loading... </TableCell></TableRow>)}
//         </TableBody>
//     </Table>

// }