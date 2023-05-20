import React from "react";

const Idea = (props) => {
  const copy = (variants) => {
    let result = props.basePrompt;
    variants.forEach((v) => {
      result = result.replace(`$\{${v.key}}`, v.value);
    });
    navigator.clipboard.writeText(result);
  };
  const [clickedRow, setClickedRow] = React.useState(null);
  const onClick = (comb, i) => () => {
    setClickedRow(i);
    copy(comb);
  };
  return (
    <>
      <div></div>
      <table key={props.slug}>
        <thead>
          <tr>
            <th>#</th>
            {props.combinations[0].map((x) => (
              <th key={x.key}>{x.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.combinations.map((comb, i) => (
            <tr
              key={i}
              onClick={onClick(comb, i)}
              className={`row${i === clickedRow ? " animate" : ""}`}
              onAnimationEnd={() => {
                setClickedRow(null);
              }}
            >
              <td className="copy">{i}</td>
              {comb.map((variant) => (
                <td key={variant.value}>{variant.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Idea;
