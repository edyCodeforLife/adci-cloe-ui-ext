import moment from 'moment';
import React, { Fragment, memo } from 'react';
import { Table } from 'reactstrap';
import './table.scss'

function _CustomTable(props) {
	const {
		configTable,
		tag,
		jobNumber,
		amount,
		companyName,
		size,
		bordered,
		borderless,
		striped,
		dark,
		hover,
		responsive,
		redirectTo,
		isNoNeedDetails,
		moreDetails
	} = props;
	return (<>
		<Table
			tag={tag}
			size={size}
			bordered={bordered}
			borderless={borderless}
			dark={dark}
			hover={hover}
			responsive={responsive}
			className='tableStatic'
		>
			<thead>
				<tr>
					{configTable?.title?.map((item, idx) => (
						<th key={idx}>
							{item}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{
					configTable?.data?.length == 0 ?
						<tr>
							<td className='center-text' colSpan={configTable?.title?.length}>Empty Data</td>
						</tr> : null
				}
				{configTable?.data?.map((data, idx) => (
					<tr key={idx} onClick={() => redirectTo(data?.loanLimitRequestId)}>
						<td>{idx + 1}</td>
						{
							jobNumber ?
								<th scope="row">{data?.jobNumber}</th> : null
						}
						<th scope="row">{data?.loanLimitRequestId}</th>
						{
							companyName ?
								<td>{data?.companyName}</td> : null
						}
						<td>{data?.customerName}</td>
						<td>{data?.createdDate}</td>
						<td>{data?.updatedDate}</td>
						{
							amount ?
								<td>{data?.amount.toLocaleString()}</td> : null
						}
						<td>{data?.statusDesc}</td>
					</tr>
				))}

			</tbody>
		</Table>
	</>);
}

export const CustomTable = memo(_CustomTable);