import React, { useState } from "react";
import ReactTable from "react-table";
import { useFetch } from "./hooks";
import Loader from 'react-loader-spinner';
import Dvr from "@material-ui/icons/Dvr";
import Button from "components/CustomButtons/Button.js";


function ManualCase() {
    const [data, loading] = useFetch(
        "/api/resource/Case?fields=[%22*%22]"
    );

    function handleClickView(props){
        alert("hi");
    }

    const filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }
    return (
        <>
            {loading ? (
                <div styles="text-align:center">
                    <Loader
                        type="Bars"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                </div>
            ) : (
                    <ReactTable
                        data={data}
                        showFilters={true}
                        filterable
                        defaultFilterMethod={filterMethod}
                        columns={[
                            {
                                Header: "Case ID",
                                accessor: "name"
                            },
                            {
                                Header: "Name",
                                accessor: "suspect_name"
                            },
                            {
                                Header: "Dzongkhag",
                                accessor: "dzongkhag"
                            },
                            {
                                Header: "Assigned To",
                                accessor: "assignee_mobile_no"
                            },
                            {
                                Header: "Case Type",
                                accessor: "case_type"
                            },
                            {
                                Header: "Actions",
                                accessor: "status",
                                Cell: ({ status }) => (
                                    <>
                                        <Button
                                            justIcon
                                            round
                                            simple
                                            color="warning"
                                            className="edit"
                                            onClick={handleClickView}
                                        >
                                            <Dvr />
                                        </Button>{" "}
                                    </>
                                ),
                                sortable: false,
                                filterable: false
                            }
                        ]}
                        defaultPageSize={5}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                    />
                )}
        </>
    );
}
export default ManualCase;