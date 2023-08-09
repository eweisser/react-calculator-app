// import "./calc-button.css"

const CalcButton = ({childToParent, symbol, cssId, gridClass, colorGroup, onPress}) => {

    return (
        <div id={cssId} className={`${gridClass} ${colorGroup} kpButton`} onClick={onPress}>
            {symbol}
        </div>
    );
}

export default CalcButton;