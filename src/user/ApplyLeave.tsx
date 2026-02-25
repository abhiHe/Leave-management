import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
const ApplyLeave = () => {
  const [type, setType] = useState(null);
  const [dates, setDates] = useState<any>(null);
  const [reason, setReason] = useState('');
  const leaveOptions = [
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Casual Leave', value: 'casual' }, 
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
    { label: 'Bereavement Leave', value: 'bereavement' },
    { label: 'Unpaid Leave', value: 'unpaid' },
  ];
  return (
   <div className="container-fluid">
    <div className="card shadow-2 border-round-xl p-4">

        {/* Header */}
        <div className="mb-4">
            <h2 className="m-0 mb-1">Apply for Leave</h2>
            <small className="text-color-secondary">
                Fill in the details below to submit your leave request.
            </small>
        </div>

        {/* Side by Side Row */}
        <div className="flex gap-4 mb-3">

            {/* Leave Type */}
            <div className="flex-1">
                <label className="font-medium block mb-2">
                    Leave Type *
                </label>
                <Dropdown
                    value={type}
                    options={leaveOptions}
                    onChange={(e) => setType(e.value)}
                    placeholder="Select Leave Type"
                    className="w-full"
                />
            </div>

            {/* Leave Duration */}
            <div className="flex-1">
                <label className="font-medium block mb-2">
                    Leave Duration *
                </label>
                <Calendar
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    showIcon
                    placeholder="Select Date Range"
                    className="w-full"
                />
            </div>

        </div>

        {/* Reason */}
        <div className="mb-4">
            <label className="font-medium block mb-2">
                Reason for Leave *
            </label>
            <InputTextarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                autoResize
                placeholder="Enter your reason..."
                className="w-full"
            />
        </div>

        {/* Buttons */}
        <div className="flex justify-content-end gap-3">
            <Button label="Cancel" className="p-button-text" />
            <Button label="Submit Application" icon="pi pi-send" />
        </div>

    </div>
</div>
  )
}

export default ApplyLeave