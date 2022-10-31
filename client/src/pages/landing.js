import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <Wrapper>
      <main>
        <div className="container page">
          <div className="info">
            <h1>
              Revoult <span>similar</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius at
              facilis beatae enim sunt sapiente accusamus autem, reiciendis odit
              ipsa a nesciunt esse incidunt facere rem. Nostrum consequuntur
              quod ipsa dolore unde repellendus similique illum tenetur maxime
              ea magnam, minus totam natus, perferendis explicabo, ex corporis
              iste incidunt eos facilis.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="main" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
