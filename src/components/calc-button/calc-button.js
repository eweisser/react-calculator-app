import "./calc-button.css"

const CalcButton = (props) => {
    return (
        <div className={`${props.gridClass} ${props.colorGroup} kpButton`}>
            {props.symbol}
        </div>
    );
}

export default CalcButton;