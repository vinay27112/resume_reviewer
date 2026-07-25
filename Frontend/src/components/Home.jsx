import React from "react";
import Protected from "../features/auth/components/Protected";

const Home = () => {
  return (
    <Protected>
      <div>Home</div>
    </Protected>
  );
};

export default Home;
