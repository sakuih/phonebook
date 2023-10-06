const Numbers = ({persons, mapPersons}) => {
    return (
      <>
          <h2>Numbers</h2>
            <ul>
                {mapPersons(persons)}
            </ul>
      </>
    )
}
export default Numbers
