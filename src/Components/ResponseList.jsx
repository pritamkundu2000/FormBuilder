import { useParams } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage';

const ResponseList = () => {
  const { id } = useParams();
  const responses = getFromLocalStorage('responses').filter((res) => res.formId === id)
  const formName = getFromLocalStorage('forms').find((f) => f.id === parseInt(id))

  return (
    <div className="p-4">
        <h2 className=' text-xl my-2 text-blue-400'>{formName.name}</h2>
      <h2 className=' text-lg'>Responses</h2>
      {
        responses.length===0 &&
        <div className=' my-2  text-sm'> No responses got till now</div>
      }
      {responses.map((res, index) => (
        <div key={index} className="border p-2 mb-2">
          {JSON.stringify(res.response)}
        </div>
      ))}
    </div>
  );
};

export default ResponseList;
