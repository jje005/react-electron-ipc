import React from 'react';

function Navigation({ 
  isSinChecked, 
  isStepChecked, 
  isRandomChecked, 
  updateGraphSettings
}) {
  const allCheckedHandler = ({ target }) => {
    const isChecked = target.checked;

    updateGraphSettings('isSinChecked', isChecked);
    updateGraphSettings('isStepChecked', isChecked);
    updateGraphSettings('isRandomChecked', isChecked);
  };

  const handleSinCheck = () => {
    const newIsSinChecked = !isSinChecked;
    updateGraphSettings('isSinChecked', newIsSinChecked);
  };
  
  const handleStepCheck = () => {
    const newIsStepChecked = !isStepChecked;
    updateGraphSettings('isStepChecked', newIsStepChecked);
  };
  
  const handleRandomCheck = () => {
    const newIsRandomChecked = !isRandomChecked;
    updateGraphSettings('isRandomChecked', newIsRandomChecked);
  };

  return (
    <div>
        <label>
            <input
                type="checkbox"
                onChange={allCheckedHandler}
                checked={isSinChecked && isStepChecked && isRandomChecked}
            /> 전체선택
        </label>
      <br />
        <label>
             <input
                type="checkbox"
                checked={isSinChecked}
                onChange={handleSinCheck}
            /> Sin
        </label>
      <br />
        <label>
            <input
                type="checkbox"
                checked={isStepChecked}
                onChange={handleStepCheck}
            /> Step
        </label>
      <br />
        <label>
            <input
                type="checkbox"
                checked={isRandomChecked}
                onChange={handleRandomCheck}
            /> Random
      </label>
    </div>
  );
}

export default Navigation;