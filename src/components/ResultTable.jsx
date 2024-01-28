import { calculateInvestmentResults, formatter } from '../util/investment';

// eslint-disable-next-line react/prop-types
export default function ResultTable({ result }) {
  const resultData = calculateInvestmentResults(result);
  const initialInvestment =
    resultData[0].valueEndOfYear - resultData[0].interest - resultData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Investment Value</th>
          <th scope="col">Interest (Year)</th>
          <th scope="col">Total Interest</th>
          <th scope="col">Invested Capital</th>
        </tr>
      </thead>
      <tbody className="center">
        {resultData.map((data) => {
          const totalInterest =
            data.valueEndOfYear - data.annualInvestment * data.year - initialInvestment;
          const totalAmountInvested = data.valueEndOfYear - totalInterest;

          return (
            <tr key={data.year}>
              <th scope="row">{data.year}</th>
              <td>{formatter.format(data.valueEndOfYear)}</td>
              <td>{formatter.format(data.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
