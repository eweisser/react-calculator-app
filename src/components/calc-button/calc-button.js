// import "./calc-button.css"

const CalcButton = ({symbol, cssId, gridClass, colorGroup, onPress}) => {

    const sendSymbolToDisplay = () => {
        alert("I'm an alert!");
    }

    return (
        <div id={cssId} className={`${gridClass} ${colorGroup} kpButton`} onClick={onPress}>
            {symbol}
        </div>
    );
}

export default CalcButton;