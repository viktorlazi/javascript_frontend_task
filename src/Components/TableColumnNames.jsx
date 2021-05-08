import './styles/table.css';

function TableColumnNames({keys, setSortBy, sortBy}) {
  return (
    <div className="column-names">
      {
        keys.map(e=>{
          return <div onClick={()=>{setSortBy(e)}} className={`column-name row ${sortBy===e ? "sortBy":""}`}>{e}</div>
        })
      }
    </div>
  );
}
export default TableColumnNames;