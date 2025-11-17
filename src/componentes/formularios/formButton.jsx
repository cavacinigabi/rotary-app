import "./formButton.css";

function FormButton(props) {
  return (
    <button type="submit" className="btn-primary">
      {props.placeholder}
    </button>
  );
}

export default FormButton;
