import React, { useEffect, useRef, useState } from "react";
import "../styles/register.css";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import CommonService from "../services/CommonService";

const Register = () => {

  const Roles = [
    { value: "manager", label: "Manager", icon: "pi pi-briefcase" },
    { value: "employee", label: "Employee", icon: "pi pi-user" },
    { value: "teamlead", label: "Team Lead", icon: "pi pi-users" },
  ]
  const [getManagerList, setManagerList] = useState<any[]>([])
  const getDepartmentList = async () => {
    const apiname = "users/getmanagers";
    const payload = {}
    const response = await CommonService.postData(payload, apiname);
    if (response) {
      setManagerList(response.data);
    }
  }
  useEffect(() => {
    getDepartmentList();
  }, [])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    manager: "",
    password: "",
    confirmPassword: ""
  });
  const toast = useRef<Toast>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return toast.current?.show({ severity: "error", summary: "Password Mismatch", detail: "Password and Confirm Password do not match", life: 3000 });

    try {
      const response = await CommonService.postData({
        firstname: formData.name,
        email: formData.email,
        usertype: formData.role,
        // department: formData.department,
        ...(formData.role !== "manager" && { department: formData.department }),
        password: formData.password,
        ...(formData.role !== "manager" && { manager: formData.manager })
      }, "users/register");

      toast.current?.show({
        severity: response.success ? "success" : "error",
        summary: response.success ? "Registration Successful" : "Registration Failed",
        detail: response.message,
        life: 3000
      });
      if (response.success)
        setFormData({ name: "", email: "", role: "", department: "", manager: "", password: "", confirmPassword: "" });
    } catch {
      toast.current?.show({ severity: "error", summary: "Server Error", detail: "Something went wrong. Please try again.", life: 3000 });
    }
  };
  //for icon templete
  const roleOptionTemplate = (option: any) => {
    return (
      <div className="d-flex align-items-center">
        <i className={`${option.icon} me-2`}></i>
        <span>{option.label}</span>
      </div>
    );
  };

  const selectedRoleTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="d-flex align-items-center">
          <i className={`${option.icon} me-2`}></i>
          <span>{option.label}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  return (
    <div className="container-fluid login-page d-flex justify-content-center align-items-center vh-100">
      <div
        className="card border-0 shadow-lg rounded-4 p-5 bg-white"
        style={{ width: "100%", maxWidth: "850px" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary mb-1">
            <i className="pi pi-user-plus me-2"></i>
            Create Account
          </h3>
          <small className="text-muted">
            Register a new employee account
          </small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name</label>
              <span className="p-input-icon-left w-100">
                <i className="pi pi-user ml-3"></i>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <span className="p-input-icon-left w-100">
                <i className="pi pi-envelope ml-3"></i>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>

            {/* Role */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Role</label>
              <Dropdown
                value={formData.role}
                options={Roles}
                optionLabel="label"
                optionValue="value"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.value })
                }
                placeholder="Select Role"
                className="w-100"
                itemTemplate={roleOptionTemplate}
                valueTemplate={selectedRoleTemplate}
              />
            </div>

            {/* Department */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Department</label>
              <Dropdown
                value={formData.department}
                options={getManagerList}
                optionLabel="depatment_name"
                optionValue="department_id"
                onChange={(e) => {
                  const selectedDept = e.value;

                  const manager = getManagerList.find(
                    (item: any) => item.department_id === selectedDept
                  );

                  setFormData({
                    ...formData,
                    department: selectedDept,
                    manager: manager?.managerid || null
                  });
                }}
                placeholder="Select Department"
                className="w-100"
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Password</label>
              <span className="p-input-icon-left w-100">
                <i className="pi pi-lock ml-3"></i>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>

            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>
              <span className="p-input-icon-left w-100">
                <i className="pi pi-shield ml-3"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-lg text-center"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>

            {/* Manager (Conditional) */}
            {formData.role !== "manager" && (
              <div className="col-md-6">
                <label className="form-label fw-semibold">Manager</label>
                <Dropdown
                  value={formData.manager}
                  options={getManagerList.filter(
                    (item:any) => item.department_id === formData.department
                  )}
                  optionLabel="managerName"
                  optionValue="managerid"
                  onChange={(e) =>
                    setFormData({ ...formData, manager: e.value })
                  }
                  placeholder="Select Manager"
                  className="w-100"
                  disabled
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="col-12 mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold shadow-sm"
              >
                <i className="pi pi-check me-2"></i>
                Register Employee
              </button>
            </div>

          </div>
        </form>
      </div>
      <Toast ref={toast}></Toast>
    </div>
  );
};

export default Register;