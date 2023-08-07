// import "./calc-button.css"

const CalcButton = ({childToParent, symbol, cssId, gridClass, colorGroup, onPress}) => {

    const dataButtonToApp = "This is data from Child component to Parent component.";

    const sendSymbolToDisplay = () => {
        alert("I'm an alert!");
    }

    return (
        <div id={cssId} className={`${gridClass} ${colorGroup} kpButton`} onClick={onPress}>
        {/* <div id={cssId} className={`${gridClass} ${colorGroup} kpButton`} childToParent={dataButtonToApp}> */}
            {symbol}
        </div>
    );
}

export default CalcButton;