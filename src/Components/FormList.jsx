import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FormList = () => {
  const isAuthenticated=useSelector((Store)=>Store.auth.isAuthenticated)
  const [forms, setForms] = useState([]);
  const [responseCounts, setResponseCounts] = useState({});

  useEffect(() => {
    const storedForms = getFromLocalStorage('forms') || [];
    setForms(storedForms);

    const storedResponses = getFromLocalStorage('responses') || {};
    const counts = {};
    storedForms.forEach((form) => {
      counts[form.id] = storedResponses.filter((res)=>res.formId===String(form.id))?.length||0
    });
    setResponseCounts(counts);
  }, []);

  const navigate=useNavigate()
  const handleEdit = (formId) => {
    navigate(`/edit/${formId}`);
  };


  return (
    <div className="p-4">
      {isAuthenticated && 
        <Link to="/create" className="bg-blue-500 text-white p-2 my-2 block text-center">Create New Form</Link>
      }
      <h2 className=' mb-2 text-xl'>Form List</h2>
      {forms.length ===0 && 
      <div className=' my-2 py-2 text-red-300'> No Forms available {isAuthenticated?" ":", Kindly login and"} create the form </div>
      }
      {forms.map((form) => (
        <div key={form.id} className="border p-2 mb-2">
          <h4>{form.name}</h4>
          <div className=' flex items-center'>
            <Link to={`/form/${form.id}`} className="text-blue-500">Fill Form</Link>
            <p className="text-gray-500 ml-2">
                Responses: {responseCounts[form.id] || 0}
              </p>
            {isAuthenticated && 
            <div>
              <Link to={`/responses/${form.id}`} className="ml-4 text-green-500">View Responses</Link>
              <button
                onClick={() => handleEdit(form.id)}
                className="bg-yellow-500 text-white px-4 py-2  rounded mx-2"
              >
                Edit Form
              </button>
            </div>
              
            }
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default FormList;
