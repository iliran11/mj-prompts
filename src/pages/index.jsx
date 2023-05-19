import React from "react";
import db from "../db.json";
import { getCombinations } from "../promptGenerator/utils";
import Idea from "../idea";

export default function Home(props) {
  return (
    <div>
      <h1>Ideas</h1>
      {props.ideas.map((idea) => {
        return (
          <Idea
            key={idea.slug}
            combinations={idea.combinations}
            slug={idea.slug}
            basePrompt={idea.basePrompt}
          />
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const ideas = db.map((x) => {
    return {
      title: x.title,
      combinations: getCombinations(x.variants),
      basePrompt: x.parts.join(" "),
    };
  });
  return {
    props: { ideas }, // will be passed to the page component as props
  };
}
