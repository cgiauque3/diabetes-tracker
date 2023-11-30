const ReadingsTable = ({ readings }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Glucose Level (mg/dL)</th>
          <th>Category</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {readings.map((reading, index) => (
          <tr key={index}>
            <td>{reading.timestamp.toLocaleString()}</td>
            <td>{reading.value}</td>
            <td>{reading.category}</td>
            <td>{reading.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ReadingsTable;
