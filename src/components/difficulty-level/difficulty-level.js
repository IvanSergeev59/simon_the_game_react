const DifficultyLevel = (props) => {
    const {onChangeDifficulty, difficultyCheckbox} = props
    function ololo(event) {
        onChangeDifficulty(event.target.id)
   }
    return (
        <div onChange={(event) => ololo(event)}>
            <h3>Difficulty level</h3>   
            <input type="radio" defaultChecked={difficultyCheckbox[0]} id="difficultyChoice-1" name="difficultyChoice"
              />
            <label htmlFor="difficultyChoice-1" >Easy (1.5 sec interval)</label><br />
            <input type="radio" id="difficultyChoice-2" name="difficultyChoice" defaultChecked={difficultyCheckbox[1]}/>
            <label htmlFor="difficultyChoice-2">Medium (1 sec interval)</label><br />
            <input type="radio" id="difficultyChoice-3" name="difficultyChoice" defaultChecked={difficultyCheckbox[2]}/> 
            <label htmlFor="difficultyChoice-3">Hard (0.4 sec interval)</label>
        </div>
    )
}   

export default DifficultyLevel