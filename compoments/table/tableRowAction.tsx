"use client";
// import { useDeleteServiceMutation } from "@/redux/services/services";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function TableRowAction({
  id,
  viewUrl = "",
  viewHandler,
  editUrl = "",
  deleteModalView = "",
  joinMeetingHandler,
}: {
  id: string;
  viewUrl?: string;
  viewHandler?: () => void;
  editUrl?: string;
  deleteModalView?: string;
  joinMeetingHandler?: () => void;
}) {
  const router = useRouter();

  // const [deleteService] = useDeleteServiceMutation();

  // const deleteModalViews = [
  //   {
  //     view: "DELETE_SERVICE",
  //     handler: async () => {
  //       try {
  //         await deleteService(id).unwrap();
  //         toast.success("Service deleted successfully");
  //       } catch (err: any) {
  //         console.log("err=>", err);
  //         toast.error(err?.data?.message);
  //       }
  //     },
  //     text: "The service will be deleted permanently!",
  //   },
  // ];

  // const deleteHandler = async () => {
  //   const currentDeleteModalView = deleteModalViews.find(
  //     (x) => x.view == deleteModalView
  //   );
  //   if (currentDeleteModalView)
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: currentDeleteModalView.text,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#2B5583",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then(async (result) => {
  //       // if (result.isConfirmed) {
  //       //   // Swal.fire(currentDeleteModalView.successMessage);
  //       // }
  //       if (result.isConfirmed) currentDeleteModalView.handler();
  //     });
  // };

  return (
    <div className="btn-group">
      {viewUrl && viewUrl !== "" && (
        <button
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="tooltip"
          ata-bs-placement="top"
          title=""
          data-bs-original-title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      )}

      {viewHandler && typeof viewHandler == "function" && (
        <button
          onClick={viewHandler}
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="tooltip"
          ata-bs-placement="top"
          title=""
          data-bs-original-title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      )}

      {editUrl && editUrl !== "" && (
        <button
          className="btn btn-outline-secondary btn-sm"
          data-bs-toggle="tooltip"
          ata-bs-placement="top"
          title=""
          data-bs-original-title="Edit"
          onClick={() => router.push(editUrl)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      )}

      {deleteModalView && deleteModalView !== "" && (
        <button
          className="btn btn-outline-danger btn-sm"
          data-bs-toggle="tooltip"
          ata-bs-placement="top"
          title=""
          data-bs-original-title="Delete"
          // onClick={deleteHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}

      {joinMeetingHandler && typeof joinMeetingHandler == "function" && (
        <button
          className="btn btn-outline-success btn-sm"
          data-bs-toggle="tooltip"
          ata-bs-placement="top"
          title=""
          data-bs-original-title="Delete"
          onClick={joinMeetingHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-phone"
          >
            <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.37 19.88 19.88 0 0 1-6-6A19.88 19.88 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.57 2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.57.57 2 2 0 0 1 1.72 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default TableRowAction;
