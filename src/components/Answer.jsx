export default function Answer(props){
    
    
    function handleChange(e){
        props.onOptionChange(e)
    }
    
    return (
        <div className={`${(props.id === props.correctAnswer) && props.done ? "correct-unselected" : ""}`}>
            <input 
                type="radio" 
                name={props.name} 
                id={props.id} 
                onChange={handleChange}
                disabled={props.done}
            />
            <label 
                htmlFor={props.id}
            >
                {props.id}
            </label>
            
        </div>
    )
}