const InputForm = ({createPerson,newName,newNumber,handleNameChange,handleNumberChange}) => {

    return (
      <>
          <form onSubmit={createPerson}>
              <h2>Add a new contact</h2>
             <div>
                  name: <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="Enter name"
              />
              </div>
                <br/>
              <div>
                  number: <input
                  type={"number"}
                  value={newNumber}
                  onChange={handleNumberChange}
                  placeholder="Enter number"
              />
              </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
      </>
    )

}

export default InputForm
