import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ startDate, setStartDate }) => {
  // Define handleDateSelect and handleDateChange functions
  return (
    <>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </>
  );
};

export default MyDatePicker;
