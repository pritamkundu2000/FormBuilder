import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const FillForm = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const form = getFromLocalStorage('forms').find((f) => f.id === parseInt(id));
  const [response, setResponse] = useState({});

  const handleChange = (field, value) => {
    setResponse({ ...response, [field]: value });
    console.log(response)
  };

  const handleSubmit = () => {
    const responses = getFromLocalStorage('responses');
    const newResponse = { formId: id, response };
    saveToLocalStorage('responses', [...responses, newResponse]);
    navigate("/")
  };

  if (!form) return <div>Form not found</div>;

  return (
    <div className=' flex flex-col  items-center '>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-4 px-40 mt-4 ">
        <h2 className=' my-2 py-2 text-3xl text-blue-500 text-center' >{form.name}</h2>
        <div className=' border border-black p-4 px-40 '>
        {form.fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className=''>{field.label}: </label>
            {field.type==="radio" ?
            <div className="flex gap-2 mt-2">
                {field.options.map((opt) => (
                <div key={opt} className="relative">
                    <input
                    type="radio"
                    id={`${field.label}-${opt}`}
                    name={field.label}
                    value={opt}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    className="hidden peer"
                    />
                    <label
                    htmlFor={`${field.label}-${opt}`}
                    className="inline-block px-4 py-2 border border-gray-300 rounded cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white transition-colors"
                    >
                    {opt}
                    </label>
                </div>
              ))}
            </div>
            :
            <input
              type={field.type}
              onChange={(e) => handleChange(field.label, e.target.value)}
              className="border p-2"
            />
            }
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white p-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FillForm;
