import React, { useState } from "react";
import Select from "./components/Select";
import Modal from "react-modal";
import "./App.css";

function App() {
  const [selectedCourse, setSelectedCourse] = useState("technical");
  const [selectValue, setSelectValue] = useState({});
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState({ selection: "", note: "", date: "" });
  const [openModal, setOpenModal] = useState(false);

  const selectionArr = {
    technical: [
      { name: "s_report", value: "s_report", label: "Short Reports" },
      {
        name: "a_report",
        value: "a_report",
        label: "Annual Reports",
      },
      {
        name: "presentation",
        value: "presentation",
        label: "Presentations",
      },
    ],
    english: [
      { name: "poetry", value: "poetry", label: "Poetry" },
      {
        name: "s_stories",
        value: "s_stories",
        label: "Short Stories",
      },
      { name: "drama", value: "drama", label: "Drama" },
    ],
    computer: [
      { name: "web_dev", value: "web_dev", label: "Web Development" },
      {
        name: "desktop_dev",
        value: "desktop_dev",
        label: "Desktop Software Development",
      },
      {
        name: "research_analysis",
        value: "research_analysis",
        label: "Research and Analysis",
      },
    ],
  };

  const handleRadioChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleChangeSelect = (key) => (e) => {
    setSelectValue({ ...selectValue, [key]: e.target.value });
    if (e.target.value) {
      setError({ selection: "" });
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    if (
      e.target.value &&
      (e.target.value.length > 20 || e.target.value.length < 500)
    ) {
      setError({ note: "" });
    }
  };

  const handleSubmit = () => {
    if (!selectValue[selectedCourse]) {
      setError({ selection: "Please select one" });
      return;
    }
    if (note && (note.length < 20 || note.length > 500)) {
      setError({ note: "Please note between 20 and 500 letters" });
      return;
    }
    if (
      date === "2019-12-20" ||
      date === "2019-01-15" ||
      date === "2020-02-15"
    ) {
      setError({
        date:
          "Your selected course and subject is not offered beginning from your selected date",
      });
      return;
    } else if (!date) {
      setError({
        date: "Please select date",
      });
      return;
    }

    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      handleOpenModal();
    }, 2000);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const customStyles = {
    content: {
      top: "25%",
      left: "50%",
      right: "0",
      bottom: "60%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className='App'>
      <div className='registration-form'>
        <div className='select-section'>
          <div className='radio-wrapper'>
            <div className='radio'>
              <label>
                <input
                  type='radio'
                  value='technical'
                  checked={selectedCourse === "technical"}
                  onChange={handleRadioChange}
                />
                1. Technical Report Writing
              </label>
            </div>
            <div className='radio'>
              <label>
                <input
                  type='radio'
                  value='english'
                  checked={selectedCourse === "english"}
                  onChange={handleRadioChange}
                />
                2. English Literature
              </label>
            </div>
            <div className='radio'>
              <label>
                <input
                  type='radio'
                  value='computer'
                  checked={selectedCourse === "computer"}
                  onChange={handleRadioChange}
                />
                3. Computer Sciences
              </label>
            </div>
          </div>
          <div className='select-wrapper'>
            {selectedCourse && (
              <Select
                options={selectionArr[selectedCourse]}
                handleSelectChange={handleChangeSelect(selectedCourse)}
              />
            )}
          </div>
          <div className='input-note-wrapper'>
            <textarea
              rows={5}
              placeholder='Additional Notes'
              value={note}
              onChange={handleNoteChange}
            ></textarea>
          </div>
        </div>

        <div className='date-picker'>
          <input
            className='input-date-picker'
            value={date}
            type='date'
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) setError({ date: "" });
            }}
          />
        </div>
        {error && (
          <div className='errors-wrapper'>
            {error.note}
            {error.selection}
            {error.date}
          </div>
        )}
        <button className='btn-submit' type='submit' onClick={handleSubmit}>
          {showLoading ? "Loader" : "Submit"}
        </button>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <button className="modal-btn-close" onClick={handleCloseModal}>x</button>
        <div className="modal-content-text">Your course has been successfully registered.</div>
      </Modal>
    </div>
  );
}

export default App;
