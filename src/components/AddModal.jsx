const AddModal = (props) => {
  
  const onSubmit = (e) => {
    props.onFormSubmit(e,props.tasks);
  };
  
  return (
    <div
      className={props.isToggled ? "modal-container active" : "notDisplayed"}
    >
      <h1>new note</h1>
      <input
        type="text"
        placeholder="Input your note..."
        className="taskInput"
        value={props.value}
        onChange={(e)=>props.setValue(e.target.value)}
      />
      <div className="modal-footer">
        <button className="cancel" onClick={()=>props.modalToggle()}>cancel</button>
        <button className="apply" onClick={(e)=>{props.addTask(); onSubmit(e)}}>apply</button>
      </div>
    </div>
  );
};

export default AddModal;
