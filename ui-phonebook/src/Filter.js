
const Filter = ({handleFilter}) => {
    
    return (
        <>
            Filter <input
              onChange={handleFilter}
              type="text"
              placeholder="Filter contacts"
         />
        </>
    )
}
export default Filter
