import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import CommonService from "../services/CommonService";
import { Toast } from "primereact/toast";
import axios from "axios";
import { localUrl } from "../services/AppSettings";
import { FileUpload } from "primereact/fileupload";

const ManagerProfile = () => {
  const userid = window.sessionStorage.getItem("userid") as any;
  const username = window.sessionStorage.getItem("username");
  const usertype = window.sessionStorage.getItem("usertype");
  const useremail = window.sessionStorage.getItem("email");
 const [getGuadianInfo,setGuardianInfo]=useState<any[]>([]);
const [imageUrl, setImageUrl] = useState<any>(null);
const [id,setId]=useState('');
 const [addedFlag,setAddedFlag]=useState(false);
 console.log("ADDED",addedFlag)
const getGData = async()=>{
    try{
    const apiname = "manager/profile1";
    const payload = { q:2,userid:userid};
    const response = await CommonService.postData(payload, apiname);
    if(response.success){
    setGuardianInfo(response.data);
    setAddedFlag(response.addedflag);
    setId(response.data[0]?.guardian_id )
    setG_name(response.data[0]?.guardian_name)
    setG_relation(response.data[0]?.guardian_relation)
    setG_phone(response.data[0]?.guardian_phone)
    setG_address(response.data[0]?.guardian_address)
    setG_email(response.data[0]?.guardian_email)
    setImageUrl(`${localUrl}/uploads/${response.userimage}`)
    }
    }catch(error){
        console.error("Error fetching manager data:", error);
    }
}
useEffect(()=>{
    getGData();
},[]);

  const onUpload = async (event:any) => {
    const file = event.files[0];

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userid", userid);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/manager/upload-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      if(response){

     getGData();
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };


  //add guardian
  const [g_name,setG_name]=useState('');
  const [g_relation,setG_relation]=useState('');
  const [g_phone,setG_phone]=useState('');
  const [g_address,setG_address]=useState('');
  const [g_email,setG_email]=useState('');
  const toast = useRef<Toast>(null);
  const AddGuardianInfo = async ()=>{
    try{
        const userid = window.sessionStorage.getItem('userid')
        const apiname = "manager/profile";
        const payload = {
            g_name:g_name,g_email:g_email,g_relation:g_relation,g_phone:g_phone,g_address:g_address,userid:userid,q:1
        }
        const response = await CommonService.postData(payload,apiname);
        if(response.success){
            toast.current?.show({
                severity:'success',
                summary:'Success',
                detail:response.message,
                life:3000
            });
        }else{
             toast.current?.show({
                severity:'info',
                summary:'Info',
                detail:"Please Check All the feilds",
                life:3000
            });
        }
    }catch (error) {
        console.error("Error adding department:", error);
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while delete the department. Please try again.',
            life: 3000
        });
    }        
  }
  
//edit mode
  const [editMode, setEditMode] = useState(false);
const UpdateGuardian = async ()=>{
    try{
      if(id){
        const userid = window.sessionStorage.getItem('userid')
        const apiname = "manager/updateprofile";
        const payload = {
            g_name:g_name,g_email:g_email,g_relation:g_relation,g_phone:g_phone,g_address:g_address,userid:userid,g_id:id
        }
        const response = await CommonService.postData(payload,apiname);
        if(response.success){
            toast.current?.show({
                severity:'success',
                summary:'Success',
                detail:response.message,
                life:3000
            });
        }
      }
        else{
             toast.current?.show({
                severity:'info',
                summary:'Info',
                detail:"Please Check All the feilds",
                life:3000
            });
        }
        setEditMode(false)
    }catch (error) {
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
   <div className="container-fluid mt-4 px-4">
  <div className="row g-4">

   <div className="col-lg-4 col-md-5">
  <Card
    className="shadow border-0 text-center p-4"
    style={{ borderRadius: "18px" }}
  >
    {/* Profile Image */}
    <div className="mb-3">
      <img
        src={
          imageUrl ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="Profile"
        className="rounded-circle shadow-sm"
        style={{
          width: "160px",
          height: "160px",
          objectFit: "cover",
          border: "4px solid #f8f9fa"
        }}
      />
    </div>

    {/* Upload Button */}
    <FileUpload
      mode="basic"
      name="profileImage"
      accept="image/*"
      maxFileSize={2000000}
      customUpload
      auto
      uploadHandler={onUpload}
      chooseLabel="Change Photo"
      className="mb-4"
    />

    {/* Divider */}
    <hr />

    {/* User Info */}
    <h6 className="fw-bold text-primary mb-3">
      <i className="pi pi-user me-2"></i> User Information
    </h6>

    <div className="text-start mb-3">
      <label className="form-label fw-semibold small text-muted">
        Full Name
      </label>
      <InputText value={username} className="w-100" disabled />
    </div>

    <div className="text-start mb-3">
      <label className="form-label fw-semibold small text-muted">
        Email Address
      </label>
      <InputText value={useremail} className="w-100" disabled />
    </div>

    <div className="text-start">
      <label className="form-label fw-semibold small text-muted">
        User Type
      </label>
      <InputText value={usertype} className="w-100" disabled />
    </div>
  </Card>
</div>

    {/* ================= RIGHT SIDE - GUARDIAN INFO ================= */}
    <div className="col-lg-8 col-md-7">
      <Card className="shadow border-0 h-100" style={{ borderRadius: "15px" }}>

      <h6 className="fw-bold text-success mb-4 border-bottom pb-2 d-flex justify-content-between align-items-center">
        <span>
          <i className="pi pi-users me-2"></i> Guardian Information
        </span>
          {addedFlag  && (
          <Button
            icon="pi pi-pencil"
            rounded
            raised
            text
            severity="secondary"
            onClick={() => setEditMode(!editMode)}
          />
          )}
      </h6>

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label fw-semibold">Guardian Name</label>
            <InputText className="w-100" placeholder="Enter guardian name" value={g_name} onChange={(e)=>setG_name(e.target.value)}   disabled={!editMode} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Relation</label>
            <InputText className="w-100" placeholder="Father / Mother / Spouse" value={g_relation} onChange={(e)=>setG_relation(e.target.value)} disabled={!editMode}/>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Guardian Email</label>
            <InputText className="w-100" placeholder="Enter guardian email" value={g_email} onChange={(e)=>setG_email(e.target.value)} disabled={!editMode} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Guardian Phone</label>
            <InputText type="number" className="w-100" placeholder="Phone number" value={g_phone} onChange={(e)=>setG_phone(e.target.value)} disabled={!editMode}/>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Address</label>
            <InputText className="w-100" placeholder="Enter full address" value={g_address} onChange={(e)=>setG_address(e.target.value)} disabled={!editMode} />
          </div>

        </div>

        <div className="d-flex justify-content-end mt-4">
            {!addedFlag  && (
          <Button
            label="Add Guardian Info"
            icon="pi pi-plus"
            className="p-button-success px-4 rounded-pill"
            onClick={AddGuardianInfo}
          />
            )}
          {editMode && (
          <Button
            label="Update"
            icon="pi pi-refresh"
            className="p-button-info px-4"
            onClick={UpdateGuardian}
          />
            )}
        </div>

      </Card>
    </div>

  </div>
  <Toast ref={toast}></Toast>
</div>
  );
};

export default ManagerProfile;