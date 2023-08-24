import React  from 'react';

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
    setIsSinChecked(target.checked);
    setIsStepChecked(target.checked);
    setIsRandomChecked(target.checked);

    updateGraphSettings('sin', target.checked);
    updateGraphSettings('step', target.checked);
    updateGraphSettings('random', target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={(e) => allCheckedHandler(e)}
          checked={isSinChecked && isStepChecked && isRandomChecked}
        />
        전체선택
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isSinChecked}
          onChange={() => setIsSinChecked(!isSinChecked)}
        />
        Sin
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isStepChecked}
          onChange={() => setIsStepChecked(!isStepChecked)}
        />
        Step
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isRandomChecked}
          onChange={() => setIsRandomChecked(!isRandomChecked)}
        />
        Random
      </label>
    </div>
  );
}

export default Navigation;