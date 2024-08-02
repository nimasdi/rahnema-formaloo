import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ResultItem {
  [key: string]: (string | number)[];
}

interface Response {
  result: ResultItem;
}
function ShowResults() {
  const { formId } = useParams();
  // const formId = "66ad2b0ade410d08fb19fad3";
  const [forms, setForms] = useState<ResultItem[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/fillForm/getResult/${formId}`
        );
        const data: Response = await response.json();
        setForms(() => data.result);
        // const headers = Object.keys(forms[0].result);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const headers = Object.keys(forms);

  return (
    <div className="max-h-[600px] w-full mt-10 mx-auto border rounded-lg relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            {headers.map((header) => (
              <th key={header} className="first-letter:uppercase px-6 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forms[Object.keys(forms)[0]]?.map((_, rowIndex: number) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {Object.keys(forms).map((key, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} className="px-6 py-4">
                  {forms[key][rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowResults;
