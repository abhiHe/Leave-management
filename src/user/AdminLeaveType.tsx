import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CommonService from '../services/CommonService';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';

const AdminLeaveType = () => {
    const [LeaveTypeTableData,setLeaveTypeTableData]=useState<[]>([]);
const getLeaveTypeData = async()=>{
    try{
    const apiname = "admin1/leavetype";
    const payload = { q:1};
    const response = await CommonService.postData(payload, apiname);
    setLeaveTypeTableData(response.data);
    }catch(error){
        console.error("Error fetching manager data:", error);
    }
}
const formatDate = (date:any) => {
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
};
const statusBodyTemplate = (rowData:any) => {
    return (
        <span 
            className={`badge ${
                rowData.is_active == 1 
                    ? "bg-success" 
                    : "bg-danger"
            }`}
        >
            {rowData.is_active == 1 ? "Active" : "Inactive"}
        </span>
    );
};
useEffect(() => {
    getLeaveTypeData();
}, []);
    const [leaveType, setLeaveType] = useState("");
    const [maxDays, setMaxDays] = useState('');
    const [AddLeaveData,setAddLeaveData]=useState<[]>([]);
    const toast = useRef<Toast>(null)
    const AddLeaveType = async()=>{
        if(!leaveType || !maxDays){
            return toast.current?.show({
                severity:'info',
                summary:'Warning',
                detail:'Please Enter All the Feilds!',
                life:3000
            })
        }
        try{
            const apiname = 'admin1/leavetype';
            const payload = {leavename:leaveType,maxdays:maxDays,q:2};
            const response = await CommonService.postData(payload,apiname);
            setAddLeaveData(response);
             if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getLeaveTypeData();
            setLeaveType('');
            setMaxDays('');
          }else{
             toast.current?.show({
                severity: 'info',
                summary: 'Warning',
                detail: response.message,
                life: 3000
            });
            setLeaveType('');
            setMaxDays('');
          }
      } catch (error) {
        console.error("Error adding department:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while delete the department. Please try again.',
            life: 3000
        });
    }        
    }

    //edit 
    const [editDialog,setEditDialog]=useState(false);
    const statusOptions = [
        { label: "Active", value: 1 },
        { label: "Inactive", value: 0 }
        ];
    const [editData,setEditData]=useState({
       leavetypeid:'',
       leavetype:'',
       maxdays:'', 
       isActive:1,
    });
    const StoreAndEditData = (rowData: any) => {
        setEditData({
            leavetypeid: rowData.leave_type_id,
            leavetype: rowData.leave_name, 
            maxdays: rowData.max_days,
            isActive:rowData.is_active     
        });
        setEditDialog(true);
    };
    const UpdateLeaveType = async() =>{
  try {
      const {leavetypeid,leavetype,maxdays,isActive}=editData;
      const apiname = 'admin1/leavetype';
      const payload = {leave_id: leavetypeid,leavename: leavetype,maxdays:maxdays,q: 3};
      const response = await CommonService.postData(payload,apiname);
      if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getLeaveTypeData();
            setEditDialog(false)
          }else{
             toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: response.message,
                life: 3000
            });
          }
      } catch (error) {
        console.error("Error adding Leave Type:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while adding the Leave Type. Please try again.',
            life: 3000
        });
    }
}
const [deleteDialog,setDeleteDialog]=useState(false);
const [collapsed, setCollapsed] = useState(true);
const [deletedata,setDeletedata]=useState({
   leaveid:'',
});
const Delete = (rowData:any) =>{
  setDeletedata({
    leaveid:rowData.leave_type_id
  })
  setDeleteDialog(true)
}
const DeleteLeaveType = async() =>{
  try {
      const {leaveid}=deletedata;
      const apiname = 'admin1/leavetype';
      const payload = {leave_id:leaveid,q:4};
      const response = await CommonService.postData(payload,apiname);
      if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getLeaveTypeData();
            setDeleteDialog(false)
          }else{
             toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: response.message,
                life: 3000
            });
          }
      } catch (error) {
        console.error("Error adding Leave Type:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while delete the Leave Type. Please try again.',
            life: 3000
        });
    }
}
  return (
    <div className="card shadow-sm m-4">
    <div className="d-flex justify-content-between align-items-center px-4 pt-4">
        <h5 className="mb-0 fw-semibold">
        <i className="pi pi-calendar-clock me-2 text-primary"></i>
        Leave Type
        </h5>
    </div>

  <hr className="my-3" />
  <div className="container-fluid mt-3">
  <Panel
    header="Add Leave Type"
    toggleable
    collapsed={collapsed}
    onToggle={(e) => setCollapsed(e.value)}
    className="mb-4 shadow-sm"
  >
    <div className="p-3">
      <div className="row g-4">

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Leave Type
          </label>
          <InputText
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            placeholder="Enter leave type"
            className="w-100"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Max Number of Days
          </label>
          <InputText
            value={maxDays}
            type="number"
            onChange={(e) => setMaxDays(e.target.value)}
            placeholder="Enter number of days"
            className="w-100"
          />
        </div>

      </div>

      <div className="d-flex justify-content-end mt-4">
        <Button
          label="Add Leave Type"
          icon="pi pi-plus"
          className="p-button-success px-4"
          onClick={AddLeaveType}
        />
      </div>
    </div>
  </Panel>

  <div className="card shadow-sm p-3">
    <DataTable
      value={LeaveTypeTableData}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      showGridlines
      stripedRows
    >
      <Column header="Sl.No" body={(rowData, options) => options.rowIndex + 1} />
      <Column field="leave_name" header="Leave Name" />
      <Column field="max_days" header="Max Days" />
      <Column
        field="created_at"
        header="Created At"
        body={(rowData) => formatDate(rowData.created_at)}
      />
      <Column
        field="is_active"
        header="Status"
        body={statusBodyTemplate}
      />
      <Column
        header="Actions"
        body={(rowData) => (
          <div className="d-flex gap-2">
            <Button icon="pi pi-pencil" rounded text raised severity="info" />
            <Button icon="pi pi-trash" rounded text raised severity="danger" />
          </div>
        )}
      />
    </DataTable>
  </div>

</div>
    <Dialog
  header="Edit Leave Type"
  visible={editDialog}
  modal
  blockScroll
  style={{ width: "35rem" }}
  onHide={() => setEditDialog(false)}
  className="p-fluid"
>
  <div className="p-3">

    {/* Leave Type */}
    <div className="field mb-4">
      <label className="fw-semibold mb-2">
        Leave Type
      </label>
      <InputText
        value={editData.leavetype}
        onChange={(e) =>
          setEditData({ ...editData, leavetype: e.target.value })
        }
        placeholder="Enter Leave Type"
        className="w-100"
      />
    </div>

    {/* Max Days */}
    <div className="field mb-4">
      <label className="fw-semibold mb-2">
        No of Days
      </label>
      <InputText
        type='number'
        value={editData.maxdays}
        onChange={(e) =>
          setEditData({ ...editData, maxdays: e.target.value })
        }
        placeholder="Enter number of days"
        min={1}
        className="w-100"
      />
    </div>

    {/* Status Dropdown */}
    <div className="field mb-4">
      <label className="fw-semibold mb-2">
        Status
      </label>
      <Dropdown
        value={editData.isActive}
        options={statusOptions}
        onChange={(e) =>
          setEditData({ ...editData, isActive: e.value })
        }
        placeholder="Select Status"
        className="w-100"
      />
    </div>

    {/* Footer Buttons */}
    <div className="d-flex justify-content-end gap-2 mt-4">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => setEditDialog(false)}
      />

      <Button
        label="Update"
        icon="pi pi-check"
        className="p-button-primary"
        onClick={UpdateLeaveType}
      />
    </div>

  </div>
</Dialog>
<Dialog
  header="Confirm Delete"
  visible={deleteDialog}
  modal
  blockScroll
  style={{ width: "30rem" }}
  onHide={() => setDeleteDialog(false)}
  className="p-fluid"
>
  <div className="p-3 text-center">
    <i 
      className="pi pi-exclamation-triangle text-warning mb-3"
      style={{ fontSize: "2rem" }}
    ></i>

    <h5>Are you sure you want to delete this department?</h5>
  </div>

  {/* Footer Buttons */}
  <div className="d-flex justify-content-end gap-2 mt-4">
    <Button
      label="Cancel"
      icon="pi pi-times"
      className="p-button-secondary"
      onClick={() => setDeleteDialog(false)}
    />

    <Button
      label="Delete"
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={DeleteLeaveType}
    />
  </div>
</Dialog>
  <Toast ref={toast}></Toast>
</div>
  )
}

export default AdminLeaveType