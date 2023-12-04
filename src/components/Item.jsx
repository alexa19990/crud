const Item = (props) => {
  return (
    <div className="task" key={props.index}>
      <button
        className={props.isChecked ? "isChecked check" : "check"}
        onClick={() => props.checkToggle(props.id)}
      >
        <img src={props.isChecked ? "/images/check.svg" : ""} alt="" />
      </button>
      <p>{props.task + "#" + props.id}</p>
    </div>
  );
};

export default Item;
