import { useState, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import ResponseList from "./ResponseList";

const EditForm = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const forms = getFromLocalStorage("forms");
    const formToEdit = forms.find((form) => form.id.toString() === id);

    if (formToEdit) {
      setFormName(formToEdit.name);
      setFields(formToEdit.fields || []);
    } else {
      navigate("/")
    }
  }, [id, navigate]);

  
  const handleAddField = (type) => {
    let newField = { label: "", type, options: [] };
    if (type === "radio") {
      newField.options = ["Option 1"]
    }
    setFields([...fields, newField])
  };

  
  const handleFieldChange = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  
  const handleSaveForm = () => {
    setError("");
    if (formName !== "") {
      const forms = getFromLocalStorage("forms");
      const updatedForm = {
        id: parseInt(id, 10),
        name: formName,
        fields,
      };
      const updatedForms = forms.map((form) =>
        form.id === updatedForm.id ? updatedForm : form
      );
      saveToLocalStorage("forms", updatedForms);
      navigate("/");
    } else {
      setError("Enter a valid form name");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-slate-300 mr-4 p-2 ">
        <div className="m-2">
          <button
            onClick={() => handleAddField("text")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Text Field
          </button>
        </div>

        <div className="m-2">
          <button
            onClick={() => handleAddField("date")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Add Date Field
          </button>
        </div>

        <div className="m-2">
          <button
            onClick={() => handleAddField("radio")}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Add Radio Field
          </button>
        </div>
      </div>

      <div className="w-3/4 p-2">
        
        <h2 className="text-2xl font-bold my-4">Edit Form</h2>
        <div className=" border border-black p-4">
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        {error && <div className="text-red-600">{error}</div>}

        {fields.map((field, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) =>
                handleFieldChange(index, { ...field, label: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            {field.type === "radio" && (
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Options:</h4>
                {field.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...field.options];
                        updatedOptions[optIndex] = e.target.value;
                        handleFieldChange(index, {
                          ...field,
                          options: updatedOptions,
                        });
                      }}
                      className="border p-2"
                    />
                    <button
                      onClick={() => {
                        const updatedOptions = field.options.filter(
                          (_, i) => i !== optIndex
                        );
                        handleFieldChange(index, {
                          ...field,
                          options: updatedOptions,
                        });
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const updatedOptions = [
                      ...field.options,
                      `Option ${field.options.length + 1}`,
                    ];
                    handleFieldChange(index, {
                      ...field,
                      options: updatedOptions,
                    });
                  }}
                  className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSaveForm}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Save Changes
        </button>
        </div>
        <div className=" border border-black mt-4">
            <ResponseList/>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
