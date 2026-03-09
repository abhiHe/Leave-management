import React, { use, useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import CommonService from '../services/CommonService';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import '../styles/department.css';
        
const AdminDepartment = () => {

const [data, setData] = useState<[]>([]);
console.log("Manager Data:", data);
const ManagerData = async()=>{
    try{
    const apiname = "admin/managers";
    const payload = { q:1};
    const response = await CommonService.postData(payload, apiname);
    setData(response.data);
    }catch(error){
        console.error("Error fetching manager data:", error);
    }
}
const [departmentsTableData,setDepartmentsTableData]=useState<[]>([]);
const getDeparmentsData = async()=>{
    try{
    const apiname = "admin/managers";
    const payload = { q:3};
    const response = await CommonService.postData(payload, apiname);
    setDepartmentsTableData(response.data);
    }catch(error){
        console.error("Error fetching manager data:", error);
    }
}
useEffect(() => {
    ManagerData();
    getDeparmentsData();
}, []);

//add 
const [manager,setManager] = useState("");
const [department,setDepartment] = useState("");
const [AddDialog, setAddDialog] = useState(false);
function close(){
    setAddDialog(false);
    setDepartment("");
    setManager("");
}
const toast = useRef<Toast>(null);
const AddDepartmentData = async () => {
    try {
        const payload = {managerid: manager,department: department,q: 2};
        const response = await CommonService.postData(payload, "admin/managers");
        if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getDeparmentsData();
            setAddDialog(false);
            setDepartment('');
            setManager('');
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: response.message,
                life: 3000
            });
        }
    } catch (error) {
        console.error("Error adding department:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while adding the department. Please try again.',
            life: 3000
        });
    }
};
//edit 
const [editDialog,setEditDialog]=useState(false);
const [editData,setEditData]=useState({
   departmentid:'',
   departmentName:'',
   managerName:'', 
});
const StoreAndEditData = (rowData: any) => {
    console.log("rowData",rowData)
    setEditData({
        departmentid: rowData.department_id,
        departmentName: rowData.depatment_name, // adjust field name
        managerName: rowData.managerid       // adjust field name
    });

    // Open your edit dialog
    setEditDialog(true); // assuming you have a state to show the edit dialog
};

const UpdateDepartment = async() =>{
  try {
      const {departmentid,departmentName,managerName}=editData;
      const apiname = 'admin/managers';
      const payload = {managerid: managerName,department_name: departmentName,department_id:departmentid,q: 4};
      const response = await CommonService.postData(payload,apiname);
      if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getDeparmentsData();
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
        console.error("Error adding department:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while adding the department. Please try again.',
            life: 3000
        });
    }
}

const [deleteDialog,setDeleteDialog]=useState(false);
const [deletedata,setDeletedata]=useState({
   departmentid:'',
});
const Delete = (rowData:any) =>{
  setDeletedata({
    departmentid:rowData.department_id
  })
  setDeleteDialog(true)
}
const DeleteDepartment = async() =>{
  try {
      const {departmentid}=deletedata;
      const apiname = 'admin/managers';
      const payload = {department_id:departmentid,q: 5};
      const response = await CommonService.postData(payload,apiname);
      if (response.success) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.message,
                life: 3000
            });
            getDeparmentsData();
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
        console.error("Error adding department:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while delete the department. Please try again.',
            life: 3000
        });
    }
}
  return (
    <div className="card shadow-sm m-4">

  {/* Header Section */}
  <div className="d-flex justify-content-between align-items-center px-4 pt-4">
    <h5 className="mb-0 fw-semibold">
      <i className="pi pi-building me-2 text-primary"></i>
      Department Details
    </h5>

    <Button
      label="Add Department"
      icon="pi pi-plus"
    //   className="p-button-primary"
      severity="success"
      raised
      onClick={() => setAddDialog(true)}
    />
  </div>

  <hr className="my-3" />

  {/* Table Section */}
  <div className='container-fluid mt-3'>
  <div className="card shadow-sm p-3">
    <DataTable value={departmentsTableData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }} showGridlines stripedRows >
      <Column header="Sl.No" body={(rowData, options) => options.rowIndex + 1} />
      <Column field="depatment_name" header="Department" />
      <Column field="manager_name" header="Manager" />
      <Column
        header="Actions"
        body={(rowData) => (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text raised severity="info" tooltip="Edit" className="custom-edit-btn" onClick={()=>StoreAndEditData(rowData)} />
                <Button icon="pi pi-trash" className="custom-delete-btn" rounded text raised severity="danger" tooltip="Delete" onClick={()=>Delete(rowData)} />
            </div>
        )}
        style={{ width: "150px" }}
    />
    </DataTable>
  </div>
  </div>
  <Dialog
  header="Add Department"
  visible={AddDialog}
  modal
  blockScroll
  style={{ width: "40rem" }}
  onHide={() => setAddDialog(false)}
  className="p-fluid"
>
  <div className="p-3">

    {/* Manager Dropdown */}
    <div className="field mb-4">
      <label htmlFor="manager" className="fw-semibold mb-2">
        Manager
      </label>
      <Dropdown
        id="manager"
        value={manager}
        options={data}
        optionLabel='managername'
        optionValue='managerid'
        onChange={(e) => setManager(e.value)}
        placeholder="Select Manager"
        className="w-100"
        appendTo="self"
      />
    </div>

    {/* Department Input */}
    <div className="field mb-4">
      <label htmlFor="department" className="fw-semibold mb-2">
        Department
      </label>
      <InputText
        id="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="Enter Department Name"
        className="w-100"
      />
    </div>

    {/* Footer Buttons */}
    <div className="d-flex justify-content-end gap-2 mt-4">
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={close}
      />

      <Button
        label="Add"
        icon="pi pi-check"
        className="p-button-success"
        onClick={AddDepartmentData}
      />
    </div>

  </div>
</Dialog>

<Dialog
  header="Edit Department"
  visible={editDialog}
  modal
  blockScroll
  style={{ width: "40rem" }}
  onHide={() => setEditDialog(false)}
  className="p-fluid"
>
  <div className="p-3">

    {/* Manager Dropdown */}
    <div className="field mb-4">
      <label htmlFor="manager" className="fw-semibold mb-2">
        Manager
      </label>
      <Dropdown
        id="manager"
        value={editData.managerName}
        options={data}
        optionLabel='managername'
        optionValue='managerid'
        onChange={(e) => setEditData({...editData,managerName:e.value})}
        placeholder="Select Manager"
        className="w-100"
        appendTo="self"
      />
    </div>

    {/* Department Input */}
    <div className="field mb-4">
      <label htmlFor="department" className="fw-semibold mb-2">
        Department
      </label>
      <InputText
        id="department"
        value={editData.departmentName}
        onChange={(e) => setEditData({...editData,departmentName:e.target.value})}
        placeholder="Enter Department Name"
        className="w-100"
      />
    </div>

    {/* Footer Buttons */}
    <div className="d-flex justify-content-end gap-2 mt-4">
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={()=>setEditDialog(false)}
      />

      <Button
        label="Update"
        icon="pi pi-check"
        className="p-button-info"
        onClick={UpdateDepartment}
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
      onClick={DeleteDepartment}
    />
  </div>
</Dialog>
<Toast ref={toast} />
</div>
  )
}

export default AdminDepartment