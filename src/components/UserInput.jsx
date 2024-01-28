/* eslint-disable react/prop-types */
export const UserInput = ({ values, handleValues }) => {
  return (
    <div id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial">INITIAL INVESTMENT</label>
          <input
            type="number"
            id="initial"
            value={values.initialInvestment}
            onChange={handleValues}
            data-name="initialInvestment"
            required
          />
        </p>
        <p>
          <label htmlFor="anual">ANUAL INVESTMENT</label>
          <input
            type="number"
            id="anual"
            value={values.annualInvestment}
            onChange={handleValues}
            data-name="annualInvestment"
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected">expected return</label>
          <input
            type="number"
            id="expected"
            value={values.expectedReturn}
            onChange={handleValues}
            data-name="expectedReturn"
            required
          />
        </p>
        <p>
          <label htmlFor="duration">duration</label>
          <input
            type="number"
            id="duration"
            value={values.duration}
            onChange={handleValues}
            data-name="duration"
            required
          />
        </p>
      </div>
    </div>
  );
};
