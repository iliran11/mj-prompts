import React from "react";
import db from "../db.json";
import promptGenerator from "../promptGenerator";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <h1>Ideas</h1>
      {props.ideas.map((x) => {
        return (
          <div key={x.title}>
            <h2>{props.title}</h2>
            <h3>{props.basePrompt}</h3>
            <ul>
              {x.combinations.map((x) => {
                return <li key={x}>{x}ff</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const ideas = db.map((x) => {
    return {
      title: x.title,
      combinations: promptGenerator(x),
      basePrompt: x.parts.join(" "),
    };
  });
  return {
    props: { ideas }, // will be passed to the page component as props
  };
}
