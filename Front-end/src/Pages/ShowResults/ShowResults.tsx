const mockData = [
  {
    formId: 1,
    answers: { name: "Amir", family: "Mohammadi", age: 21, city: "Tehran" },
  },
  {
    formId: 1,
    answers: { name: "Reza", family: "Rahmani", age: 22, city: "Shiraz" },
  },
  {
    formId: 1,
    answers: { name: "Maryam", family: "Esfahani", age: 23, city: "Mashhad" },
  },
  {
    formId: 1,
    answers: { name: "Ali", family: "Karimi", age: 24, city: "Tabriz" },
  },
  {
    formId: 1,
    answers: { name: "Fatima", family: "Abbasi", age: 25, city: "Isfahan" },
  },
  {
    formId: 1,
    answers: { name: "Hossein", family: "Rezaei", age: 26, city: "Karaj" },
  },
  {
    formId: 1,
    answers: { name: "Zahra", family: "Ghorbani", age: 27, city: "Qom" },
  },
  {
    formId: 1,
    answers: { name: "Mehdi", family: "Hosseini", age: 28, city: "Ahvaz" },
  },
  {
    formId: 1,
    answers: { name: "Sara", family: "Yousefi", age: 29, city: "Rasht" },
  },
  {
    formId: 1,
    answers: { name: "Arman", family: "Sharifi", age: 20, city: "Zahedan" },
  },
  {
    formId: 1,
    answers: { name: "Nima", family: "Jafari", age: 21, city: "Ardabil" },
  },
  {
    formId: 1,
    answers: {
      name: "Niloufar",
      family: "Khodaei",
      age: 22,
      city: "Khorramabad",
    },
  },
  {
    formId: 1,
    answers: { name: "Sina", family: "Mostafavi", age: 23, city: "Urmia" },
  },
  {
    formId: 1,
    answers: { name: "Parisa", family: "Nourian", age: 24, city: "Yazd" },
  },
  {
    formId: 1,
    answers: { name: "Farhad", family: "Moniri", age: 25, city: "Arak" },
  },
  {
    formId: 1,
    answers: { name: "Elham", family: "Sadeghi", age: 26, city: "Hamadan" },
  },
  {
    formId: 1,
    answers: {
      name: "Omid",
      family: "Hosseinzadeh",
      age: 27,
      city: "Kermanshah",
    },
  },
  {
    formId: 1,
    answers: { name: "Bahar", family: "Mirza", age: 28, city: "Sari" },
  },
  {
    formId: 1,
    answers: { name: "Mahdi", family: "Taheri", age: 29, city: "Qazvin" },
  },
  {
    formId: 1,
    answers: { name: "Sahar", family: "Moradi", age: 20, city: "Bushehr" },
  },
];
function ShowResults() {
  const headers = Object.keys(mockData[0].answers);
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
          {mockData.map((data) => (
            <tr
              key={data.formId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {headers.map((header) => (
                <td key={`${data.formId}-${header}`} className="px-6 py-4">
                  {data.answers[header as keyof typeof data.answers]}
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
