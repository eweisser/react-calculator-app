import "./calc-button.css"

const CalcButton = ({symbol, cssId, gridClass, colorGroup}) => {
    return (
        <div id={cssId} className={`${gridClass} ${colorGroup} kpButton`}>
            {symbol}
        </div>
    );
}

export default CalcButton;