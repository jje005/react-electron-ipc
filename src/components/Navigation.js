import React from 'react';

function Navigation({ 
  isSinChecked, 
  isStepChecked, 
  isRandomChecked, 
  setIsSinChecked, 
  setIsStepChecked, 
  setIsRandomChecked,
  updateGraphSettings
}) {
  const allCheckedHandler = ({ target }) => {
    const isChecked = target.checked;



    updateGraphSettings('isSinChecked', isChecked);
    updateGraphSettings('isStepChecked', isChecked);
    updateGraphSettings('isRandomChecked', isChecked);
  };

  const handleSinCheck = () => {
    setIsSinChecked(!isSinChecked);
    updateGraphSettings('isSinChecked', !isSinChecked);
  };

  const handleStepCheck = () => {
    setIsStepChecked(!isStepChecked);
    updateGraphSettings('isStepChecked', !isStepChecked);
  };

  const handleRandomCheck = () => {
    setIsRandomChecked(!isRandomChecked);
    updateGraphSettings('isRandomChecked', !isRandomChecked);
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