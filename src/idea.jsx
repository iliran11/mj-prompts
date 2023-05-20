import React from "react";

const paramsDb = [
  { key: "ar", values: ["4:3"] },
  { key: "chaos", values: ["0", "50"] },
];
const initialState = {};
paramsDb.forEach((x) => {
  initialState[x.key] = x.values[0];
});

const Idea = (props) => {
  const [parameters, setParameters] = React.useState(initialState);
  const onCopy = (value, i) => {
    let result = props.basePrompt;
    value.forEach((v) => {
      result = result.replace(`$\{${v.key}}`, v.value);
    });
    paramsDb.forEach((p) => {
      result = `${result} --${p.key} ${parameters[p.key]}`;
    });
    navigator.clipboard.writeText(result);
  };
  const onParamsChange = (key) => (e) => {
    setParameters((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  };
  return (
    <>
      <h3>Parameters</h3>
      <div className="params">
        {paramsDb.map((p) => (
          <div key={p.key} className="select-group">
            <label>{p.key}</label>
            <select onChange={onParamsChange(p.key)}>
              {p.values.map((v) => (
                <option key={v.key}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <ul className="idea">
        {props.combinations.map((comb, i) => {
          return (
            <ul
              key={i}
              className="card"
              onClick={() => {
                onCopy(comb, i);
              }}
            >
              {comb.map((x) => {
                return (
                  <li key={x.key} className="row">
                    <span className="key">{x.key}: </span>
                    <span>{x.value}</span>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </ul>
    </>
  );
};

export default Idea;
